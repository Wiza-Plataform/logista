'use client';

import type { CategoryNode } from '@/shared/contracts/catalog/category';
import { cn } from '@/shared/lib/utils';

import { CategoryRow, SubcategoryRow } from './category-rows';
import type { CategoryRowActions } from './category-rows';
import { useSiblingOrder } from './use-sibling-order';

export interface CategoryListActions extends CategoryRowActions {
  readonly onReorder: (parentCategoryUlid: string | null, categoryUlids: readonly string[]) => void;
}

interface CategoryListProps {
  readonly categories: readonly CategoryNode[];
  readonly parentCategoryUlid: string | null;
  readonly depth: number;
  readonly actions: CategoryListActions;
}

const TOP_LEVEL = 0;

function listClassesFor(depth: number): string {
  if (depth === TOP_LEVEL) return 'flex min-w-0 flex-col gap-[9px]';
  return cn('mb-0.5 flex flex-col gap-[5px]', depth === 1 ? 'ml-11 max-[560px]:ml-6' : 'ml-6');
}

export function CategoryList({
  categories,
  parentCategoryUlid,
  depth,
  actions,
}: CategoryListProps) {
  const order = useSiblingOrder(
    categories.map((category) => category.categoryUlid),
    (categoryUlids) => {
      actions.onReorder(parentCategoryUlid, categoryUlids);
    },
  );
  const Row = depth === TOP_LEVEL ? CategoryRow : SubcategoryRow;

  return (
    <ul className={listClassesFor(depth)}>
      {categories.map((category) => (
        <li
          key={category.categoryUlid}
          className={cn('flex flex-col', depth === TOP_LEVEL ? 'gap-[7px]' : 'gap-[5px]')}
        >
          <Row
            category={category}
            isDragging={order.draggedUlid === category.categoryUlid}
            dragBindings={order.dragBindingsFor(category.categoryUlid)}
            onGripKeyDown={order.keyDownFor(category.categoryUlid)}
            actions={actions}
          />
          {category.subcategories.length === 0 ? null : (
            <CategoryList
              categories={category.subcategories}
              parentCategoryUlid={category.categoryUlid}
              depth={depth + 1}
              actions={actions}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
