import type { StatusTone } from '@/shared/blocks/status-badge';
import type { StockStatus } from '@/shared/contracts/catalog/product';
import type {
  MovementType,
  StockItem,
  StockMovement,
  StockProduct,
  StockProductVariant,
} from '@/shared/contracts/catalog/stock';
import { formatQuantity } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';

const text = strings.stock;

export interface Badge {
  readonly tone: StatusTone;
  readonly label: string;
}

export const MOVEMENT_TYPES: readonly MovementType[] = ['RECEIPT', 'ISSUE', 'ADJUSTMENT'];

export function optionLabelOf(optionValues: readonly string[]): string {
  return optionValues.length === 0 ? text.noVariant : optionValues.join(text.variantSeparator);
}

export function variantLabelOf(item: StockItem): string {
  return optionLabelOf(item.optionValues);
}

export function variantCountOf(product: StockProduct): string {
  const count = product.variants.length;
  return `${String(count)} ${count === 1 ? text.variantSingular : text.variantPlural}`;
}

export function stockItemOf(product: StockProduct, variant: StockProductVariant): StockItem {
  return {
    productUlid: product.productUlid,
    productName: product.productName,
    variantUlid: variant.variantUlid,
    sku: variant.sku,
    optionValues: variant.optionValues,
    unitSymbol: product.unitSymbol,
    allowsFractions: product.allowsFractions,
    quantity: variant.quantity,
    status: variant.status,
  };
}

export function quantityLabelOf(quantity: number, unitSymbol: string): string {
  return `${formatQuantity(quantity)} ${unitSymbol}`;
}

export function stockBadgeOf(status: StockStatus): Badge {
  switch (status) {
    case 'IN_STOCK':
      return { tone: 'paid', label: text.status.inStock };
    case 'LOW':
      return { tone: 'wait', label: text.status.low };
    case 'OUT':
      return { tone: 'cancel', label: text.status.out };
  }
}

export function movementBadgeOf(type: MovementType): Badge {
  switch (type) {
    case 'RECEIPT':
      return { tone: 'paid', label: text.types.receipt };
    case 'ISSUE':
      return { tone: 'cancel', label: text.types.issue };
    case 'ADJUSTMENT':
      return { tone: 'ship', label: text.types.adjustment };
  }
}

export function quantityPromptOf(type: MovementType): string {
  switch (type) {
    case 'RECEIPT':
      return text.quantityFor.receipt;
    case 'ISSUE':
      return text.quantityFor.issue;
    case 'ADJUSTMENT':
      return text.quantityFor.adjustment;
  }
}

export function confirmationOf(type: MovementType): string {
  switch (type) {
    case 'RECEIPT':
      return text.registered.receipt;
    case 'ISSUE':
      return text.registered.issue;
    case 'ADJUSTMENT':
      return text.registered.adjustment;
  }
}

export function balanceAfter(type: MovementType, onHand: number, quantity: number): number {
  switch (type) {
    case 'RECEIPT':
      return onHand + quantity;
    case 'ISSUE':
      return onHand - quantity;
    case 'ADJUSTMENT':
      return quantity;
  }
}

function signOf(delta: number): string {
  if (delta > 0) return '+';
  if (delta < 0) return '−';
  return '';
}

export function deltaLabelOf(movement: StockMovement): string {
  return `${signOf(movement.quantityDelta)}${formatQuantity(Math.abs(movement.quantityDelta))}`;
}
