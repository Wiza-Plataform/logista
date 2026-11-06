import type { FailedAction } from '@/shared/forms/form-failure';

export const CATEGORIES_PATH = '/produtos/categorias';

export type CategoryActionResult =
  | { readonly status: 'created' }
  | { readonly status: 'updated' }
  | { readonly status: 'removed' }
  | { readonly status: 'reordered' }
  | { readonly status: 'shown' }
  | { readonly status: 'hidden' }
  | FailedAction;
