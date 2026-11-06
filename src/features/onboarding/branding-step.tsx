'use client';

import { strings } from '@/shared/i18n/strings';
import { Field, FieldGroup, Textarea } from '@/shared/ui/field';

import { ColorSwatches } from './color-swatches';
import type { FieldMessages, StoreForm, StoreFormField } from './types';

export type BrandingValues = Pick<StoreForm, 'description' | 'primaryColor'>;

interface BrandingStepProps {
  values: BrandingValues;
  errors: FieldMessages;
  onChange: <K extends StoreFormField>(field: K, value: StoreForm[K]) => void;
}

export function BrandingStep({ values, errors, onChange }: BrandingStepProps) {
  const t = strings.onboarding;

  return (
    <FieldGroup>
      <Field label={t.primaryColor} isGroup error={errors.primaryColor}>
        <ColorSwatches
          selected={values.primaryColor}
          onSelect={(hex) => {
            onChange('primaryColor', hex);
          }}
        />
      </Field>

      <Field label={t.storeDescription} error={errors.description}>
        <Textarea
          value={values.description}
          maxLength={500}
          placeholder={t.storeDescriptionPlaceholder}
          onChange={(event) => {
            onChange('description', event.target.value);
          }}
        />
      </Field>
    </FieldGroup>
  );
}
