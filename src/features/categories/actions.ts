'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';

import { failedActionOf, rejectedInput } from '@/shared/api/action-failure';
import type { SaveCategoryRequest } from '@/shared/contracts/catalog/category';
import { ulidSchema } from '@/shared/contracts/ulid';
import { isSwitchOn, textOf } from '@/shared/forms/form-data';
import { requireStoreUlid } from '@/shared/session/guards';

import {
  changeCategoryVisibility,
  createCategory,
  deleteCategory,
  reorderCategories,
  updateCategory,
} from './api';
import { CATEGORIES_PATH } from './category-action-result';
import type { CategoryActionResult } from './category-action-result';

const MAX_SIBLINGS = 500;

const reorderInputSchema = z.object({
  parentCategoryUlid: ulidSchema.nullable(),
  categoryUlids: z.array(ulidSchema).max(MAX_SIBLINGS),
});

const visibilityInputSchema = z.object({
  categoryUlid: ulidSchema,
  isVisible: z.boolean(),
});

function requestFrom(formData: FormData): SaveCategoryRequest {
  const parentCategoryUlid = textOf(formData, 'parentCategoryUlid');
  return {
    name: textOf(formData, 'name'),
    slug: textOf(formData, 'slug'),
    parentCategoryUlid: parentCategoryUlid === '' ? null : parentCategoryUlid,
    isVisible: isSwitchOn(formData, 'isVisible'),
  };
}

async function settle(
  change: (storeUlid: string) => Promise<void>,
  success: CategoryActionResult,
): Promise<CategoryActionResult> {
  const storeUlid = await requireStoreUlid();

  try {
    await change(storeUlid);
  } catch (error) {
    return failedActionOf(error);
  }

  revalidatePath(CATEGORIES_PATH);
  return success;
}

export async function saveCategoryAction(formData: FormData): Promise<CategoryActionResult> {
  const categoryUlid = textOf(formData, 'categoryUlid');
  const request = requestFrom(formData);

  if (categoryUlid === '') {
    return settle((storeUlid) => createCategory(storeUlid, request), { status: 'created' });
  }
  return settle((storeUlid) => updateCategory(storeUlid, categoryUlid, request), {
    status: 'updated',
  });
}

export async function deleteCategoryAction(categoryUlid: string): Promise<CategoryActionResult> {
  return settle((storeUlid) => deleteCategory(storeUlid, categoryUlid), { status: 'removed' });
}

export async function reorderCategoriesAction(
  parentCategoryUlid: string | null,
  categoryUlids: readonly string[],
): Promise<CategoryActionResult> {
  const input = reorderInputSchema.safeParse({ parentCategoryUlid, categoryUlids });
  if (!input.success) return rejectedInput();

  return settle(
    (storeUlid) =>
      reorderCategories(storeUlid, input.data.parentCategoryUlid, input.data.categoryUlids),
    { status: 'reordered' },
  );
}

export async function changeCategoryVisibilityAction(
  categoryUlid: string,
  isVisible: boolean,
): Promise<CategoryActionResult> {
  const input = visibilityInputSchema.safeParse({ categoryUlid, isVisible });
  if (!input.success) return rejectedInput();

  return settle(
    (storeUlid) =>
      changeCategoryVisibility(storeUlid, input.data.categoryUlid, input.data.isVisible),
    { status: input.data.isVisible ? 'shown' : 'hidden' },
  );
}
