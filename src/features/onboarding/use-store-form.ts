'use client';

import { useState } from 'react';

import { ACCOUNT_FIELDS, EMPTY_FORM } from './types';
import type { FieldMessages, Result, StoreForm, StoreFormField } from './types';
import { toFormField } from './validation';

function withoutField(messages: FieldMessages, field: string): FieldMessages {
  return Object.fromEntries(Object.entries(messages).filter(([key]) => key !== field));
}

export function useStoreForm() {
  const [form, setForm] = useState<StoreForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldMessages>({});
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  return {
    form,
    errors,
    alertMessage,

    setField: <K extends StoreFormField>(field: K, value: StoreForm[K]) => {
      setForm((previous) => ({ ...previous, [field]: value }));
      setErrors((previous) => withoutField(previous, field));
      setAlertMessage(null);
    },

    showErrors: (found: FieldMessages): boolean => {
      setErrors(found);
      return Object.keys(found).length === 0;
    },

    fail: (failure: Extract<Result<unknown>, { ok: false }>, goToFirstStep: () => void) => {
      const field = toFormField(failure.field);
      if (field === undefined) {
        setAlertMessage(failure.message);
        return;
      }
      if (ACCOUNT_FIELDS.includes(field)) goToFirstStep();
      setErrors({ [field]: failure.message });
    },
  };
}
