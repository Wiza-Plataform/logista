import * as z from 'zod';

import { ulidSchema } from './ulid.ts';

export const referenceItemListSchema = z.object({
  items: z.array(z.object({ ulid: ulidSchema, value: z.string(), label: z.string() })),
});

export type ReferenceItem = z.infer<typeof referenceItemListSchema>['items'][number];
