'use client';

import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { Field, FieldGroup, Textarea } from '@/shared/ui/field';
import { Check } from '@/shared/ui/icons';

import { BRAND_COLORS } from './options';
import type { BrandColor } from './options';
import type { FieldMessages, StoreForm, StoreFormField } from './types';

export type BrandingValues = Pick<StoreForm, 'description' | 'primaryColor'>;

interface BrandingStepProps {
  values: BrandingValues;
  errors: FieldMessages;
  onChange: <K extends StoreFormField>(field: K, value: StoreForm[K]) => void;
}

function Swatch({
  color,
  isSelected,
  onSelect,
}: {
  color: BrandColor;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={color.label}
      aria-pressed={isSelected}
      onClick={onSelect}
      style={{ background: `var(${color.token})` }}
      className={cn(
        'grid size-11 place-items-center rounded-sm border-2 transition-transform duration-[120ms] hover:scale-[1.08] sm:size-9',
        isSelected ? 'border-foreground' : 'border-transparent',
      )}
    >
      {isSelected && <Check className="size-3.5 text-white" strokeWidth={3} />}
    </button>
  );
}

function ColorPalette({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (hex: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {BRAND_COLORS.map((color) => (
        <Swatch
          key={color.hex}
          color={color}
          isSelected={selected === color.hex}
          onSelect={() => {
            onSelect(selected === color.hex ? '' : color.hex);
          }}
        />
      ))}
    </div>
  );
}

export function BrandingStep({ values, errors, onChange }: BrandingStepProps) {
  const t = strings.onboarding;

  return (
    <FieldGroup>
      <Field label={t.primaryColor} error={errors.primaryColor}>
        <ColorPalette
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
