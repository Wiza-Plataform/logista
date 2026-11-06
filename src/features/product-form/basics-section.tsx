import type { Dispatch } from 'react';

import { fieldErrorOf } from '@/shared/forms/form-failure';
import type { FormFailure } from '@/shared/forms/form-failure';
import { strings } from '@/shared/i18n/strings';
import { Field, FieldHint, InputAffix, Textarea } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type { ProductDraft } from './draft';
import type { DraftAction } from './draft-reducer';
import { FormSection, SECTION_INPUT } from './form-section';

const text = strings.productForm;
const MAX_NAME_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 5000;
const MAX_SLUG_LENGTH = 80;

interface BasicsSectionProps {
  readonly draft: ProductDraft;
  readonly dispatch: Dispatch<DraftAction>;
  readonly failure: FormFailure | null;
  readonly storeAddress: string;
}

export function BasicsSection({ draft, dispatch, failure, storeAddress }: BasicsSectionProps) {
  const nameError = fieldErrorOf(failure, 'name');
  const slugError = fieldErrorOf(failure, 'slug');

  return (
    <FormSection title={text.basics}>
      <Field label={text.name} isRequired error={nameError}>
        <Input
          variant="form"
          value={draft.name}
          maxLength={MAX_NAME_LENGTH}
          placeholder={text.namePlaceholder}
          aria-invalid={nameError !== undefined}
          className={SECTION_INPUT}
          onChange={(event) => {
            dispatch({ type: 'name', value: event.currentTarget.value });
          }}
        />
      </Field>
      <Field label={text.description} error={fieldErrorOf(failure, 'description')}>
        <Textarea
          value={draft.description}
          maxLength={MAX_DESCRIPTION_LENGTH}
          placeholder={text.descriptionPlaceholder}
          className={SECTION_INPUT}
          onChange={(event) => {
            dispatch({ type: 'field', field: 'description', value: event.currentTarget.value });
          }}
        />
        <FieldHint>{text.descriptionHint}</FieldHint>
      </Field>
      <Field label={text.slug} error={slugError}>
        <InputAffix
          prefix={storeAddress}
          value={draft.slug}
          maxLength={MAX_SLUG_LENGTH}
          placeholder={text.slugPlaceholder}
          isInvalid={slugError !== undefined}
          className={SECTION_INPUT}
          onChange={(event) => {
            dispatch({ type: 'slug', value: event.currentTarget.value });
          }}
        />
      </Field>
    </FormSection>
  );
}
