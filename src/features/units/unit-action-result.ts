import type { FailedAction } from '@/shared/forms/form-failure';

export const UNITS_PATH = '/produtos/unidades';

export type UnitActionResult =
  | { readonly status: 'created' }
  | { readonly status: 'updated' }
  | { readonly status: 'removed' }
  | FailedAction;
