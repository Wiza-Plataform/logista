import type { Dispatch } from 'react';

import { fieldErrorOf } from '@/shared/forms/form-failure';
import type { FormFailure } from '@/shared/forms/form-failure';
import { formatQuantity } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { Plus } from '@/shared/ui/icons';

import { MAX_OPTIONS } from './draft';
import type { Combination, ProductDraft } from './draft';
import type { DraftAction } from './draft-reducer';
import { FormSection } from './form-section';
import { OptionEditor } from './option-editor';
import { VariantMatrix } from './variant-matrix';

const text = strings.productForm;

interface VariationsSectionProps {
  readonly draft: ProductDraft;
  readonly dispatch: Dispatch<DraftAction>;
  readonly failure: FormFailure | null;
  readonly combinations: readonly Combination[];
  readonly unitSymbol: string;
  readonly retiredStock: number;
}

interface RetiredStockNoticeProps {
  readonly quantity: number;
  readonly unitSymbol: string;
  readonly hasCombinations: boolean;
}

function errorOf(failure: FormFailure | null, hasCombinations: boolean): string | undefined {
  const optionsError = fieldErrorOf(failure, 'options');
  return hasCombinations ? (optionsError ?? fieldErrorOf(failure, 'variants')) : optionsError;
}

function RetiredStockNotice({ quantity, unitSymbol, hasCombinations }: RetiredStockNoticeProps) {
  return (
    <p className="mt-3 rounded-sm border border-(--st-wait-fg) bg-(--st-wait-bg) px-3 py-2.25 text-sm leading-[1.5] text-(--st-wait-fg)">
      {text.retiredStockLead}{' '}
      <strong className="font-semibold">
        ({formatQuantity(quantity)} {unitSymbol})
      </strong>{' '}
      {text.retiredStockRest} {hasCombinations ? text.retiredStockMatrix : text.retiredStockSimple}
    </p>
  );
}

export function VariationsSection({
  draft,
  dispatch,
  failure,
  combinations,
  unitSymbol,
  retiredStock,
}: VariationsSectionProps) {
  return (
    <FormSection
      title={text.variations}
      note={text.variationsNote}
      error={errorOf(failure, combinations.length > 0)}
    >
      {draft.options.length === 0 ? null : (
        <div className="flex flex-col gap-2.5">
          {draft.options.map((option) => (
            <OptionEditor key={option.key} option={option} dispatch={dispatch} />
          ))}
        </div>
      )}
      {draft.options.length < MAX_OPTIONS ? (
        <button
          type="button"
          onClick={() => {
            dispatch({ type: 'add-option', key: crypto.randomUUID() });
          }}
          className={cn(
            'text-fine inline-flex items-center gap-1.5 py-1.5 font-semibold text-(--accent-text)',
            draft.options.length > 0 && 'mt-[11px]',
          )}
        >
          <Plus className="size-3.5" strokeWidth={2.2} />
          {text.addOption}
        </button>
      ) : null}
      {retiredStock > 0 ? (
        <RetiredStockNotice
          quantity={retiredStock}
          unitSymbol={unitSymbol}
          hasCombinations={combinations.length > 0}
        />
      ) : null}
      {combinations.length === 0 ? null : (
        <VariantMatrix
          combinations={combinations}
          draft={draft}
          dispatch={dispatch}
          unitSymbol={unitSymbol}
        />
      )}
    </FormSection>
  );
}
