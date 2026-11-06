'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';

import type { StockMovement } from '@/shared/contracts/catalog/stock';

import { movementHistoryAction } from './actions';

export type MovementHistory =
  | { readonly status: 'loading' }
  | { readonly status: 'loaded'; readonly movements: readonly StockMovement[] }
  | { readonly status: 'failed'; readonly message: string };

export function useMovementHistory(variantUlid: string) {
  const [history, setHistory] = useState<MovementHistory>({ status: 'loading' });
  const [, startTransition] = useTransition();

  const reload = useCallback(() => {
    startTransition(async () => {
      const result = await movementHistoryAction(variantUlid);
      setHistory(
        result.status === 'loaded'
          ? { status: 'loaded', movements: result.movements }
          : { status: 'failed', message: result.message },
      );
    });
  }, [variantUlid]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { history, reload };
}
