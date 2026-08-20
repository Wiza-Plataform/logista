import * as z from 'zod';

export const REFERENCE_LISTS = ['STORE_CATEGORY', 'BIZ_TYPE'] as const;

export const referenceListSchema = z.enum(REFERENCE_LISTS);

export type ReferenceList = z.infer<typeof referenceListSchema>;

export const referenceItemSchema = z.object({
  ulid: z.string(),
  value: z.string(),
  label: z.string(),
});

export type ReferenceItem = z.infer<typeof referenceItemSchema>;

export const referenceItemsSchema = z.object({
  items: z.array(referenceItemSchema),
});
