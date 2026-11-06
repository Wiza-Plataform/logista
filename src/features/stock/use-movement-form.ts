'use client';

import { useState, useTransition } from 'react';
import type { SubmitEvent } from 'react';

import type { MovementType, StockItem } from '@/shared/contracts/catalog/stock';
import { useToast } from '@/shared/feedback/toaster';
import type { FormFailure } from '@/shared/forms/form-failure';
import { parseQuantity } from '@/shared/i18n/parse';
import { strings } from '@/shared/i18n/strings';

import { registerMovementAction } from './actions';
import { confirmationOf } from './stock-labels';

export interface MovementFormState {
  readonly type: MovementType;
  readonly quantity: string;
  readonly note: string;
}

const EMPTY_FORM: MovementFormState = { type: 'RECEIPT', quantity: '', note: '' };

export function useMovementForm(item: StockItem, onRegistered: () => void) {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<MovementFormState>(EMPTY_FORM);
  const [failure, setFailure] = useState<FormFailure | null>(null);

  function change(patch: Partial<MovementFormState>) {
    setValues((current) => ({ ...current, ...patch }));
  }

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const quantity = parseQuantity(values.quantity);
    if (quantity === null) {
      setFailure({ message: strings.stock.invalidQuantity, field: 'quantity' });
      return;
    }

    startTransition(async () => {
      const result = await registerMovementAction({
        variantUlid: item.variantUlid,
        type: values.type,
        quantity,
        note: values.note.trim() === '' ? null : values.note.trim(),
      });
      if (result.status === 'failed') {
        setFailure(result);
        return;
      }
      toast(confirmationOf(result.type));
      setFailure(null);
      setValues({ ...EMPTY_FORM, type: values.type });
      onRegistered();
    });
  }

  return { values, change, submit, isPending, failure };
}
