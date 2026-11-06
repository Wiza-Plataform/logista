'use client';

import { useState } from 'react';

import type { CategoryNode } from '@/shared/contracts/catalog/category';
import { fieldErrorOf, generalErrorOf } from '@/shared/forms/form-failure';
import type { FormFailure } from '@/shared/forms/form-failure';
import { SelectField } from '@/shared/forms/select-field';
import { SwitchRow } from '@/shared/forms/switch-row';
import { strings } from '@/shared/i18n/strings';
import { slugOf } from '@/shared/text/slug';
import { AlertMessage, Field, InputAffix } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import { parentChoicesFor } from './category-tree';

const text = strings.categories;
const DRAWER_INPUT = 'bg-background';
const FIELD_NAMES = ['name', 'slug', 'parentCategoryUlid'] as const;
const MAX_NAME_LENGTH = 120;
const MAX_SLUG_LENGTH = 80;

interface CategoryFieldsProps {
  readonly category: CategoryNode | null;
  readonly tree: readonly CategoryNode[];
  readonly failure: FormFailure | null;
}

function useSlugFollowingName(category: CategoryNode | null) {
  const [slug, setSlug] = useState(category?.slug ?? '');
  const [isSlugEdited, setSlugEdited] = useState(category !== null);

  return {
    slug,
    followName: (name: string) => {
      if (!isSlugEdited) setSlug(slugOf(name));
    },
    editSlug: (value: string) => {
      setSlugEdited(true);
      setSlug(value);
    },
  };
}

function ParentSelect({ category, tree, failure }: CategoryFieldsProps) {
  const error = fieldErrorOf(failure, 'parentCategoryUlid');

  return (
    <Field label={text.parent} error={error}>
      <SelectField
        name="parentCategoryUlid"
        defaultValue={category?.parentCategoryUlid ?? ''}
        isInvalid={error !== undefined}
        className={DRAWER_INPUT}
        options={[
          { value: '', label: text.noParent },
          ...parentChoicesFor(tree, category).map((choice) => ({
            value: choice.categoryUlid,
            label: choice.path.join(text.pathSeparator),
          })),
        ]}
      />
    </Field>
  );
}

export function CategoryFields({ category, tree, failure }: CategoryFieldsProps) {
  const generalError = generalErrorOf(failure, FIELD_NAMES);
  const nameError = fieldErrorOf(failure, 'name');
  const slugError = fieldErrorOf(failure, 'slug');
  const address = useSlugFollowingName(category);

  return (
    <>
      {generalError === null ? null : <AlertMessage text={generalError} />}
      <input type="hidden" name="categoryUlid" value={category?.categoryUlid ?? ''} />
      <Field label={text.name} error={nameError}>
        <Input
          variant="form"
          name="name"
          required
          maxLength={MAX_NAME_LENGTH}
          defaultValue={category?.name ?? ''}
          placeholder={text.namePlaceholder}
          aria-invalid={nameError !== undefined}
          className={DRAWER_INPUT}
          onChange={(event) => {
            address.followName(event.currentTarget.value);
          }}
        />
      </Field>
      <Field label={text.slug} error={slugError}>
        <InputAffix
          prefix={text.storePath}
          name="slug"
          maxLength={MAX_SLUG_LENGTH}
          value={address.slug}
          placeholder={text.slugPlaceholder}
          isInvalid={slugError !== undefined}
          className={DRAWER_INPUT}
          onChange={(event) => {
            address.editSlug(event.currentTarget.value);
          }}
        />
      </Field>
      <ParentSelect category={category} tree={tree} failure={failure} />
      <Field label={text.visibility} isGroup>
        <SwitchRow
          name="isVisible"
          label={text.showInStore}
          isDefaultOn={category?.isVisible ?? true}
        />
      </Field>
    </>
  );
}
