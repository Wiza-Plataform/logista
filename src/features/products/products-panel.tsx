import { Pager } from '@/shared/blocks/pager';
import { NoResults, Panel, PanelToolbar } from '@/shared/blocks/panel';
import { SearchField } from '@/shared/blocks/search-field';
import { SegmentTabs } from '@/shared/blocks/segment-tabs';
import type { ProductOverview, ProductPage } from '@/shared/contracts/catalog/product';
import { strings } from '@/shared/i18n/strings';

import {
  listingHref,
  PAGE_PARAM,
  PAGE_SIZE,
  PRODUCTS_PATH,
  SEARCH_PARAM,
  segmentTabsOf,
} from './listing';
import type { ProductListing } from './listing';
import { ProductCards } from './product-cards';
import { ProductTable } from './product-table';

const text = strings.products;

interface ProductsPanelProps {
  readonly listing: ProductListing;
  readonly overview: ProductOverview;
  readonly page: ProductPage;
}

function emptyMessage(overview: ProductOverview): string {
  return overview.total === 0 ? text.empty : text.noResults;
}

export function ProductsPanel({ listing, overview, page }: ProductsPanelProps) {
  const hasItems = page.items.length > 0;

  return (
    <Panel>
      <PanelToolbar>
        <SegmentTabs label={text.segments.label} tabs={segmentTabsOf(listing, overview)} />
        <SearchField
          basePath={PRODUCTS_PATH}
          label={text.searchLabel}
          placeholder={text.searchPlaceholder}
          param={SEARCH_PARAM}
          resetParams={[PAGE_PARAM]}
        />
      </PanelToolbar>
      {hasItems ? (
        <>
          <ProductTable products={page.items} />
          <ProductCards products={page.items} />
        </>
      ) : (
        <NoResults>{emptyMessage(overview)}</NoResults>
      )}
      <Pager
        page={page.page}
        pageSize={PAGE_SIZE}
        shown={page.items.length}
        total={page.total}
        hrefFor={(number) => listingHref({ ...listing, page: number })}
      />
    </Panel>
  );
}
