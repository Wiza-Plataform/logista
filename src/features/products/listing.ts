import type { Route } from 'next';

import type { ProductOverview } from '@/shared/contracts/catalog/product';
import { strings } from '@/shared/i18n/strings';

export const PRODUCTS_PATH = '/produtos';
export const PAGE_SIZE = 20;
export const SEARCH_PARAM = 'q';
export const PAGE_PARAM = 'pagina';
const SEGMENT_PARAM = 'filtro';
const FIRST_PAGE = 1;

interface SegmentDefinition {
  readonly segment: string;
  readonly label: string;
  readonly apiQuery: Readonly<Record<string, string>>;
  readonly countIn: (overview: ProductOverview) => number;
}

const ALL: SegmentDefinition = {
  segment: 'todos',
  label: strings.products.segments.all,
  apiQuery: {},
  countIn: (overview) => overview.total,
};

const SEGMENTS: readonly SegmentDefinition[] = [
  ALL,
  {
    segment: 'publicados',
    label: strings.products.segments.published,
    apiQuery: { status: 'PUBLISHED' },
    countIn: (overview) => overview.published,
  },
  {
    segment: 'rascunhos',
    label: strings.products.segments.drafts,
    apiQuery: { status: 'DRAFT' },
    countIn: (overview) => overview.draft,
  },
  {
    segment: 'stock-baixo',
    label: strings.products.segments.lowStock,
    apiQuery: { stock: 'LOW' },
    countIn: (overview) => overview.lowStock,
  },
  {
    segment: 'esgotados',
    label: strings.products.segments.outOfStock,
    apiQuery: { stock: 'OUT' },
    countIn: (overview) => overview.outOfStock,
  },
];

export interface ProductListing {
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

export function listingFrom(params: SearchParams): ProductListing {
  const requested = single(params[SEGMENT_PARAM]);
  return {
    segment: SEGMENTS.find((definition) => definition.segment === requested) ?? ALL,
    search: single(params[SEARCH_PARAM]).trim(),
    page: pageFrom(single(params[PAGE_PARAM])),
  };
}

export function apiQueryOf(listing: ProductListing): Readonly<Record<string, string>> {
  return {
    ...listing.segment.apiQuery,
    ...(listing.search === '' ? {} : { q: listing.search }),
    page: String(listing.page),
    pageSize: String(PAGE_SIZE),
  };
}

export function listingHref(listing: ProductListing): Route {
  const params = new URLSearchParams();
  if (listing.segment !== ALL) params.set(SEGMENT_PARAM, listing.segment.segment);
  if (listing.search !== '') params.set(SEARCH_PARAM, listing.search);
  if (listing.page > FIRST_PAGE) params.set(PAGE_PARAM, String(listing.page));

  const query = params.toString();
  return query === '' ? PRODUCTS_PATH : `${PRODUCTS_PATH}?${query}`;
}

export function segmentTabsOf(listing: ProductListing, overview: ProductOverview) {
  return SEGMENTS.map((definition) => ({
    key: definition.segment,
    label: definition.label,
    count: definition.countIn(overview),
    href: listingHref({ segment: definition, search: listing.search, page: FIRST_PAGE }),
    isActive: definition === listing.segment,
  }));
}
