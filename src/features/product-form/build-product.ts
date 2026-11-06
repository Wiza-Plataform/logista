import type { SaveProductRequest } from '@/shared/contracts/catalog/product';
import type { FormFailure } from '@/shared/forms/form-failure';
import { parseKwanzaToCents, parseQuantity } from '@/shared/i18n/parse';
import { strings } from '@/shared/i18n/strings';

import { combinationsOf, EMPTY_PRICE, isCompleteOption, retiredStockOf, SIMPLE_KEY } from './draft';
import type { PriceDraft, ProductDraft } from './draft';
import type { InitialStockEntry } from './product-action-result';

const text = strings.productForm;

type Variant = SaveProductRequest['variants'][number];

interface Line {
  readonly key: string;
  readonly names: readonly string[];
  readonly prices: PriceDraft;
}

interface Fields {
  readonly price: string;
  readonly promotionalPrice: string;
  readonly stock: string;
}

interface PricedLine {
  readonly variant: Variant;
  readonly stock: InitialStockEntry | null;
}

export interface BuiltProduct {
  readonly request: SaveProductRequest;
  readonly initialStock: readonly InitialStockEntry[];
}

export type BuildResult =
  | { readonly isValid: true; readonly product: BuiltProduct }
  | { readonly isValid: false; readonly problem: FormFailure };

const SIMPLE_FIELDS: Fields = {
  price: 'price',
  promotionalPrice: 'promotionalPrice',
  stock: 'stock',
};
const MATRIX_FIELDS: Fields = {
  price: 'variants',
  promotionalPrice: 'variants',
  stock: 'variants',
};

class DraftProblem extends Error {
  constructor(readonly problem: FormFailure) {
    super(problem.message);
  }
}

function reject(message: string, field: string): never {
  throw new DraftProblem({ message, field });
}

function linesOf(draft: ProductDraft): readonly Line[] {
  const combinations = combinationsOf(draft.options);
  if (combinations.length === 0) return [{ key: SIMPLE_KEY, names: [], prices: draft.base }];

  return combinations.map((combination) => ({
    key: combination.key,
    names: combination.values.map((value) => value.name),
    prices: draft.rows.get(combination.key) ?? EMPTY_PRICE,
  }));
}

function ownOrBase(own: string, base: string): string {
  return own.trim() === '' ? base.trim() : own.trim();
}

function initialStockOf(draft: ProductDraft, line: Line, fields: Fields): InitialStockEntry | null {
  const raw = line.prices.initialStock.trim();
  if (raw === '' || draft.stockOnHand.has(line.key)) return null;

  const quantity = parseQuantity(raw);
  if (quantity === null) reject(text.invalidStock, fields.stock);
  return quantity > 0 ? { optionValues: line.names, quantity } : null;
}

function pricedLineOf(draft: ProductDraft, line: Line, fields: Fields): PricedLine {
  const priceInCents = parseKwanzaToCents(ownOrBase(line.prices.price, draft.base.price));
  if (priceInCents === null) reject(text.invalidPrice, fields.price);

  const rawPromotional = ownOrBase(line.prices.promotionalPrice, draft.base.promotionalPrice);
  const promotionalPriceInCents = rawPromotional === '' ? null : parseKwanzaToCents(rawPromotional);
  if (promotionalPriceInCents === null && rawPromotional !== '') {
    reject(text.invalidPromotionalPrice, fields.promotionalPrice);
  }

  return {
    variant: {
      optionValues: line.names,
      sku: line.prices.sku.trim() === '' ? null : line.prices.sku.trim(),
      priceInCents,
      promotionalPriceInCents,
    },
    stock: initialStockOf(draft, line, fields),
  };
}

function optionsOf(draft: ProductDraft): SaveProductRequest['options'] {
  return draft.options.map((option) => ({
    ...(option.optionUlid === null ? {} : { optionUlid: option.optionUlid }),
    name: option.name.trim(),
    values: option.values.map((value) => ({
      ...(value.valueUlid === null ? {} : { valueUlid: value.valueUlid }),
      name: value.name,
    })),
  }));
}

function requestOf(
  draft: ProductDraft,
  variants: readonly Variant[],
  resetsRetiredStock: boolean,
): SaveProductRequest {
  const slug = draft.slug.trim();
  return {
    name: draft.name.trim(),
    description: draft.description.trim() === '' ? null : draft.description.trim(),
    ...(slug === '' ? {} : { slug }),
    unitUlid: draft.unitUlid,
    categoryUlids: draft.categoryUlid === '' ? [] : [draft.categoryUlid],
    options: optionsOf(draft),
    variants,
    ...(resetsRetiredStock ? { resetRetiredStock: true } : {}),
  };
}

function build(draft: ProductDraft): BuiltProduct {
  if (!draft.options.every(isCompleteOption)) reject(text.incompleteOption, 'options');

  const lines = linesOf(draft);
  const fields =
    lines.length === 1 && lines.at(0)?.key === SIMPLE_KEY ? SIMPLE_FIELDS : MATRIX_FIELDS;
  const priced = lines.map((line) => pricedLineOf(draft, line, fields));

  return {
    request: requestOf(
      draft,
      priced.map((line) => line.variant),
      retiredStockOf(draft, combinationsOf(draft.options)) > 0,
    ),
    initialStock: priced.flatMap((line) => (line.stock === null ? [] : [line.stock])),
  };
}

export function buildProduct(draft: ProductDraft): BuildResult {
  try {
    return { isValid: true, product: build(draft) };
  } catch (error) {
    if (error instanceof DraftProblem) return { isValid: false, problem: error.problem };
    throw error;
  }
}
