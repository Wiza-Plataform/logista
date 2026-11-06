'use client';

import { useState, useTransition } from 'react';
import type { SubmitEvent } from 'react';

import { ConfirmRemoval } from '@/shared/blocks/confirm-removal';
import { SideDrawer } from '@/shared/blocks/side-drawer';
import type { CategoryNode } from '@/shared/contracts/catalog/category';
import { useToast } from '@/shared/feedback/toaster';
import type { FormFailure } from '@/shared/forms/form-failure';
import { strings } from '@/shared/i18n/strings';
import { Button } from '@/shared/ui/button';

import { deleteCategoryAction, saveCategoryAction } from './actions';
import type { CategoryActionResult } from './category-action-result';
import { feedbackOf } from './category-feedback';
import { CategoryFields } from './category-fields';

const text = strings.categories;
const FORM_ID = 'category-form';

interface CategoryDrawerProps {
  readonly category: CategoryNode | null;
  readonly tree: readonly CategoryNode[];
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

function useCategoryForm(onClose: () => void) {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const [failure, setFailure] = useState<FormFailure | null>(null);

  function settle(result: CategoryActionResult) {
    if (result.status === 'failed') {
      setFailure(result);
      return;
    }
    toast(feedbackOf(result).message);
    onClose();
  }

  return {
    isPending,
    failure,
    save: (formData: FormData) => {
      startTransition(async () => {
        settle(await saveCategoryAction(formData));
      });
    },
    remove: (categoryUlid: string) => {
      startTransition(async () => {
        settle(await deleteCategoryAction(categoryUlid));
      });
    },
  };
}

export function CategoryDrawer({ category, tree, isOpen, onClose }: CategoryDrawerProps) {
  const { isPending, failure, save, remove } = useCategoryForm(onClose);

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    save(new FormData(event.currentTarget));
  }

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={category === null ? text.drawerNew : text.drawerEdit}
      footer={
        <>
          {category === null ? null : (
            <ConfirmRemoval
              isPending={isPending}
              onConfirm={() => {
                remove(category.categoryUlid);
              }}
            />
          )}
          <Button
            type="submit"
            form={FORM_ID}
            variant="brand"
            size="action"
            disabled={isPending}
            className="ml-auto"
          >
            {isPending ? text.saving : text.save}
          </Button>
        </>
      }
    >
      <form id={FORM_ID} onSubmit={submit} noValidate>
        <CategoryFields category={category} tree={tree} failure={failure} />
      </form>
    </SideDrawer>
  );
}
