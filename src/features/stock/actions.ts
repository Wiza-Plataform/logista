'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';

import { failedActionOf, rejectedInput } from '@/shared/api/action-failure';
import { movementTypeSchema } from '@/shared/contracts/catalog/stock';
import type { RegisterMovementRequest } from '@/shared/contracts/catalog/stock';
import { ulidSchema } from '@/shared/contracts/ulid';
import { requireStoreUlid } from '@/shared/session/guards';

import { fetchVariantMovements, registerMovement } from './api';
import type { MovementHistoryResult, RegisterMovementResult } from './stock-action-result';

const PRODUCTS_PATH = '/produtos';
const MAX_QUANTITY = 1_000_000_000;
const MAX_NOTE_LENGTH = 600;

const registerSchema = z.object({
  variantUlid: ulidSchema,
  type: movementTypeSchema,
  quantity: z.number().min(0).max(MAX_QUANTITY),
  note: z.string().max(MAX_NOTE_LENGTH).nullable(),
});

export async function registerMovementAction(
  request: RegisterMovementRequest,
): Promise<RegisterMovementResult> {
  const parsed = registerSchema.safeParse(request);
  if (!parsed.success) return rejectedInput();

  const storeUlid = await requireStoreUlid();
  try {
    await registerMovement(storeUlid, parsed.data);
  } catch (error) {
    return failedActionOf(error);
  }

  revalidatePath(PRODUCTS_PATH, 'layout');
  return { status: 'registered', type: parsed.data.type };
}

export async function movementHistoryAction(variantUlid: string): Promise<MovementHistoryResult> {
  const parsed = ulidSchema.safeParse(variantUlid);
  if (!parsed.success) return rejectedInput();

  const storeUlid = await requireStoreUlid();
  try {
    return { status: 'loaded', movements: await fetchVariantMovements(storeUlid, parsed.data) };
  } catch (error) {
    return failedActionOf(error);
  }
}
