import { BodyCell, BodyRow, DataTable, HeadCell } from '@/shared/blocks/data-table';
import { IconLink } from '@/shared/blocks/icon-button';
import type { ProductSummary } from '@/shared/contracts/catalog/product';
import { strings } from '@/shared/i18n/strings';
import { Pencil } from '@/shared/ui/icons';

import {
  categoryLabelOf,
  editHrefOf,
  ProductIdentity,
  ProductPrice,
  ProductStatusBadge,
  ProductStock,
} from './product-cells';

const text = strings.products;
const columns = text.columns;

export function ProductTable({ products }: { readonly products: readonly ProductSummary[] }) {
  return (
    <DataTable
      head={
        <>
          <HeadCell>{columns.product}</HeadCell>
          <HeadCell>{columns.category}</HeadCell>
          <HeadCell align="right">{columns.price}</HeadCell>
          <HeadCell align="center">{columns.stock}</HeadCell>
          <HeadCell>{columns.status}</HeadCell>
          <HeadCell align="right">{columns.action}</HeadCell>
        </>
      }
    >
      {products.map((product) => (
        <BodyRow key={product.productUlid} href={editHrefOf(product)}>
          <BodyCell>
            <ProductIdentity product={product} />
          </BodyCell>
          <BodyCell>
            <span className="text-sm text-muted-foreground">{categoryLabelOf(product)}</span>
          </BodyCell>
          <BodyCell align="right">
            <ProductPrice product={product} />
          </BodyCell>
          <BodyCell align="center">
            <ProductStock product={product} />
          </BodyCell>
          <BodyCell>
            <ProductStatusBadge product={product} />
          </BodyCell>
          <BodyCell align="right">
            <IconLink
              href={editHrefOf(product)}
              label={`${text.edit} ${product.name}`}
              icon={Pencil}
            />
          </BodyCell>
        </BodyRow>
      ))}
    </DataTable>
  );
}
