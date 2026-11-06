import type { Metadata } from 'next';

import { fetchStockCounts, fetchStockPage } from '@/features/stock/api';
import {
  apiQueryOf,
  listingFrom,
  listingHref,
  PAGE_PARAM,
  PAGE_SIZE,
  SEARCH_PARAM,
  segmentTabsOf,
  STOCK_PATH,
} from '@/features/stock/listing';
import { StockItems } from '@/features/stock/stock-items';
import { PageHead } from '@/shared/blocks/page-head';
import { Pager } from '@/shared/blocks/pager';
import { NoResults, Panel, PanelToolbar } from '@/shared/blocks/panel';
import { SearchField } from '@/shared/blocks/search-field';
import { SegmentTabs } from '@/shared/blocks/segment-tabs';
import type { StockCounts } from '@/shared/contracts/catalog/stock';
import { formatCount } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { requireStoreUlid } from '@/shared/session/guards';

const text = strings.stock;

export const metadata: Metadata = { title: text.pageTitle };

interface StockPageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function Subtitle({ counts }: { readonly counts: StockCounts }) {
  return (
    <>
      <b>{formatCount(counts.all)}</b>{' '}
      {counts.all === 1 ? text.subtitleProductOne : text.subtitleProducts} ·{' '}
      <b>{formatCount(counts.low)}</b> {text.subtitleLow} · <b>{formatCount(counts.out)}</b>{' '}
      {counts.out === 1 ? text.subtitleOutOne : text.subtitleOut}
    </>
  );
}

export default async function StockPage({ searchParams }: StockPageProps) {
  const storeUlid = await requireStoreUlid();
  const listing = listingFrom(await searchParams);
  const [counts, page] = await Promise.all([
    fetchStockCounts(storeUlid),
    fetchStockPage(storeUlid, apiQueryOf(listing)),
  ]);

  return (
    <>
      <PageHead title={text.title} subtitle={<Subtitle counts={counts} />} />
      <Panel>
        <PanelToolbar>
          <SegmentTabs label={text.segments.label} tabs={segmentTabsOf(listing, counts)} />
          <SearchField
            basePath={STOCK_PATH}
            label={text.searchLabel}
            placeholder={text.searchPlaceholder}
            param={SEARCH_PARAM}
            resetParams={[PAGE_PARAM]}
          />
        </PanelToolbar>
        {page.items.length > 0 ? (
          <StockItems products={page.items} />
        ) : (
          <NoResults>{counts.all === 0 ? text.empty : text.noResults}</NoResults>
        )}
        <Pager
          page={page.page}
          pageSize={PAGE_SIZE}
          shown={page.items.length}
          total={page.total}
          hrefFor={(number) => listingHref({ ...listing, page: number })}
        />
      </Panel>
    </>
  );
}
