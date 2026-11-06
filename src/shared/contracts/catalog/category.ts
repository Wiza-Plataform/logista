import * as z from 'zod';

import { ulidSchema } from '../ulid.ts';

const categoryFields = {
  categoryUlid: ulidSchema,
  name: z.string(),
  slug: z.string(),
  parentCategoryUlid: ulidSchema.nullable(),
  isVisible: z.boolean(),
  position: z.number().int().nonnegative(),
};

export const categorySchema = z.object(categoryFields);

export type Category = z.infer<typeof categorySchema>;

export const categoryListSchema = z.array(categorySchema);

export interface CategoryNode extends Category {
  readonly productCount: number;
  readonly subcategories: readonly CategoryNode[];
}

export const categoryNodeSchema: z.ZodType<CategoryNode> = z.object({
  ...categoryFields,
  productCount: z.number().int().nonnegative(),
  get subcategories() {
    return z.array(categoryNodeSchema);
  },
});

export const categoryTreeSchema = z.array(categoryNodeSchema);

export interface SaveCategoryRequest {
  readonly name: string;
  readonly slug: string;
  readonly parentCategoryUlid: string | null;
  readonly isVisible: boolean;
}
