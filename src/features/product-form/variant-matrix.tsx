import type { Dispatch } from 'react';

import { formatQuantity } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import { EMPTY_PRICE } from './draft';
import type { Combination, PriceDraft, ProductDraft } from './draft';
import type { DraftAction } from './draft-reducer';

const text = strings.productForm;
const columns = text.matrix;
const HEAD =
  'text-label px-1.5 pb-[7px] text-left font-semibold tracking-[0.05em] text-(--txt-faint) uppercase';
const CELL = 'border-border border-t px-1.5 py-1';
const CELL_INPUT =
  'bg-background border-border text-foreground h-8 w-full rounded-[7px] border px-2 text-sm outline-none placeholder:text-(--txt-faint) focus:border-(--lima-oliva)';

interface VariantMatrixProps {
  readonly combinations: readonly Combination[];
  readonly draft: ProductDraft;
  readonly dispatch: Dispatch<DraftAction>;
  readonly unitSymbol: string;
}

interface CellInputProps {
  readonly label: string;
  readonly value: string;
  readonly placeholder: string;
  readonly className?: string;
  readonly onChange: (value: string) => void;
}

function CellInput({ label, value, placeholder, className, onChange }: CellInputProps) {
  return (
    <input
      aria-label={label}
      value={value}
      placeholder={placeholder}
      className={cn(CELL_INPUT, className)}
      onChange={(event) => {
        onChange(event.currentTarget.value);
      }}
    />
  );
}

function VariantRow({
  combination,
  draft,
  dispatch,
  unitSymbol,
}: Omit<VariantMatrixProps, 'combinations'> & { readonly combination: Combination }) {
  const label = combination.values.map((value) => value.name).join(text.combinationSeparator);
  const row = draft.rows.get(combination.key) ?? EMPTY_PRICE;
  const onHand = draft.stockOnHand.get(combination.key);

  function edit(field: keyof PriceDraft) {
    return (value: string) => {
      dispatch({ type: 'row', key: combination.key, field, value });
    };
  }

  return (
    <tr>
      <td className={cn(CELL, 'text-fine font-medium whitespace-nowrap')}>{label}</td>
      <td className={cn(CELL, 'w-[110px]')}>
        <CellInput
          label={`${columns.price} ${label}`}
          value={row.price}
          placeholder={draft.base.price}
          className="text-right"
          onChange={edit('price')}
        />
      </td>
      <td className={cn(CELL, 'w-[100px]')}>
        <CellInput
          label={`${columns.promotionalPrice} ${label}`}
          value={row.promotionalPrice}
          placeholder={draft.base.promotionalPrice}
          className="text-right"
          onChange={edit('promotionalPrice')}
        />
      </td>
      <td className={cn(CELL, 'w-[130px]')}>
        <CellInput
          label={`${columns.sku} ${label}`}
          value={row.sku}
          placeholder={text.autoSku}
          className="font-mono"
          onChange={edit('sku')}
        />
      </td>
      <td className={cn(CELL, 'w-[84px] text-center')}>
        {onHand === undefined ? (
          <CellInput
            label={`${columns.stock} ${label}`}
            value={row.initialStock}
            placeholder="0"
            className="text-center"
            onChange={edit('initialStock')}
          />
        ) : (
          <span className="text-fine font-semibold tabular-nums">
            {formatQuantity(onHand)} {unitSymbol}
          </span>
        )}
      </td>
    </tr>
  );
}

export function VariantMatrix({ combinations, draft, dispatch, unitSymbol }: VariantMatrixProps) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full min-w-[540px] border-collapse">
        <thead>
          <tr>
            <th className={HEAD}>{columns.variant}</th>
            <th className={cn(HEAD, 'text-right')}>{columns.price}</th>
            <th className={cn(HEAD, 'text-right')}>{columns.promotionalPrice}</th>
            <th className={HEAD}>{columns.sku}</th>
            <th className={cn(HEAD, 'text-center')}>{columns.stock}</th>
          </tr>
        </thead>
        <tbody>
          {combinations.map((combination) => (
            <VariantRow
              key={combination.key}
              combination={combination}
              draft={draft}
              dispatch={dispatch}
              unitSymbol={unitSymbol}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
