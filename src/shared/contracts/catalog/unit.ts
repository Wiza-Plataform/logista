import * as z from 'zod';

import { ulidSchema } from '../ulid.ts';

export const unitSchema = z.object({
  unitUlid: ulidSchema,
  name: z.string(),
  symbol: z.string(),
  allowsFractions: z.boolean(),
});

export type Unit = z.infer<typeof unitSchema>;

export const unitListSchema = z.array(unitSchema);

export interface SaveUnitRequest {
  readonly name: string;
  readonly symbol: string;
  readonly allowsFractions: boolean;
}
