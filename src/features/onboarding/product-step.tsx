'use client';

import { strings } from '@/shared/i18n/strings';
import { Field, FieldGroup, FieldPair, NativeSelect, Textarea } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import { PhotoSlots } from './photo-slots';
import type { ProductDraft, ProductDraftField } from './types';

interface ProductStepProps {
  draft: ProductDraft;
  onChange: (field: ProductDraftField, value: string) => void;
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
}

type TextFieldProps = Pick<ProductStepProps, 'draft' | 'onChange'>;

function CategoryField({ draft, onChange }: TextFieldProps) {
  const t = strings.onboarding;

  return (
    <Field label={t.productCategory}>
      <NativeSelect
        value={draft.category}
        onChange={(event) => {
          onChange('category', event.target.value);
        }}
      >
        <option value="">{t.selectPlaceholder}</option>
        {t.productCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </NativeSelect>
    </Field>
  );
}

function NumericField({
  label,
  placeholder,
  field,
  draft,
  onChange,
}: TextFieldProps & { label: string; placeholder: string; field: ProductDraftField }) {
  return (
    <Field label={label}>
      <Input
        variant="form"
        value={draft[field]}
        inputMode="numeric"
        placeholder={placeholder}
        className="tabular-nums"
        onChange={(event) => {
          onChange(field, event.target.value);
        }}
      />
    </Field>
  );
}

function PhotosField({ draft, onAddPhoto, onRemovePhoto }: Omit<ProductStepProps, 'onChange'>) {
  const t = strings.onboarding;

  return (
    <Field label={t.productPhotos} hint={t.productPhotosHint} isGroup>
      <PhotoSlots photos={draft.photos} onAdd={onAddPhoto} onRemove={onRemovePhoto} />
    </Field>
  );
}

export function ProductStep({ draft, onChange, onAddPhoto, onRemovePhoto }: ProductStepProps) {
  const t = strings.onboarding;

  return (
    <FieldGroup>
      <Field label={t.productName}>
        <Input
          variant="form"
          value={draft.name}
          maxLength={120}
          placeholder={t.productNamePlaceholder}
          onChange={(event) => {
            onChange('name', event.target.value);
          }}
        />
      </Field>

      <FieldPair>
        <CategoryField draft={draft} onChange={onChange} />
        <NumericField
          label={t.productPrice}
          placeholder={t.productPricePlaceholder}
          field="price"
          draft={draft}
          onChange={onChange}
        />
      </FieldPair>

      <FieldPair>
        <NumericField
          label={t.productStock}
          placeholder={t.productStockPlaceholder}
          field="stock"
          draft={draft}
          onChange={onChange}
        />
        <NumericField
          label={t.productWeight}
          placeholder={t.productWeightPlaceholder}
          field="weight"
          draft={draft}
          onChange={onChange}
        />
      </FieldPair>

      <Field label={t.productDescription}>
        <Textarea
          value={draft.description}
          maxLength={500}
          placeholder={t.productDescriptionPlaceholder}
          onChange={(event) => {
            onChange('description', event.target.value);
          }}
        />
      </Field>

      <PhotosField draft={draft} onAddPhoto={onAddPhoto} onRemovePhoto={onRemovePhoto} />
    </FieldGroup>
  );
}
