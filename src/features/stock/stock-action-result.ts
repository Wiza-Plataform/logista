import type { MovementType, StockMovement } from '@/shared/contracts/catalog/stock';
import type { FailedAction } from '@/shared/forms/form-failure';

export type RegisterMovementResult =
  { readonly status: 'registered'; readonly type: MovementType } | FailedAction;

export type MovementHistoryResult =
  { readonly status: 'loaded'; readonly movements: readonly StockMovement[] } | FailedAction;
