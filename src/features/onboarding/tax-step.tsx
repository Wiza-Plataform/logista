'use client';

import { maskDigits } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { Field, FieldGroup, FieldPair, FieldState } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type { FieldMessages, StoreForm, StoreFormField } from './types';
import { MAX_NIF_DIGITS, isNifComplete } from './validation';

export type TaxValues = Pick<StoreForm, 'nif' | 'fiscalName'>;

interface TaxStepProps {
  values: TaxValues;
  errors: FieldMessages;
  onChange: <K extends StoreFormField>(field: K, value: StoreForm[K]) => void;
}

function NifField({ values, errors, onChange }: TaxStepProps) {
  const t = strings.onboarding;
  const hasError = errors.nif !== undefined;

  return (
    <Field label={t.nif} isRequired error={errors.nif}>
      <Input
        variant="form"
        value={values.nif}
        maxLength={MAX_NIF_DIGITS}
        inputMode="numeric"
        aria-invalid={hasError}
        placeholder={t.nifPlaceholder}
        className="tabular-nums"
        onChange={(event) => {
          onChange('nif', maskDigits(event.target.value, MAX_NIF_DIGITS));
        }}
      />
      {!hasError && isNifComplete(values.nif) && <FieldState tone="positive" text={t.nifValid} />}
    </Field>
  );
}

function FiscalNameField({ values, errors, onChange }: TaxStepProps) {
  const t = strings.onboarding;

  return (
    <Field label={t.fiscalName} isRequired error={errors.fiscalName}>
      <Input
        variant="form"
        value={values.fiscalName}
        maxLength={160}
        aria-invalid={errors.fiscalName !== undefined}
        placeholder={t.fiscalNamePlaceholder}
        onChange={(event) => {
          onChange('fiscalName', event.target.value);
        }}
      />
    </Field>
  );
}

export function TaxStep({ values, errors, onChange }: TaxStepProps) {
  return (
    <FieldGroup>
      <FieldPair>
        <NifField values={values} errors={errors} onChange={onChange} />
        <FiscalNameField values={values} errors={errors} onChange={onChange} />
      </FieldPair>
    </FieldGroup>
  );
}
