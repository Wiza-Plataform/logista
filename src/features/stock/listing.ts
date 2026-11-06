import type { Route } from 'next';

import type { StockCounts } from '@/shared/contracts/catalog/stock';
import { strings } from '@/shared/i18n/strings';

export const STOCK_PATH = '/produtos/stock';
export const PAGE_SIZE = 20;
export const SEARCH_PARAM = 'q';
export const PAGE_PARAM = 'pagina';
const SEGMENT_PARAM = 'filtro';
const FIRST_PAGE = 1;
const segments = strings.stock.segments;

interface SegmentDefinition {
  readonly segment: string;
  readonly label: string;
  readonly apiQuery: Readonly<Record<string, string>>;
  readonly countIn: (counts: StockCounts) => number;
}

const ALL: SegmentDefinition = {
  segment: 'todas',
  label: segments.all,
  apiQuery: {},
  countIn: (counts) => counts.all,
};

const SEGMENTS: readonly SegmentDefinition[] = [
  ALL,
  {
    segment: 'stock-baixo',
    label: segments.lowStock,
    apiQuery: { status: 'LOW' },
    countIn: (counts) => counts.low,
  },
  {
    segment: 'esgotadas',
    label: segments.outOfStock,
    apiQuery: { status: 'OUT' },
    countIn: (counts) => counts.out,
  },
];

export interface StockListing {
  readonly segment: SegmentDefinition;
  readonly search: string;
  readonly page: number;
}

type SearchParams = Readonly<Record<string, string | string[] | undefined>>;

function single(value: string | string[] | undefined): string {
  return typeof value === 'string' ? value : '';
}

function pageFrom(raw: string): number {
  const page = Number.parseInt(raw, 10);
  return Number.isInteger(page) && page >= FIRST_PAGE ? page : FIRST_PAGE;
}

export function listingFrom(params: SearchParams): StockListing {
  const requested = single(params[SEGMENT_PARAM]);
  return {
    segment: SEGMENTS.find((definition) => definition.segment === requested) ?? ALL,
    search: single(params[SEARCH_PARAM]).trim(),
    page: pageFrom(single(params[PAGE_PARAM])),
  };
}

export function apiQueryOf(listing: StockListing): Readonly<Record<string, string>> {
  return {
    ...listing.segment.apiQuery,
    ...(listing.search === '' ? {} : { q: listing.search }),
    page: String(listing.page),
    pageSize: String(PAGE_SIZE),
  };
}

export function listingHref(listing: StockListing): Route {
  const params = new URLSearchParams();
  if (listing.segment !== ALL) params.set(SEGMENT_PARAM, listing.segment.segment);
  if (listing.search !== '') params.set(SEARCH_PARAM, listing.search);
  if (listing.page > FIRST_PAGE) params.set(PAGE_PARAM, String(listing.page));

  const query = params.toString();
  return query === '' ? STOCK_PATH : `${STOCK_PATH}?${query}`;
}

export function segmentTabsOf(listing: StockListing, counts: StockCounts) {
  return SEGMENTS.map((definition) => ({
    key: definition.segment,
    label: definition.label,
    count: definition.countIn(counts),
    href: listingHref({ segment: definition, search: listing.search, page: FIRST_PAGE }),
    isActive: definition === listing.segment,
  }));
}
