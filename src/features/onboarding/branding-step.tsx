'use client';

import { useState } from 'react';

import { strings } from '@/shared/i18n/strings';
import { Field, FieldGroup, FieldHint, Textarea } from '@/shared/ui/field';
import { Picture, Plus } from '@/shared/ui/icons';

import { ColorSwatches, tokenOfHex } from './color-swatches';
import type { FieldMessages, StoreForm, StoreFormField } from './types';
import { UploadSlot } from './upload-slot';

export type BrandingValues = Pick<StoreForm, 'description' | 'primaryColor'>;

interface BrandingStepProps {
  values: BrandingValues;
  errors: FieldMessages;
  onChange: <K extends StoreFormField>(field: K, value: StoreForm[K]) => void;
}

function fillOf(primaryColor: string): string | undefined {
  const token = tokenOfHex(primaryColor);
  return token === undefined ? undefined : `var(${token})`;
}

function LogoField({ primaryColor }: { primaryColor: string }) {
  const t = strings.onboarding;
  const [isFilled, setIsFilled] = useState(false);

  return (
    <Field label={t.logo} isGroup>
      <div className="flex items-center gap-3.5">
        <UploadSlot
          isFilled={isFilled}
          fill={fillOf(primaryColor)}
          label={t.logoUpload}
          className="size-16.5 shrink-0 rounded-[15px] border"
          onToggle={() => {
            setIsFilled(!isFilled);
          }}
        >
          {isFilled ? (
            <span className="font-[family-name:var(--font-sansita)] text-2xl text-white">K</span>
          ) : (
            <Plus className="size-5.5" strokeWidth={1.7} />
          )}
        </UploadSlot>

        <div>
          <div className="text-sm font-medium">{t.logoUpload}</div>
          <FieldHint>{t.logoHint}</FieldHint>
        </div>
      </div>
    </Field>
  );
}

function BannerField({ primaryColor }: { primaryColor: string }) {
  const t = strings.onboarding;
  const [isFilled, setIsFilled] = useState(false);
  const fill = fillOf(primaryColor);

  return (
    <Field label={t.banner} isGroup>
      <UploadSlot
        isFilled={isFilled}
        fill={
          fill === undefined ? undefined : `linear-gradient(120deg, ${fill}, var(--lima-oliva))`
        }
        label={t.bannerUpload}
        className="h-19.5 w-full rounded-[12px] border"
        onToggle={() => {
          setIsFilled(!isFilled);
        }}
      >
        {isFilled ? (
          <span className="text-sm font-semibold text-white">{t.bannerLoaded}</span>
        ) : (
          <>
            <Picture className="size-5" strokeWidth={1.7} />
            <span className="text-xs">{t.bannerUpload}</span>
          </>
        )}
      </UploadSlot>
    </Field>
  );
}

export function BrandingStep({ values, errors, onChange }: BrandingStepProps) {
  const t = strings.onboarding;

  return (
    <FieldGroup>
      <LogoField primaryColor={values.primaryColor} />

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

      <BannerField primaryColor={values.primaryColor} />
    </FieldGroup>
  );
}
