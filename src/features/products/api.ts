import { apiRequest, parseResponse } from '@/shared/api/client';
import { productOverviewSchema, productPageSchema } from '@/shared/contracts/catalog/product';
import type { ProductOverview, ProductPage } from '@/shared/contracts/catalog/product';

export async function fetchProductPage(
  storeUlid: string,
  query: Readonly<Record<string, string>>,
): Promise<ProductPage> {
  return parseResponse(
    productPageSchema,
    await apiRequest(`/stores/${storeUlid}/products`, { query }),
  );
}

export async function fetchProductOverview(storeUlid: string): Promise<ProductOverview> {
  return parseResponse(
    productOverviewSchema,
    await apiRequest(`/stores/${storeUlid}/products/overview`),
  );
}
