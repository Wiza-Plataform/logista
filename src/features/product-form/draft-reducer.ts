import { slugOf } from '@/shared/text/slug';

import { EMPTY_PRICE, MAX_OPTIONS, MAX_VALUES_PER_OPTION } from './draft';
import type { OptionDraft, PriceDraft, ProductDraft } from './draft';

type TextField = 'description' | 'unitUlid' | 'categoryUlid';

type FieldAction =
  | { readonly type: 'name'; readonly value: string }
  | { readonly type: 'slug'; readonly value: string }
  | { readonly type: 'field'; readonly field: TextField; readonly value: string }
  | { readonly type: 'base'; readonly field: keyof PriceDraft; readonly value: string }
  | {
      readonly type: 'row';
      readonly key: string;
      readonly field: keyof PriceDraft;
      readonly value: string;
    };

type OptionAction =
  | { readonly type: 'add-option'; readonly key: string }
  | { readonly type: 'rename-option'; readonly key: string; readonly name: string }
  | { readonly type: 'remove-option'; readonly key: string }
  | {
      readonly type: 'add-value';
      readonly optionKey: string;
      readonly key: string;
      readonly name: string;
    }
  | { readonly type: 'remove-value'; readonly optionKey: string; readonly key: string };

export type DraftAction = FieldAction | OptionAction;

function withOption(
  draft: ProductDraft,
  key: string,
  change: (option: OptionDraft) => OptionDraft,
): ProductDraft {
  return {
    ...draft,
    options: draft.options.map((option) => (option.key === key ? change(option) : option)),
  };
}

function withValueAdded(option: OptionDraft, key: string, rawName: string): OptionDraft {
  const name = rawName.trim();
  const isRepeated = option.values.some(
    (value) => value.name.toLocaleLowerCase('pt-AO') === name.toLocaleLowerCase('pt-AO'),
  );
  if (name === '' || isRepeated || option.values.length >= MAX_VALUES_PER_OPTION) return option;
  return { ...option, values: [...option.values, { key, valueUlid: null, name }] };
}

function withName(draft: ProductDraft, name: string): ProductDraft {
  return draft.isSlugEdited ? { ...draft, name } : { ...draft, name, slug: slugOf(name) };
}

function withRow(
  draft: ProductDraft,
  key: string,
  field: keyof PriceDraft,
  value: string,
): ProductDraft {
  const row = draft.rows.get(key) ?? EMPTY_PRICE;
  return { ...draft, rows: new Map(draft.rows).set(key, { ...row, [field]: value }) };
}

function withNewOption(draft: ProductDraft, key: string): ProductDraft {
  if (draft.options.length >= MAX_OPTIONS) return draft;
  return {
    ...draft,
    options: [...draft.options, { key, optionUlid: null, name: '', values: [] }],
  };
}

function optionReducer(draft: ProductDraft, action: OptionAction): ProductDraft {
  switch (action.type) {
    case 'add-option':
      return withNewOption(draft, action.key);
    case 'rename-option':
      return withOption(draft, action.key, (option) => ({ ...option, name: action.name }));
    case 'remove-option':
      return { ...draft, options: draft.options.filter((option) => option.key !== action.key) };
    case 'add-value':
      return withOption(draft, action.optionKey, (option) =>
        withValueAdded(option, action.key, action.name),
      );
    case 'remove-value':
      return withOption(draft, action.optionKey, (option) => ({
        ...option,
        values: option.values.filter((value) => value.key !== action.key),
      }));
  }
}

export function draftReducer(draft: ProductDraft, action: DraftAction): ProductDraft {
  switch (action.type) {
    case 'name':
      return withName(draft, action.value);
    case 'slug':
      return { ...draft, slug: action.value, isSlugEdited: true };
    case 'field':
      return { ...draft, [action.field]: action.value };
    case 'base':
      return { ...draft, base: { ...draft.base, [action.field]: action.value } };
    case 'row':
      return withRow(draft, action.key, action.field, action.value);
    default:
      return optionReducer(draft, action);
  }
}
