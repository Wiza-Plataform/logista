const MAX_LENGTH = 80;
const COMBINING_MARKS = /\p{M}/gu;
const OUTSIDE_SLUG_ALPHABET = /[^a-z0-9]+/g;
const EDGE_HYPHENS = /^-+|-+$/g;

export function slugOf(name: string): string {
  return name
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .replace(OUTSIDE_SLUG_ALPHABET, '-')
    .slice(0, MAX_LENGTH)
    .replace(EDGE_HYPHENS, '');
}
