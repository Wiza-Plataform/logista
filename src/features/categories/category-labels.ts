import type { CategoryNode } from '@/shared/contracts/catalog/category';
import { formatCount } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';

import { productCountOf } from './category-tree';

const text = strings.categories;

export function productCountLabel(node: CategoryNode): string {
  const count = productCountOf(node);
  return `${formatCount(count)} ${count === 1 ? text.productSingular : text.productPlural}`;
}

function subcategoriesLabel(node: CategoryNode): string {
  const count = node.subcategories.length;
  if (count === 0) return text.noSubcategories;
  return `${formatCount(count)} ${count === 1 ? text.subcategorySingular : text.subcategoryPlural}`;
}

export function addressLine(node: CategoryNode): string {
  const detail = node.isVisible ? subcategoriesLabel(node) : text.hiddenTag;
  return `${text.storePath}${node.slug} · ${detail}`;
}
