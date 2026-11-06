'use client';

import { useOptimistic, useState, useTransition } from 'react';

import { PageHead } from '@/shared/blocks/page-head';
import { NoResults, Panel } from '@/shared/blocks/panel';
import type { CategoryNode } from '@/shared/contracts/catalog/category';
import type { ProductOverview } from '@/shared/contracts/catalog/product';
import { useToast } from '@/shared/feedback/toaster';
import { strings } from '@/shared/i18n/strings';
import { Button } from '@/shared/ui/button';
import { Plus } from '@/shared/ui/icons';

import { changeCategoryVisibilityAction, reorderCategoriesAction } from './actions';
import type { CategoryActionResult } from './category-action-result';
import { CategoryDrawer } from './category-drawer';
import { feedbackOf } from './category-feedback';
import { CategoryDistribution, CategoryStats, OrganizationTip } from './category-insights';
import { CategoryList } from './category-list';
import type { CategoryListActions } from './category-list';
import { applyChange } from './category-tree';
import type { TreeChange } from './category-tree';

const text = strings.categories;

interface DrawerState {
  readonly isOpen: boolean;
  readonly category: CategoryNode | null;
  readonly session: number;
}

interface CategoriesScreenProps {
  readonly tree: readonly CategoryNode[];
  readonly overview: ProductOverview;
}

function useOptimisticTree(tree: readonly CategoryNode[]) {
  const toast = useToast();
  const [, startTransition] = useTransition();
  const [optimisticTree, applyOptimistic] = useOptimistic(tree, applyChange);

  function run(change: TreeChange, action: () => Promise<CategoryActionResult>) {
    startTransition(async () => {
      applyOptimistic(change);
      const { message, tone } = feedbackOf(await action());
      toast(message, tone);
    });
  }

  return {
    optimisticTree,
    reorder: (parentCategoryUlid: string | null, categoryUlids: readonly string[]) => {
      run({ kind: 'reorder', parentCategoryUlid, categoryUlids }, () =>
        reorderCategoriesAction(parentCategoryUlid, categoryUlids),
      );
    },
    toggleVisibility: (category: CategoryNode) => {
      const isVisible = !category.isVisible;
      run({ kind: 'visibility', categoryUlid: category.categoryUlid, isVisible }, () =>
        changeCategoryVisibilityAction(category.categoryUlid, isVisible),
      );
    },
  };
}

export function CategoriesScreen({ tree, overview }: CategoriesScreenProps) {
  const [drawer, setDrawer] = useState<DrawerState>({ isOpen: false, category: null, session: 0 });
  const { optimisticTree, reorder, toggleVisibility } = useOptimisticTree(tree);

  function openFor(category: CategoryNode | null) {
    setDrawer((current) => ({ isOpen: true, category, session: current.session + 1 }));
  }

  function close() {
    setDrawer((current) => ({ ...current, isOpen: false }));
  }

  const listActions: CategoryListActions = {
    onEdit: openFor,
    onToggleVisibility: toggleVisibility,
    onReorder: reorder,
  };

  const createButton = (
    <Button
      variant="brand"
      size="action"
      onClick={() => {
        openFor(null);
      }}
    >
      <Plus className="size-[15px]" strokeWidth={1.9} />
      {text.create}
    </Button>
  );

  return (
    <>
      <PageHead title={text.title} subtitle={text.subtitle} actions={createButton} />
      <CategoryStats tree={optimisticTree} overview={overview} />
      <div className="grid grid-cols-[1.5fr_1fr] items-start gap-4 max-[880px]:grid-cols-1">
        {optimisticTree.length === 0 ? (
          <Panel>
            <NoResults>{text.empty}</NoResults>
          </Panel>
        ) : (
          <CategoryList
            categories={optimisticTree}
            parentCategoryUlid={null}
            depth={0}
            actions={listActions}
          />
        )}
        <div className="flex min-w-0 flex-col gap-3.5">
          <CategoryDistribution tree={optimisticTree} />
          <OrganizationTip />
        </div>
      </div>
      <CategoryDrawer
        key={drawer.session}
        category={drawer.category}
        tree={optimisticTree}
        isOpen={drawer.isOpen}
        onClose={close}
      />
    </>
  );
}
