import * as z from 'zod';

import { pageSchemaOf } from '../page.ts';
import { ulidSchema } from '../ulid.ts';
import { stockStatusSchema } from './product.ts';

export const movementTypeSchema = z.enum(['RECEIPT', 'ISSUE', 'ADJUSTMENT']);

export type MovementType = z.infer<typeof movementTypeSchema>;

export const stockItemSchema = z.object({
  productUlid: ulidSchema,
  productName: z.string(),
  variantUlid: ulidSchema,
  sku: z.string().nullable(),
  optionValues: z.array(z.string()),
  unitSymbol: z.string(),
  allowsFractions: z.boolean(),
  quantity: z.number().nonnegative(),
  status: stockStatusSchema,
});

export type StockItem = z.infer<typeof stockItemSchema>;

export const stockProductVariantSchema = z.object({
  variantUlid: ulidSchema,
  sku: z.string().nullable(),
  optionValues: z.array(z.string()),
  quantity: z.number().nonnegative(),
  status: stockStatusSchema,
});

export type StockProductVariant = z.infer<typeof stockProductVariantSchema>;

export const stockProductSchema = z.object({
  productUlid: ulidSchema,
  productName: z.string(),
  unitSymbol: z.string(),
  allowsFractions: z.boolean(),
  hasVariants: z.boolean(),
  quantity: z.number().nonnegative(),
  status: stockStatusSchema,
  variants: z.array(stockProductVariantSchema).min(1),
});

export type StockProduct = z.infer<typeof stockProductSchema>;

export const stockProductPageSchema = pageSchemaOf(stockProductSchema);

export type StockProductPage = z.infer<typeof stockProductPageSchema>;

export const stockMovementSchema = z.object({
  movementUlid: ulidSchema,
  variantUlid: ulidSchema,
  type: movementTypeSchema,
  quantityDelta: z.number(),
  balanceAfter: z.number().nonnegative(),
  note: z.string().nullable(),
  occurredAt: z.string(),
});

export type StockMovement = z.infer<typeof stockMovementSchema>;

export const stockMovementPageSchema = pageSchemaOf(stockMovementSchema);

export interface RegisterMovementRequest {
  readonly variantUlid: string;
  readonly type: MovementType;
  readonly quantity: number;
  readonly note: string | null;
}

export interface StockCounts {
  readonly all: number;
  readonly low: number;
  readonly out: number;
}
