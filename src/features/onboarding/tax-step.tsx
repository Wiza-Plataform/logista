'use client';

import type { ReferenceItem } from '@/shared/contracts/platform-config';
import { vatRegimeSchema } from '@/shared/contracts/store';
import { strings } from '@/shared/i18n/strings';
import { Field, FieldGroup, FieldPair, NativeSelect } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import { VAT_REGIME_OPTIONS } from './options';
import type { FieldMessages, StoreForm, StoreFormField } from './types';

export type TaxValues = Pick<StoreForm, 'nif' | 'bizTypeUlid' | 'vatRegime'>;

interface TaxStepProps {
  values: TaxValues;
  businessTypes: readonly ReferenceItem[];
  errors: FieldMessages;
  onChange: <K extends StoreFormField>(field: K, value: StoreForm[K]) => void;
}

function BusinessTypeField({ values, businessTypes, errors, onChange }: TaxStepProps) {
  const t = strings.onboarding;

  return (
    <Field label={t.businessType} error={errors.bizTypeUlid}>
      <NativeSelect
        value={values.bizTypeUlid}
        aria-invalid={errors.bizTypeUlid !== undefined}
        onChange={(event) => {
          onChange('bizTypeUlid', event.target.value);
        }}
      >
        <option value="">{t.selectPlaceholder}</option>
        {businessTypes.map((type) => (
          <option key={type.ulid} value={type.ulid}>
            {type.label}
          </option>
        ))}
      </NativeSelect>
    </Field>
  );
}

function VatRegimeField({ values, errors, onChange }: Omit<TaxStepProps, 'businessTypes'>) {
  const t = strings.onboarding;

  return (
    <Field label={t.vatRegime} error={errors.vatRegime}>
      <NativeSelect
        value={values.vatRegime}
        onChange={(event) => {
          onChange('vatRegime', vatRegimeSchema.catch('EXEMPT').parse(event.target.value));
        }}
      >
        {VAT_REGIME_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
    </Field>
  );
}

export function TaxStep({ values, businessTypes, errors, onChange }: TaxStepProps) {
  const t = strings.onboarding;

  return (
    <FieldGroup>
      <Field label={t.nif} isRequired error={errors.nif}>
        <Input
          variant="form"
          value={values.nif}
          maxLength={10}
          inputMode="numeric"
          aria-invalid={errors.nif !== undefined}
          placeholder={t.nifPlaceholder}
          className="tabular-nums"
          onChange={(event) => {
            onChange('nif', event.target.value);
          }}
        />
      </Field>

      <FieldPair>
        <BusinessTypeField
          values={values}
          businessTypes={businessTypes}
          errors={errors}
          onChange={onChange}
        />
        <VatRegimeField values={values} errors={errors} onChange={onChange} />
      </FieldPair>
    </FieldGroup>
  );
}
