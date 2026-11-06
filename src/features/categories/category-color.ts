export interface CategoryColor {
  readonly badge: string;
  readonly swatch: string;
}

const PALETTE: readonly CategoryColor[] = [
  {
    badge: 'bg-[color-mix(in_srgb,var(--av-purple)_16%,transparent)] text-(--av-purple)',
    swatch: 'bg-(--av-purple)',
  },
  {
    badge: 'bg-[color-mix(in_srgb,var(--av-orange)_16%,transparent)] text-(--av-orange)',
    swatch: 'bg-(--av-orange)',
  },
  {
    badge: 'bg-[color-mix(in_srgb,var(--av-red)_16%,transparent)] text-(--av-red)',
    swatch: 'bg-(--av-red)',
  },
  {
    badge: 'bg-[color-mix(in_srgb,var(--av-blue)_16%,transparent)] text-(--av-blue)',
    swatch: 'bg-(--av-blue)',
  },
  {
    badge: 'bg-[color-mix(in_srgb,var(--av-green)_16%,transparent)] text-(--av-green)',
    swatch: 'bg-(--av-green)',
  },
  {
    badge: 'bg-[color-mix(in_srgb,var(--av-teal)_16%,transparent)] text-(--av-teal)',
    swatch: 'bg-(--av-teal)',
  },
];

const FALLBACK: CategoryColor = {
  badge: 'bg-muted text-muted-foreground',
  swatch: 'bg-muted-foreground',
};

const HASH_SEED = 7;
const HASH_MULTIPLIER = 31;
const HASH_MODULUS = 9973;

function hashOf(value: string): number {
  let hash = HASH_SEED;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * HASH_MULTIPLIER + value.charCodeAt(index)) % HASH_MODULUS;
  }
  return hash;
}

export function categoryColorOf(categoryUlid: string): CategoryColor {
  return PALETTE.at(hashOf(categoryUlid) % PALETTE.length) ?? FALLBACK;
}
