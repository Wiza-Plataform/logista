'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';

import { failedActionOf, rejectedInput } from '@/shared/api/action-failure';
import type { ProductDetails, ProductVariant } from '@/shared/contracts/catalog/product';
import { ulidSchema } from '@/shared/contracts/ulid';
import type { FailedAction } from '@/shared/forms/form-failure';
import { strings } from '@/shared/i18n/strings';
import { requireStoreUlid } from '@/shared/session/guards';

import {
  changeProductLifecycle,
  createProduct,
  registerInitialStock,
  removeProductImage,
  reorderProductImages,
  updateProduct,
  uploadProductImage,
} from './api';
import { isAcceptedPhoto, MAX_PHOTOS, PHOTO_FIELD } from './photo-rules';
import { PRODUCTS_PATH } from './product-action-result';
import type {
  InitialStockEntry,
  LifecycleTransition,
  ProductChangeResult,
  SaveProductInput,
  SaveProductResult,
} from './product-action-result';

const MAX_PRICE_IN_CENTS = 100_000_000_000;
const MAX_QUANTITY = 1_000_000_000;
const MAX_OPTIONS = 3;
const MAX_VALUES = 20;
const MAX_VARIANTS = 100;
const MAX_LABEL = 60;

const centsSchema = z.number().int().min(0).max(MAX_PRICE_IN_CENTS);
const labelSchema = z.string().max(MAX_LABEL);
const optionValuesSchema = z.array(labelSchema).max(MAX_OPTIONS);

const saveInputSchema = z.object({
  productUlid: ulidSchema.nullable(),
  product: z.object({
    name: z.string().max(240),
    description: z.string().max(10_000).nullable(),
    slug: z.string().max(160).optional(),
    unitUlid: z.string().max(26),
    categoryUlids: z.array(ulidSchema).max(2),
    options: z
      .array(
        z.object({
          optionUlid: ulidSchema.optional(),
          name: labelSchema,
          values: z
            .array(z.object({ valueUlid: ulidSchema.optional(), name: labelSchema }))
            .max(MAX_VALUES),
        }),
      )
      .max(MAX_OPTIONS),
    variants: z
      .array(
        z.object({
          optionValues: optionValuesSchema,
          sku: z.string().max(80).nullable(),
          priceInCents: centsSchema,
          promotionalPriceInCents: centsSchema.nullable(),
        }),
      )
      .min(1)
      .max(MAX_VARIANTS),
    resetRetiredStock: z.literal(true).optional(),
  }),
  initialStock: z
    .array(
      z.object({
        optionValues: optionValuesSchema,
        quantity: z.number().positive().max(MAX_QUANTITY),
      }),
    )
    .max(MAX_VARIANTS),
});

const imageOrderSchema = z.array(ulidSchema).min(1).max(MAX_PHOTOS);
const transitionSchema = z.enum(['publish', 'unpublish', 'restore']);

function combinationKeyOf(names: readonly string[]): string {
  return names.map((name) => name.trim().toLocaleLowerCase('pt-AO')).join('|');
}

function variantKeyOf(details: ProductDetails, variant: ProductVariant): string {
  return combinationKeyOf(
    details.options.map(
      (option) =>
        variant.optionValues.find((value) => value.optionUlid === option.optionUlid)?.name ?? '',
    ),
  );
}

async function registerStock(
  storeUlid: string,
  details: ProductDetails,
  entries: readonly InitialStockEntry[],
): Promise<string | null> {
  const variantByKey = new Map(
    details.variants.map((variant) => [variantKeyOf(details, variant), variant.variantUlid]),
  );

  for (const entry of entries) {
    const variantUlid = variantByKey.get(combinationKeyOf(entry.optionValues));
    if (variantUlid === undefined) continue;
    try {
      await registerInitialStock(storeUlid, variantUlid, entry.quantity);
    } catch (error) {
      return failedActionOf(error).message;
    }
  }
  return null;
}

async function applyChange(
  change: (storeUlid: string) => Promise<void>,
): Promise<ProductChangeResult> {
  const storeUlid = await requireStoreUlid();

  try {
    await change(storeUlid);
  } catch (error) {
    return failedActionOf(error);
  }

  revalidatePath(PRODUCTS_PATH, 'layout');
  return { status: 'done' };
}

function rejectedPhoto(): FailedAction {
  return { status: 'failed', message: strings.productForm.photoRejected, field: PHOTO_FIELD };
}

export async function saveProductAction(input: SaveProductInput): Promise<SaveProductResult> {
  const parsed = saveInputSchema.safeParse(input);
  if (!parsed.success) return rejectedInput();

  const storeUlid = await requireStoreUlid();
  const { productUlid, product, initialStock } = parsed.data;

  let details: ProductDetails;
  try {
    details =
      productUlid === null
        ? await createProduct(storeUlid, product)
        : await updateProduct(storeUlid, productUlid, product);
  } catch (error) {
    return failedActionOf(error);
  }

  const stockIssue = await registerStock(storeUlid, details, initialStock);
  revalidatePath(PRODUCTS_PATH, 'layout');
  return { status: 'saved', productUlid: details.productUlid, stockIssue };
}

export async function uploadProductImageAction(
  productUlid: string,
  form: FormData,
): Promise<ProductChangeResult> {
  const image = form.get(PHOTO_FIELD);
  if (!(image instanceof File) || !isAcceptedPhoto(image)) return rejectedPhoto();

  return applyChange((storeUlid) => uploadProductImage(storeUlid, productUlid, image));
}

export async function removeProductImageAction(
  productUlid: string,
  imageUlid: string,
): Promise<ProductChangeResult> {
  return applyChange((storeUlid) => removeProductImage(storeUlid, productUlid, imageUlid));
}

export async function reorderProductImagesAction(
  productUlid: string,
  imageUlids: readonly string[],
): Promise<ProductChangeResult> {
  const order = imageOrderSchema.safeParse(imageUlids);
  if (!order.success) return rejectedInput();

  return applyChange((storeUlid) => reorderProductImages(storeUlid, productUlid, order.data));
}

export async function changeProductLifecycleAction(
  productUlid: string,
  transition: LifecycleTransition,
): Promise<ProductChangeResult> {
  const parsed = transitionSchema.safeParse(transition);
  if (!parsed.success) return rejectedInput();

  return applyChange((storeUlid) => changeProductLifecycle(storeUlid, productUlid, parsed.data));
}
