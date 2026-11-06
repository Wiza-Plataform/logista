import type { SaveProductRequest } from '@/shared/contracts/catalog/product';
import type { FailedAction } from '@/shared/forms/form-failure';

export const PRODUCTS_PATH = '/produtos';

export type LifecycleTransition = 'publish' | 'unpublish' | 'restore';

export interface InitialStockEntry {
  readonly optionValues: readonly string[];
  readonly quantity: number;
}

export interface SaveProductInput {
  readonly productUlid: string | null;
  readonly product: SaveProductRequest;
  readonly initialStock: readonly InitialStockEntry[];
}

export type SaveProductResult =
  | { readonly status: 'saved'; readonly productUlid: string; readonly stockIssue: string | null }
  | FailedAction;

export type ProductChangeResult = { readonly status: 'done' } | FailedAction;
