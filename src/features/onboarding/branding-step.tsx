'use client';

import { strings } from '@/shared/i18n/strings';
import { Field, FieldGroup, Textarea } from '@/shared/ui/field';

import { PaletteSwatches } from './palette-swatches';
import type { FieldMessages, StoreForm, StoreFormField } from './types';

export type BrandingValues = Pick<StoreForm, 'tagline' | 'palette'>;

const TAGLINE_MAX_LENGTH = 160;

interface BrandingStepProps {
  values: BrandingValues;
  errors: FieldMessages;
  onChange: <K extends StoreFormField>(field: K, value: StoreForm[K]) => void;
}

export function BrandingStep({ values, errors, onChange }: BrandingStepProps) {
  const t = strings.onboarding;

  return (
    <FieldGroup>
      <Field label={t.palette} isGroup error={errors.palette}>
        <PaletteSwatches
          selected={values.palette}
          onSelect={(palette) => {
            onChange('palette', palette);
          }}
        />
      </Field>

      <Field label={t.tagline} error={errors.tagline}>
        <Textarea
          value={values.tagline}
          maxLength={TAGLINE_MAX_LENGTH}
          placeholder={t.taglinePlaceholder}
          onChange={(event) => {
            onChange('tagline', event.target.value);
          }}
        />
      </Field>
    </FieldGroup>
  );
}
