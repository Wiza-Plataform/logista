import type { ProductDetails, ProductVariant } from '@/shared/contracts/catalog/product';
import type { Unit } from '@/shared/contracts/catalog/unit';
import { formatKwanzaAmount } from '@/shared/i18n/format';

export const MAX_OPTIONS = 3;
export const MAX_VALUES_PER_OPTION = 20;
export const SIMPLE_KEY = '';
const KEY_SEPARATOR = '|';

export interface ValueDraft {
  readonly key: string;
  readonly valueUlid: string | null;
  readonly name: string;
}

export interface OptionDraft {
  readonly key: string;
  readonly optionUlid: string | null;
  readonly name: string;
  readonly values: readonly ValueDraft[];
}

export interface PriceDraft {
  readonly price: string;
  readonly promotionalPrice: string;
  readonly sku: string;
  readonly initialStock: string;
}

export interface ProductDraft {
  readonly name: string;
  readonly description: string;
  readonly slug: string;
  readonly isSlugEdited: boolean;
  readonly unitUlid: string;
  readonly categoryUlid: string;
  readonly base: PriceDraft;
  readonly options: readonly OptionDraft[];
  readonly rows: ReadonlyMap<string, PriceDraft>;
  readonly stockOnHand: ReadonlyMap<string, number>;
}

export interface Combination {
  readonly key: string;
  readonly values: readonly ValueDraft[];
}

export const EMPTY_PRICE: PriceDraft = {
  price: '',
  promotionalPrice: '',
  sku: '',
  initialStock: '',
};

export function isCompleteOption(option: OptionDraft): boolean {
  return option.name.trim() !== '' && option.values.length > 0;
}

export function combinationsOf(options: readonly OptionDraft[]): readonly Combination[] {
  const complete = options.filter(isCompleteOption);
  if (complete.length === 0) return [];

  return complete
    .reduce<readonly (readonly ValueDraft[])[]>(
      (combinations, option) =>
        combinations.flatMap((combination) =>
          option.values.map((value) => [...combination, value]),
        ),
      [[]],
    )
    .map((values) => ({ key: values.map((value) => value.key).join(KEY_SEPARATOR), values }));
}

export function retiredStockOf(draft: ProductDraft, combinations: readonly Combination[]): number {
  const activeKeys = new Set(
    combinations.length === 0 ? [SIMPLE_KEY] : combinations.map((combination) => combination.key),
  );
  return [...draft.stockOnHand].reduce(
    (total, [key, quantity]) => (activeKeys.has(key) || quantity <= 0 ? total : total + quantity),
    0,
  );
}

function priceDraftOf(variant: ProductVariant): PriceDraft {
  const promotional = variant.promotionalPriceInCents;
  return {
    price: formatKwanzaAmount(variant.priceInCents),
    promotionalPrice: promotional === null ? '' : formatKwanzaAmount(promotional),
    sku: variant.sku ?? '',
    initialStock: '',
  };
}

function optionDraftsOf(product: ProductDetails): readonly OptionDraft[] {
  return product.options.map((option) => ({
    key: option.optionUlid,
    optionUlid: option.optionUlid,
    name: option.name,
    values: option.values.map((value) => ({
      key: value.valueUlid,
      valueUlid: value.valueUlid,
      name: value.name,
    })),
  }));
}

function combinationKeyOfVariant(product: ProductDetails, variant: ProductVariant): string {
  return product.options
    .map(
      (option) =>
        variant.optionValues.find((value) => value.optionUlid === option.optionUlid)?.valueUlid ??
        '',
    )
    .join(KEY_SEPARATOR);
}

function lowestPriceDraftOf(variants: readonly ProductVariant[]): PriceDraft {
  const prices = variants.map((variant) => variant.priceInCents);
  if (prices.length === 0) return EMPTY_PRICE;
  return { ...EMPTY_PRICE, price: formatKwanzaAmount(Math.min(...prices)) };
}

export function defaultUnitOf(units: readonly Unit[]): string {
  return (units.find((unit) => !unit.allowsFractions) ?? units.at(0))?.unitUlid ?? '';
}

function newDraft(defaultUnitUlid: string): ProductDraft {
  return {
    name: '',
    description: '',
    slug: '',
    isSlugEdited: false,
    unitUlid: defaultUnitUlid,
    categoryUlid: '',
    base: EMPTY_PRICE,
    options: [],
    rows: new Map(),
    stockOnHand: new Map(),
  };
}

export function initialDraft(
  product: ProductDetails | null,
  defaultUnitUlid: string,
): ProductDraft {
  if (product === null) return newDraft(defaultUnitUlid);

  const keyed = product.variants.map(
    (variant) => [combinationKeyOfVariant(product, variant), variant] as const,
  );
  const simpleVariant = product.options.length === 0 ? product.variants.at(0) : undefined;

  return {
    name: product.name,
    description: product.description ?? '',
    slug: product.slug,
    isSlugEdited: true,
    unitUlid: product.unit.unitUlid,
    categoryUlid: product.categories.at(0)?.categoryUlid ?? '',
    base:
      simpleVariant === undefined
        ? lowestPriceDraftOf(product.variants)
        : priceDraftOf(simpleVariant),
    options: optionDraftsOf(product),
    rows: new Map(keyed.map(([key, variant]) => [key, priceDraftOf(variant)])),
    stockOnHand: new Map(keyed.map(([key, variant]) => [key, variant.quantity])),
  };
}
