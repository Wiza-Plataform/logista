import type { ReferenceItem } from '@/shared/contracts/reference-list';
import type { StoreTheme } from '@/shared/contracts/store-theme';

export interface PreviewCategory {
  readonly categoryUlid: string;
  readonly name: string;
}

export interface PreviewProduct {
  readonly productUlid: string;
  readonly name: string;
  readonly priceLabel: string | null;
  readonly imageUrl: string | null;
  readonly categoryUlids: readonly string[];
  readonly isNew: boolean;
}

export interface EditorData {
  readonly theme: StoreTheme;
  readonly subdomain: string;
  readonly provinces: readonly ReferenceItem[];
  readonly categories: readonly PreviewCategory[];
  readonly products: readonly PreviewProduct[];
}
