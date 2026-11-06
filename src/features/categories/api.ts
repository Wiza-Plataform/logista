import { ApiError, apiRequest, parseResponse } from '@/shared/api/client';
import {
  categoryListSchema,
  categorySchema,
  categoryTreeSchema,
} from '@/shared/contracts/catalog/category';
import type { CategoryNode, SaveCategoryRequest } from '@/shared/contracts/catalog/category';
import { productOverviewSchema } from '@/shared/contracts/catalog/product';
import type { ProductOverview } from '@/shared/contracts/catalog/product';
import { ulidSchema } from '@/shared/contracts/ulid';
import { strings } from '@/shared/i18n/strings';

function categoriesPath(storeUlid: string): string {
  return `/stores/${storeUlid}/categories`;
}

function categoryPath(storeUlid: string, categoryUlid: string): string {
  if (!ulidSchema.safeParse(categoryUlid).success) {
    throw new ApiError(0, undefined, strings.apiErrors.unexpected);
  }
  return `${categoriesPath(storeUlid)}/${categoryUlid}`;
}

function bodyOf(request: SaveCategoryRequest) {
  return {
    name: request.name,
    slug: request.slug,
    parentCategoryUlid: request.parentCategoryUlid,
    isVisible: request.isVisible,
  };
}

function creationBodyOf(request: SaveCategoryRequest) {
  const { slug, ...rest } = bodyOf(request);
  return slug.trim() === '' ? rest : { ...rest, slug };
}

export async function fetchCategoryTree(storeUlid: string): Promise<readonly CategoryNode[]> {
  return parseResponse(categoryTreeSchema, await apiRequest(categoriesPath(storeUlid)));
}

export async function fetchCatalogOverview(storeUlid: string): Promise<ProductOverview> {
  return parseResponse(
    productOverviewSchema,
    await apiRequest(`/stores/${storeUlid}/products/overview`),
  );
}

export async function createCategory(
  storeUlid: string,
  request: SaveCategoryRequest,
): Promise<void> {
  parseResponse(
    categorySchema,
    await apiRequest(categoriesPath(storeUlid), { method: 'POST', body: creationBodyOf(request) }),
  );
}

export async function updateCategory(
  storeUlid: string,
  categoryUlid: string,
  request: SaveCategoryRequest,
): Promise<void> {
  parseResponse(
    categorySchema,
    await apiRequest(categoryPath(storeUlid, categoryUlid), {
      method: 'PATCH',
      body: bodyOf(request),
    }),
  );
}

export async function changeCategoryVisibility(
  storeUlid: string,
  categoryUlid: string,
  isVisible: boolean,
): Promise<void> {
  parseResponse(
    categorySchema,
    await apiRequest(categoryPath(storeUlid, categoryUlid), {
      method: 'PATCH',
      body: { isVisible },
    }),
  );
}

export async function reorderCategories(
  storeUlid: string,
  parentCategoryUlid: string | null,
  categoryUlids: readonly string[],
): Promise<void> {
  parseResponse(
    categoryListSchema,
    await apiRequest(`${categoriesPath(storeUlid)}/order`, {
      method: 'PUT',
      body: { parentCategoryUlid, categoryUlids },
    }),
  );
}

export async function deleteCategory(storeUlid: string, categoryUlid: string): Promise<void> {
  await apiRequest(categoryPath(storeUlid, categoryUlid), { method: 'DELETE' });
}
