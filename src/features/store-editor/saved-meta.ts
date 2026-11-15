import type { StoreTheme, ThemePublication } from '@/shared/contracts/store-theme';

export interface SavedMeta {
  readonly revision: number;
  readonly publication: ThemePublication | null;
}

const NEVER_PUBLISHED = -1;

export function metaOf(theme: StoreTheme): SavedMeta {
  return { revision: theme.revision, publication: theme.publication };
}

export function hasUnpublished(meta: SavedMeta): boolean {
  return meta.publication === null || meta.publication.revision !== meta.revision;
}

function publishedRevisionOf(meta: SavedMeta): number {
  return meta.publication?.revision ?? NEVER_PUBLISHED;
}

export function newerMeta(current: SavedMeta, next: SavedMeta): SavedMeta {
  if (next.revision !== current.revision) return next.revision > current.revision ? next : current;
  return publishedRevisionOf(next) >= publishedRevisionOf(current) ? next : current;
}
