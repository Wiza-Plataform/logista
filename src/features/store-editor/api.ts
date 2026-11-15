import { apiRequest, parseResponse } from '@/shared/api/client';
import { categoryTreeSchema } from '@/shared/contracts/catalog/category';
import { productPageSchema } from '@/shared/contracts/catalog/product';
import type { ProductSummary } from '@/shared/contracts/catalog/product';
import { referenceItemListSchema } from '@/shared/contracts/reference-list';
import { storeThemeSchema } from '@/shared/contracts/store-theme';
import type { StoreTheme, ThemeDraft } from '@/shared/contracts/store-theme';
import { imageFormOf } from '@/shared/forms/image-file';
import { formatKwanza } from '@/shared/i18n/format';
import { getCurrentStore } from '@/shared/session/api';

import type { EditorData, PreviewProduct } from './editor-data';
import type { ImageSlot } from './image-slot';

const PREVIEW_PRODUCTS = '12';
const NEW_PRODUCT_DAYS = 30;
const DAY_MS = 86_400_000;
const UPLOAD_TIMEOUT_MS = 60_000;

const IMAGE_ROUTES: Readonly<Record<ImageSlot, string>> = {
  logo: 'logo',
  bannerImage: 'banner-image',
};

function themePath(storeUlid: string): string {
  return `/stores/${storeUlid}/theme`;
}

function toPreviewProduct(product: ProductSummary, now: number): PreviewProduct {
  return {
    productUlid: product.productUlid,
    name: product.name,
    priceLabel: product.minPriceInCents === null ? null : formatKwanza(product.minPriceInCents),
    imageUrl: product.coverThumbnailUrl,
    categoryUlids: product.categories.map((category) => category.categoryUlid),
    isNew: now - Date.parse(product.createdAt) < NEW_PRODUCT_DAYS * DAY_MS,
  };
}

export async function fetchEditorData(storeUlid: string): Promise<EditorData> {
  const [theme, provinces, products, categories, store] = await Promise.all([
    apiRequest(themePath(storeUlid)),
    apiRequest('/platform-config/lists/PROVINCE'),
    apiRequest(`/stores/${storeUlid}/products`, {
      query: { status: 'PUBLISHED', pageSize: PREVIEW_PRODUCTS },
    }),
    apiRequest(`/stores/${storeUlid}/categories`),
    getCurrentStore(),
  ]);
  const now = Date.now();

  return {
    theme: parseResponse(storeThemeSchema, theme),
    subdomain: store?.subdomain ?? '',
    provinces: parseResponse(referenceItemListSchema, provinces).items,
    categories: parseResponse(categoryTreeSchema, categories).map((node) => ({
      categoryUlid: node.categoryUlid,
      name: node.name,
    })),
    products: parseResponse(productPageSchema, products).items.map((product) =>
      toPreviewProduct(product, now),
    ),
  };
}

export async function saveThemeDraft(storeUlid: string, draft: ThemeDraft): Promise<StoreTheme> {
  return parseResponse(
    storeThemeSchema,
    await apiRequest(`${themePath(storeUlid)}/draft`, { method: 'PUT', body: draft }),
  );
}

export async function publishTheme(storeUlid: string): Promise<StoreTheme> {
  return parseResponse(
    storeThemeSchema,
    await apiRequest(`${themePath(storeUlid)}/publication`, { method: 'POST' }),
  );
}

export async function uploadThemeImage(
  storeUlid: string,
  slot: ImageSlot,
  image: File,
): Promise<StoreTheme> {
  return parseResponse(
    storeThemeSchema,
    await apiRequest(`${themePath(storeUlid)}/${IMAGE_ROUTES[slot]}`, {
      method: 'PUT',
      form: imageFormOf(image),
      timeoutMs: UPLOAD_TIMEOUT_MS,
    }),
  );
}

export async function removeThemeImage(storeUlid: string, slot: ImageSlot): Promise<StoreTheme> {
  return parseResponse(
    storeThemeSchema,
    await apiRequest(`${themePath(storeUlid)}/${IMAGE_ROUTES[slot]}`, { method: 'DELETE' }),
  );
}
