import Link from 'next/link';
import type { Dispatch } from 'react';

import { fieldErrorOf } from '@/shared/forms/form-failure';
import type { FormFailure } from '@/shared/forms/form-failure';
import { SelectField } from '@/shared/forms/select-field';
import { strings } from '@/shared/i18n/strings';
import { Field } from '@/shared/ui/field';

import type { ProductDraft } from './draft';
import type { DraftAction } from './draft-reducer';
import type { FormChoices } from './form-choices';
import { FormSection, SECTION_INPUT } from './form-section';

const text = strings.productForm;

interface OrganizationSectionProps {
  readonly draft: ProductDraft;
  readonly dispatch: Dispatch<DraftAction>;
  readonly failure: FormFailure | null;
  readonly choices: FormChoices;
}

function NoUnits() {
  return (
    <p className="text-sm text-muted-foreground">
      {text.noUnits}{' '}
      <Link
        href="/produtos/unidades"
        className="font-semibold text-(--accent-text) underline-offset-4 hover:underline"
      >
        {text.createUnit}
      </Link>
    </p>
  );
}

export function OrganizationSection({
  draft,
  dispatch,
  failure,
  choices,
}: OrganizationSectionProps) {
  const unitError = fieldErrorOf(failure, 'unitUlid');

  return (
    <FormSection title={text.organization}>
      <Field label={text.category} error={fieldErrorOf(failure, 'categoryUlids')}>
        <SelectField
          value={draft.categoryUlid}
          className={SECTION_INPUT}
          options={[
            { value: '', label: text.noCategory },
            ...choices.categories.map((category) => ({
              value: category.categoryUlid,
              label: category.path.join(text.categorySeparator),
            })),
          ]}
          onValueChange={(value) => {
            dispatch({ type: 'field', field: 'categoryUlid', value });
          }}
        />
      </Field>
      {choices.units.length === 0 ? (
        <Field label={text.unit} isRequired isGroup error={unitError}>
          <NoUnits />
        </Field>
      ) : (
        <Field label={text.unit} isRequired error={unitError}>
          <SelectField
            value={draft.unitUlid}
            isInvalid={unitError !== undefined}
            className={SECTION_INPUT}
            options={choices.units.map((unit) => ({
              value: unit.unitUlid,
              label: `${unit.name} (${unit.symbol})`,
            }))}
            onValueChange={(value) => {
              dispatch({ type: 'field', field: 'unitUlid', value });
            }}
          />
        </Field>
      )}
    </FormSection>
  );
}
