import type { Route } from 'next';
import Link from 'next/link';

import { StatusBadge } from '@/shared/blocks/status-badge';
import type { ProductSummary } from '@/shared/contracts/catalog/product';
import { formatKwanzaAmount, formatQuantity, KWANZA_SYMBOL } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import { ProductThumb } from './product-thumb';

const text = strings.products;
const DETAIL_SEPARATOR = ' · ';

function priceLabelOf(product: ProductSummary): string | null {
  const { minPriceInCents: min, maxPriceInCents: max } = product;
  if (min === null || max === null) return null;
  if (min === max) return formatKwanzaAmount(min);
  return `${formatKwanzaAmount(min)}–${formatKwanzaAmount(max)}`;
}

function variantCountOf(product: ProductSummary): string {
  const noun = product.variantCount === 1 ? text.variantSingular : text.variantPlural;
  return `${String(product.variantCount)} ${noun}`;
}

export function editHrefOf(product: ProductSummary): Route {
  return `/produtos/${product.productUlid}`;
}

export function categoryLabelOf(product: ProductSummary): string {
  return product.categories.at(0)?.name ?? text.emptyValue;
}

interface ProductIdentityProps {
  readonly product: ProductSummary;
  readonly withCategory?: boolean;
}

export function ProductIdentity({ product, withCategory = false }: ProductIdentityProps) {
  const code = product.hasVariants ? variantCountOf(product) : (product.sku ?? text.emptyValue);
  const category = product.categories.at(0)?.name;
  const detail =
    withCategory && category !== undefined ? `${code}${DETAIL_SEPARATOR}${category}` : code;

  return (
    <div className="flex min-w-0 flex-1 items-center gap-[11px]">
      <ProductThumb productUlid={product.productUlid} imageUrl={product.coverThumbnailUrl} />
      <div className="min-w-0">
        <Link
          href={editHrefOf(product)}
          className="text-body text-foreground block leading-[1.2] font-semibold hover:text-(--accent-text)"
        >
          {product.name}
        </Link>
        <div
          className={cn(
            'text-caption text-muted-foreground mt-0.5 tabular-nums',
            !product.hasVariants && 'font-mono',
          )}
        >
          {detail}
        </div>
      </div>
    </div>
  );
}

export function ProductPrice({ product }: { readonly product: ProductSummary }) {
  const label = priceLabelOf(product);
  if (label === null) return <span className="text-muted-foreground">{text.emptyValue}</span>;
  return (
    <span className="text-step font-bold tracking-[-0.2px] tabular-nums">
      {label}
      <span className="text-muted-foreground ml-0.5 text-xs font-semibold">{KWANZA_SYMBOL}</span>
    </span>
  );
}

export function ProductStock({ product }: { readonly product: ProductSummary }) {
  if (product.stockStatus === 'OUT') {
    return <StatusBadge tone="cancel">{text.status.soldOut}</StatusBadge>;
  }
  return (
    <span
      className={cn(
        'font-semibold tabular-nums',
        product.stockStatus === 'LOW' && 'text-(--st-wait-fg)',
      )}
    >
      {formatQuantity(product.totalQuantity)}
    </span>
  );
}

export function ProductStatusBadge({ product }: { readonly product: ProductSummary }) {
  if (product.status === 'ARCHIVED') {
    return <StatusBadge tone="done">{text.status.archived}</StatusBadge>;
  }
  if (product.status === 'DRAFT') return <StatusBadge tone="done">{text.status.draft}</StatusBadge>;
  if (product.stockStatus === 'OUT') {
    return <StatusBadge tone="cancel">{text.status.soldOut}</StatusBadge>;
  }
  return <StatusBadge tone="paid">{text.status.published}</StatusBadge>;
}
