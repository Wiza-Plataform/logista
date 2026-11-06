import { ApiError, apiRequest, parseResponse } from '@/shared/api/client';
import { categoryTreeSchema } from '@/shared/contracts/catalog/category';
import type { CategoryNode } from '@/shared/contracts/catalog/category';
import { productDetailsSchema } from '@/shared/contracts/catalog/product';
import type { ProductDetails, SaveProductRequest } from '@/shared/contracts/catalog/product';
import { unitListSchema } from '@/shared/contracts/catalog/unit';
import { ulidSchema } from '@/shared/contracts/ulid';
import { strings } from '@/shared/i18n/strings';
import { getCurrentStore } from '@/shared/session/api';

import type { CategoryChoice, FormChoices } from './form-choices';
import { photoFormOf } from './photo-rules';
import type { LifecycleTransition } from './product-action-result';

const NOT_FOUND = 404;
const UPLOAD_TIMEOUT_MS = 60_000;

function isUlid(value: string): boolean {
  return ulidSchema.safeParse(value).success;
}

function requireUlid(value: string): string {
  if (!isUlid(value)) throw new ApiError(0, undefined, strings.apiErrors.unexpected);
  return value;
}

function productsPath(storeUlid: string): string {
  return `/stores/${storeUlid}/products`;
}

function productPath(storeUlid: string, productUlid: string): string {
  return `${productsPath(storeUlid)}/${requireUlid(productUlid)}`;
}

function detailsOf(body: unknown): ProductDetails {
  return parseResponse(productDetailsSchema, body);
}

function categoryChoicesOf(
  tree: readonly CategoryNode[],
  parentPath: readonly string[] = [],
): readonly CategoryChoice[] {
  return tree.flatMap((node) => {
    const path = [...parentPath, node.name];
    return [
      { categoryUlid: node.categoryUlid, path },
      ...categoryChoicesOf(node.subcategories, path),
    ];
  });
}

export async function fetchProductDetails(
  storeUlid: string,
  productUlid: string,
): Promise<ProductDetails | null> {
  if (!isUlid(productUlid)) return null;

  try {
    return detailsOf(await apiRequest(productPath(storeUlid, productUlid)));
  } catch (error) {
    if (error instanceof ApiError && error.status === NOT_FOUND) return null;
    throw error;
  }
}

export async function fetchFormChoices(storeUlid: string): Promise<FormChoices> {
  const [units, tree, store] = await Promise.all([
    apiRequest(`/stores/${storeUlid}/units`),
    apiRequest(`/stores/${storeUlid}/categories`),
    getCurrentStore(),
  ]);

  return {
    units: parseResponse(unitListSchema, units),
    categories: categoryChoicesOf(parseResponse(categoryTreeSchema, tree)),
    storeAddress: `${store?.subdomain ?? ''}${strings.onboarding.domainSuffix}/`,
  };
}

export async function createProduct(
  storeUlid: string,
  request: SaveProductRequest,
): Promise<ProductDetails> {
  return detailsOf(await apiRequest(productsPath(storeUlid), { method: 'POST', body: request }));
}

export async function updateProduct(
  storeUlid: string,
  productUlid: string,
  request: SaveProductRequest,
): Promise<ProductDetails> {
  return detailsOf(
    await apiRequest(productPath(storeUlid, productUlid), { method: 'PUT', body: request }),
  );
}

export async function registerInitialStock(
  storeUlid: string,
  variantUlid: string,
  quantity: number,
): Promise<void> {
  await apiRequest(`/stores/${storeUlid}/stock/movements`, {
    method: 'POST',
    body: {
      variantUlid,
      type: 'RECEIPT',
      quantity,
      note: strings.productForm.initialStockNote,
    },
  });
}

export async function uploadProductImage(
  storeUlid: string,
  productUlid: string,
  image: File,
): Promise<void> {
  await apiRequest(`${productPath(storeUlid, productUlid)}/images`, {
    method: 'POST',
    form: photoFormOf(image),
    timeoutMs: UPLOAD_TIMEOUT_MS,
  });
}

export async function removeProductImage(
  storeUlid: string,
  productUlid: string,
  imageUlid: string,
): Promise<void> {
  await apiRequest(`${productPath(storeUlid, productUlid)}/images/${requireUlid(imageUlid)}`, {
    method: 'DELETE',
  });
}

export async function reorderProductImages(
  storeUlid: string,
  productUlid: string,
  imageUlids: readonly string[],
): Promise<void> {
  await apiRequest(`${productPath(storeUlid, productUlid)}/images/order`, {
    method: 'PUT',
    body: { imageUlids },
  });
}

export async function changeProductLifecycle(
  storeUlid: string,
  productUlid: string,
  transition: LifecycleTransition,
): Promise<void> {
  await apiRequest(`${productPath(storeUlid, productUlid)}/${transition}`, { method: 'POST' });
}
