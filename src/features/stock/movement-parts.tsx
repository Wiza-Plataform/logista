import { StatusBadge } from '@/shared/blocks/status-badge';
import type { MovementType, StockItem, StockMovement } from '@/shared/contracts/catalog/stock';
import { fieldErrorOf, generalErrorOf } from '@/shared/forms/form-failure';
import type { FormFailure } from '@/shared/forms/form-failure';
import { formatDateTime, formatQuantity } from '@/shared/i18n/format';
import { parseQuantity } from '@/shared/i18n/parse';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { AlertMessage, Field, FieldHint, InputAffix, Textarea } from '@/shared/ui/field';

import {
  balanceAfter,
  deltaLabelOf,
  movementBadgeOf,
  MOVEMENT_TYPES,
  quantityLabelOf,
  quantityPromptOf,
  stockBadgeOf,
  variantLabelOf,
} from './stock-labels';
import type { MovementHistory } from './use-movement-history';
import type { MovementFormState } from './use-movement-form';

const text = strings.stock;
const DRAWER_INPUT = 'bg-background';
const FIELD_NAMES = ['quantity', 'note'] as const;
const MAX_NOTE_LENGTH = 600;

export function VariantSummary({ item }: { readonly item: StockItem }) {
  const badge = stockBadgeOf(item.status);

  return (
    <div className="bg-background border-border rounded-[12px] border p-3.5">
      <div className="text-body font-semibold">{item.productName}</div>
      <div className="text-caption text-muted-foreground mt-0.5">
        {variantLabelOf(item)} · <span className="font-mono">{item.sku ?? text.emptyValue}</span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <div className="text-label mb-1 font-semibold tracking-[0.07em] text-(--txt-faint) uppercase">
            {text.onHand}
          </div>
          <div className="text-display leading-none font-bold tabular-nums">
            {formatQuantity(item.quantity)}{' '}
            <span className="text-step text-muted-foreground font-semibold">{item.unitSymbol}</span>
          </div>
        </div>
        <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
      </div>
    </div>
  );
}

function TypeSelector({
  selected,
  onSelect,
}: {
  readonly selected: MovementType;
  readonly onSelect: (type: MovementType) => void;
}) {
  return (
    <fieldset className="mb-3.5">
      <legend className="text-foreground mb-1.75 text-sm font-medium">{text.movementType}</legend>
      <div className="bg-background border-border grid grid-cols-3 gap-1 rounded-[10px] border p-1">
        {MOVEMENT_TYPES.map((type) => (
          <label key={type} className="cursor-pointer">
            <input
              type="radio"
              name="movementType"
              value={type}
              checked={selected === type}
              onChange={() => {
                onSelect(type);
              }}
              className="peer sr-only"
            />
            <span className="text-note text-muted-foreground peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-ring/50 hover:text-foreground block rounded-[7px] py-2 text-center font-semibold transition-colors peer-focus-visible:ring-3">
              {movementBadgeOf(type).label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function BalancePreview({
  item,
  values,
}: {
  readonly item: StockItem;
  readonly values: MovementFormState;
}) {
  const quantity = parseQuantity(values.quantity);
  if (quantity === null) return null;

  const after = balanceAfter(values.type, item.quantity, quantity);
  return (
    <FieldHint>
      {text.balancePreview}{' '}
      <b className={cn('font-semibold text-foreground', after < 0 && 'text-(--st-cancel-fg)')}>
        {quantityLabelOf(after, item.unitSymbol)}
      </b>
    </FieldHint>
  );
}

interface MovementFieldsProps {
  readonly item: StockItem;
  readonly values: MovementFormState;
  readonly failure: FormFailure | null;
  readonly onChange: (patch: Partial<MovementFormState>) => void;
}

export function MovementFields({ item, values, failure, onChange }: MovementFieldsProps) {
  const generalError = generalErrorOf(failure, FIELD_NAMES);
  const quantityError = fieldErrorOf(failure, 'quantity');

  return (
    <>
      {generalError === null ? null : <AlertMessage text={generalError} />}
      <TypeSelector
        selected={values.type}
        onSelect={(type) => {
          onChange({ type });
        }}
      />
      <Field label={quantityPromptOf(values.type)} isRequired error={quantityError}>
        <InputAffix
          inputMode="decimal"
          value={values.quantity}
          suffix={item.unitSymbol}
          placeholder="0"
          isInvalid={quantityError !== undefined}
          className={DRAWER_INPUT}
          onChange={(event) => {
            onChange({ quantity: event.currentTarget.value });
          }}
        />
        <BalancePreview item={item} values={values} />
      </Field>
      <Field label={text.note} error={fieldErrorOf(failure, 'note')}>
        <Textarea
          value={values.note}
          maxLength={MAX_NOTE_LENGTH}
          placeholder={text.notePlaceholder}
          className={DRAWER_INPUT}
          onChange={(event) => {
            onChange({ note: event.currentTarget.value });
          }}
        />
      </Field>
    </>
  );
}

function HistoryMessage({ children }: { readonly children: string }) {
  return <p className="text-fine text-muted-foreground py-2">{children}</p>;
}

function MovementRow({
  movement,
  unitSymbol,
}: {
  readonly movement: StockMovement;
  readonly unitSymbol: string;
}) {
  const badge = movementBadgeOf(movement.type);

  return (
    <li className="flex items-start justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
          <span className="text-caption text-muted-foreground tabular-nums">
            {formatDateTime(movement.occurredAt)}
          </span>
        </div>
        {movement.note === null ? null : (
          <p className="text-fine text-muted-foreground mt-1 break-words">{movement.note}</p>
        )}
      </div>
      <div className="shrink-0 text-right">
        <div
          className={cn(
            'text-note font-semibold tabular-nums',
            movement.quantityDelta > 0 && 'text-(--st-paid-fg)',
            movement.quantityDelta < 0 && 'text-(--st-cancel-fg)',
          )}
        >
          {deltaLabelOf(movement)}
        </div>
        <div className="text-caption text-(--txt-faint) tabular-nums">
          {text.balanceAfter} {quantityLabelOf(movement.balanceAfter, unitSymbol)}
        </div>
      </div>
    </li>
  );
}

function HistoryBody({
  history,
  unitSymbol,
}: {
  readonly history: MovementHistory;
  readonly unitSymbol: string;
}) {
  switch (history.status) {
    case 'loading':
      return <HistoryMessage>{text.historyLoading}</HistoryMessage>;
    case 'failed':
      return <HistoryMessage>{history.message}</HistoryMessage>;
    case 'loaded':
      if (history.movements.length === 0) {
        return <HistoryMessage>{text.historyEmpty}</HistoryMessage>;
      }
      return (
        <ul className="divide-border flex flex-col divide-y">
          {history.movements.map((movement) => (
            <MovementRow key={movement.movementUlid} movement={movement} unitSymbol={unitSymbol} />
          ))}
        </ul>
      );
  }
}

export function MovementHistoryList({
  history,
  unitSymbol,
}: {
  readonly history: MovementHistory;
  readonly unitSymbol: string;
}) {
  return (
    <section aria-labelledby="movement-history">
      <h3
        id="movement-history"
        className="text-label mb-1 font-semibold tracking-[0.07em] text-(--txt-faint) uppercase"
      >
        {text.history}
      </h3>
      <HistoryBody history={history} unitSymbol={unitSymbol} />
    </section>
  );
}
