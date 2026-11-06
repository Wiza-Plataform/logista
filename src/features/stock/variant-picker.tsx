'use client';

import { ModalDialog } from '@/shared/blocks/modal-dialog';
import { StatusBadge } from '@/shared/blocks/status-badge';
import type { StockProduct, StockProductVariant } from '@/shared/contracts/catalog/stock';
import { formatQuantity } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import { optionLabelOf, stockBadgeOf } from './stock-labels';

const text = strings.stock;

interface VariantPickerProps {
  readonly product: StockProduct;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onPick: (variant: StockProductVariant) => void;
}

function VariantOption({
  variant,
  unitSymbol,
  onPick,
}: {
  readonly variant: StockProductVariant;
  readonly unitSymbol: string;
  readonly onPick: VariantPickerProps['onPick'];
}) {
  const badge = stockBadgeOf(variant.status);

  return (
    <button
      type="button"
      onClick={() => {
        onPick(variant);
      }}
      className="bg-background border-border hover:border-ring flex w-full items-center justify-between gap-3 rounded-[10px] border px-3.5 py-3 text-left transition-colors duration-[140ms]"
    >
      <span className="min-w-0">
        <span className="text-body block font-semibold">{optionLabelOf(variant.optionValues)}</span>
        <span className="text-caption text-muted-foreground mt-0.5 block font-mono">
          {variant.sku ?? text.emptyValue}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-2.5">
        <span
          className={cn(
            'text-sm font-semibold tabular-nums',
            variant.status === 'LOW' && 'text-(--st-wait-fg)',
            variant.status === 'OUT' && 'text-(--st-cancel-fg)',
          )}
        >
          {formatQuantity(variant.quantity)}
          <span className="text-muted-foreground ml-1 text-xs font-semibold">{unitSymbol}</span>
        </span>
        <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
      </span>
    </button>
  );
}

export function VariantPicker({ product, isOpen, onClose, onPick }: VariantPickerProps) {
  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      title={text.pickerTitle}
      description={product.productName}
    >
      {product.variants.map((variant) => (
        <VariantOption
          key={variant.variantUlid}
          variant={variant}
          unitSymbol={product.unitSymbol}
          onPick={onPick}
        />
      ))}
    </ModalDialog>
  );
}
