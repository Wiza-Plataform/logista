'use server';

import { revalidatePath } from 'next/cache';

import { failedActionOf } from '@/shared/api/action-failure';
import type { SaveUnitRequest } from '@/shared/contracts/catalog/unit';
import { isSwitchOn, textOf } from '@/shared/forms/form-data';
import { requireStoreUlid } from '@/shared/session/guards';

import { createUnit, deleteUnit, updateUnit } from './api';
import { UNITS_PATH } from './unit-action-result';
import type { UnitActionResult } from './unit-action-result';

function requestFrom(formData: FormData): SaveUnitRequest {
  return {
    name: textOf(formData, 'name'),
    symbol: textOf(formData, 'symbol'),
    allowsFractions: isSwitchOn(formData, 'allowsFractions'),
  };
}

export async function saveUnitAction(formData: FormData): Promise<UnitActionResult> {
  const storeUlid = await requireStoreUlid();
  const unitUlid = textOf(formData, 'unitUlid');

  try {
    if (unitUlid === '') await createUnit(storeUlid, requestFrom(formData));
    else await updateUnit(storeUlid, unitUlid, requestFrom(formData));
  } catch (error) {
    return failedActionOf(error);
  }

  revalidatePath(UNITS_PATH);
  return { status: unitUlid === '' ? 'created' : 'updated' };
}

export async function deleteUnitAction(unitUlid: string): Promise<UnitActionResult> {
  const storeUlid = await requireStoreUlid();

  try {
    await deleteUnit(storeUlid, unitUlid);
  } catch (error) {
    return failedActionOf(error);
  }

  revalidatePath(UNITS_PATH);
  return { status: 'removed' };
}
