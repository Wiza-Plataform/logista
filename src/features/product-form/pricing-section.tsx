import Link from 'next/link';
import type { ChangeEvent, Dispatch } from 'react';

import type { Unit } from '@/shared/contracts/catalog/unit';
import { fieldErrorOf } from '@/shared/forms/form-failure';
import type { FormFailure } from '@/shared/forms/form-failure';
import { formatQuantity, KWANZA_SYMBOL } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { Field, FieldHint, InputAffix } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import { SIMPLE_KEY } from './draft';
import type { PriceDraft, ProductDraft } from './draft';
import type { DraftAction } from './draft-reducer';
import { FormSection, SECTION_INPUT } from './form-section';

const text = strings.productForm;
const PRICE_PLACEHOLDER = '7.500';
const ZERO_PLACEHOLDER = '0';
const MAX_SKU_LENGTH = 40;

interface PricingSectionProps {
  readonly draft: ProductDraft;
  readonly dispatch: Dispatch<DraftAction>;
  readonly failure: FormFailure | null;
  readonly unit: Unit | null;
  readonly hasCombinations: boolean;
  readonly stockSearch: string | null;
}

function StockLink({ search }: { readonly search: string | null }) {
  if (search === null) return null;
  return (
    <Link
      href={`/produtos/stock?q=${encodeURIComponent(search)}`}
      className="text-fine mt-3 inline-flex font-semibold text-(--accent-text) underline-offset-4 hover:underline"
    >
      {strings.stock.moveInStock}
    </Link>
  );
}

function SimpleStock({
  draft,
  dispatch,
  failure,
  unit,
}: Omit<PricingSectionProps, 'hasCombinations'>) {
  const onHand = draft.stockOnHand.get(SIMPLE_KEY);

  if (onHand !== undefined) {
    return (
      <Field label={text.currentStock} isGroup>
        <p className="text-step font-semibold tabular-nums">
          {formatQuantity(onHand)} {unit?.symbol ?? ''}
        </p>
        <FieldHint>{text.stockHint}</FieldHint>
      </Field>
    );
  }

  const stockError = fieldErrorOf(failure, 'stock');
  return (
    <Field label={text.initialStock} error={stockError}>
      <InputAffix
        inputMode="decimal"
        value={draft.base.initialStock}
        placeholder={ZERO_PLACEHOLDER}
        isInvalid={stockError !== undefined}
        className={SECTION_INPUT}
        {...(unit === null ? {} : { suffix: unit.symbol })}
        onChange={(event) => {
          dispatch({ type: 'base', field: 'initialStock', value: event.currentTarget.value });
        }}
      />
      <FieldHint>{text.stockHint}</FieldHint>
    </Field>
  );
}

function priceErrorOf(failure: FormFailure | null, hasCombinations: boolean): string | undefined {
  const own = fieldErrorOf(failure, 'price');
  return hasCombinations ? own : (own ?? fieldErrorOf(failure, 'variants'));
}

export function PricingSection(props: PricingSectionProps) {
  const { draft, dispatch, failure, hasCombinations } = props;
  const priceError = priceErrorOf(failure, hasCombinations);
  const promotionalError = fieldErrorOf(failure, 'promotionalPrice');

  function editBase(field: keyof PriceDraft) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'base', field, value: event.currentTarget.value });
    };
  }

  return (
    <FormSection title={text.pricing}>
      <Field
        label={hasCombinations ? text.basePrice : text.price}
        isRequired={!hasCombinations}
        error={priceError}
      >
        <InputAffix
          prefix={KWANZA_SYMBOL}
          inputMode="decimal"
          value={draft.base.price}
          placeholder={PRICE_PLACEHOLDER}
          isInvalid={priceError !== undefined}
          className={SECTION_INPUT}
          onChange={editBase('price')}
        />
      </Field>
      <Field label={text.promotionalPrice} error={promotionalError}>
        <InputAffix
          prefix={KWANZA_SYMBOL}
          inputMode="decimal"
          value={draft.base.promotionalPrice}
          placeholder={ZERO_PLACEHOLDER}
          isInvalid={promotionalError !== undefined}
          className={SECTION_INPUT}
          onChange={editBase('promotionalPrice')}
        />
      </Field>
      {hasCombinations ? (
        <FieldHint>{text.basePriceHint}</FieldHint>
      ) : (
        <>
          <Field label={text.sku}>
            <Input
              variant="form"
              value={draft.base.sku}
              maxLength={MAX_SKU_LENGTH}
              placeholder={text.skuPlaceholder}
              className={`${SECTION_INPUT} font-mono`}
              onChange={editBase('sku')}
            />
          </Field>
          <SimpleStock {...props} />
        </>
      )}
      <StockLink search={props.stockSearch} />
    </FormSection>
  );
}
