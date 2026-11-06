import { MobileCard, MobileCardList } from '@/shared/blocks/mobile-cards';
import type { ProductSummary } from '@/shared/contracts/catalog/product';
import { strings } from '@/shared/i18n/strings';

import {
  editHrefOf,
  ProductIdentity,
  ProductPrice,
  ProductStatusBadge,
  ProductStock,
} from './product-cells';

const columns = strings.products.columns;

export function ProductCards({ products }: { readonly products: readonly ProductSummary[] }) {
  return (
    <MobileCardList>
      {products.map((product) => (
        <MobileCard
          key={product.productUlid}
          href={editHrefOf(product)}
          top={
            <>
              <ProductIdentity product={product} withCategory />
              <ProductStatusBadge product={product} />
            </>
          }
          fields={[
            { label: columns.price, value: <ProductPrice product={product} /> },
            { label: columns.stock, value: <ProductStock product={product} /> },
          ]}
        />
      ))}
    </MobileCardList>
  );
}
