import Link from 'next/link';

import { BodyCell, BodyRow, DataTable, HeadCell } from '@/shared/blocks/data-table';
import { MobileCard, MobileCardList } from '@/shared/blocks/mobile-cards';
import { StatusBadge } from '@/shared/blocks/status-badge';
import type { StockProduct } from '@/shared/contracts/catalog/stock';
import { formatQuantity } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import { stockBadgeOf, variantCountOf } from './stock-labels';

const text = strings.stock;
const columns = text.columns;

interface StockRowsProps {
  readonly products: readonly StockProduct[];
  readonly onMove: (product: StockProduct) => void;
}

function ProductIdentity({ product }: { readonly product: StockProduct }) {
  return (
    <div className="min-w-0">
      <Link
        href={`/produtos/${product.productUlid}`}
        className="text-body text-foreground block leading-[1.2] font-semibold hover:text-(--accent-text)"
      >
        {product.productName}
      </Link>
      <div className="text-caption text-muted-foreground mt-0.5">
        {product.hasVariants ? variantCountOf(product) : text.noVariant}
      </div>
    </div>
  );
}

function ProductSku({ product }: { readonly product: StockProduct }) {
  const sku = product.hasVariants ? null : (product.variants.at(0)?.sku ?? null);
  return <span className="text-muted-foreground font-mono text-sm">{sku ?? text.emptyValue}</span>;
}

function ProductQuantity({ product }: { readonly product: StockProduct }) {
  return (
    <span
      className={cn(
        'font-semibold tabular-nums',
        product.status === 'LOW' && 'text-(--st-wait-fg)',
        product.status === 'OUT' && 'text-(--st-cancel-fg)',
      )}
    >
      {formatQuantity(product.quantity)}
      <span className="text-muted-foreground ml-1 text-xs font-semibold">{product.unitSymbol}</span>
    </span>
  );
}

function ProductStatus({ product }: { readonly product: StockProduct }) {
  const badge = stockBadgeOf(product.status);
  return <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>;
}

function MoveButton({
  product,
  onMove,
}: {
  readonly product: StockProduct;
  readonly onMove: StockRowsProps['onMove'];
}) {
  return (
    <Button
      variant="brand-outline"
      size="sm"
      aria-label={`${text.move} ${product.productName}`}
      onClick={() => {
        onMove(product);
      }}
    >
      {text.move}
    </Button>
  );
}

export function StockTable({ products, onMove }: StockRowsProps) {
  return (
    <DataTable
      head={
        <>
          <HeadCell>{columns.product}</HeadCell>
          <HeadCell>{columns.sku}</HeadCell>
          <HeadCell align="right">{columns.stock}</HeadCell>
          <HeadCell>{columns.status}</HeadCell>
          <HeadCell align="right">{columns.action}</HeadCell>
        </>
      }
    >
      {products.map((product) => (
        <BodyRow key={product.productUlid}>
          <BodyCell>
            <ProductIdentity product={product} />
          </BodyCell>
          <BodyCell>
            <ProductSku product={product} />
          </BodyCell>
          <BodyCell align="right">
            <ProductQuantity product={product} />
          </BodyCell>
          <BodyCell>
            <ProductStatus product={product} />
          </BodyCell>
          <BodyCell align="right">
            <MoveButton product={product} onMove={onMove} />
          </BodyCell>
        </BodyRow>
      ))}
    </DataTable>
  );
}

export function StockCards({ products, onMove }: StockRowsProps) {
  return (
    <MobileCardList>
      {products.map((product) => (
        <MobileCard
          key={product.productUlid}
          top={
            <>
              <div className="min-w-0 flex-1">
                <ProductIdentity product={product} />
              </div>
              <MoveButton product={product} onMove={onMove} />
            </>
          }
          fields={[
            { label: columns.sku, value: <ProductSku product={product} /> },
            { label: columns.stock, value: <ProductQuantity product={product} /> },
            { label: columns.status, value: <ProductStatus product={product} /> },
          ]}
        />
      ))}
    </MobileCardList>
  );
}
