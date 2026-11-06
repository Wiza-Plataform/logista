import * as z from 'zod';

import { pageSchemaOf } from '../page.ts';
import { ulidSchema } from '../ulid.ts';

export const productStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

export type ProductStatus = z.infer<typeof productStatusSchema>;

export const stockStatusSchema = z.enum(['IN_STOCK', 'LOW', 'OUT']);

export type StockStatus = z.infer<typeof stockStatusSchema>;

export const categoryReferenceSchema = z.object({
  categoryUlid: ulidSchema,
  name: z.string(),
});

export const productSummarySchema = z.object({
  productUlid: ulidSchema,
  name: z.string(),
  slug: z.string(),
  status: productStatusSchema,
  unitSymbol: z.string(),
  categories: z.array(categoryReferenceSchema),
  coverThumbnailUrl: z.url().nullable(),
  sku: z.string().nullable(),
  hasVariants: z.boolean(),
  variantCount: z.number().int().nonnegative(),
  minPriceInCents: z.number().int().nonnegative().nullable(),
  maxPriceInCents: z.number().int().nonnegative().nullable(),
  totalQuantity: z.number().nonnegative(),
  stockStatus: stockStatusSchema,
  createdAt: z.string(),
});

export type ProductSummary = z.infer<typeof productSummarySchema>;

export const productPageSchema = pageSchemaOf(productSummarySchema);

export type ProductPage = z.infer<typeof productPageSchema>;

export const unitReferenceSchema = z.object({
  unitUlid: ulidSchema,
  name: z.string(),
  symbol: z.string(),
  allowsFractions: z.boolean(),
});

export const productImageSchema = z.object({
  imageUlid: ulidSchema,
  url: z.url(),
  thumbnailUrl: z.url(),
  position: z.number().int().nonnegative(),
});

export type ProductImage = z.infer<typeof productImageSchema>;

export const productOptionSchema = z.object({
  optionUlid: ulidSchema,
  name: z.string(),
  values: z.array(z.object({ valueUlid: ulidSchema, name: z.string() })),
});

export type ProductOption = z.infer<typeof productOptionSchema>;

export const productVariantSchema = z.object({
  variantUlid: ulidSchema,
  sku: z.string().nullable(),
  priceInCents: z.number().int().nonnegative(),
  promotionalPriceInCents: z.number().int().nonnegative().nullable(),
  quantity: z.number().nonnegative(),
  stockStatus: stockStatusSchema,
  optionValues: z.array(
    z.object({ optionUlid: ulidSchema, valueUlid: ulidSchema, name: z.string() }),
  ),
});

export type ProductVariant = z.infer<typeof productVariantSchema>;

export const productDetailsSchema = z.object({
  productUlid: ulidSchema,
  name: z.string(),
  description: z.string().nullable(),
  slug: z.string(),
  status: productStatusSchema,
  unit: unitReferenceSchema,
  categories: z.array(categoryReferenceSchema),
  images: z.array(productImageSchema),
  options: z.array(productOptionSchema),
  variants: z.array(productVariantSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProductDetails = z.infer<typeof productDetailsSchema>;

export interface SaveProductRequest {
  readonly name: string;
  readonly description: string | null;
  readonly slug?: string | undefined;
  readonly unitUlid: string;
  readonly categoryUlids: readonly string[];
  readonly options: readonly {
    readonly optionUlid?: string | undefined;
    readonly name: string;
    readonly values: readonly {
      readonly valueUlid?: string | undefined;
      readonly name: string;
    }[];
  }[];
  readonly variants: readonly {
    readonly optionValues: readonly string[];
    readonly sku: string | null;
    readonly priceInCents: number;
    readonly promotionalPriceInCents: number | null;
  }[];
  readonly resetRetiredStock?: true | undefined;
}

export const productOverviewSchema = z.object({
  total: z.number().int().nonnegative(),
  published: z.number().int().nonnegative(),
  draft: z.number().int().nonnegative(),
  lowStock: z.number().int().nonnegative(),
  outOfStock: z.number().int().nonnegative(),
  uncategorized: z.number().int().nonnegative(),
  stockValueInCents: z.number().int().nonnegative(),
});

export type ProductOverview = z.infer<typeof productOverviewSchema>;
