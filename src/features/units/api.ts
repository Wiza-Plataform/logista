import { ApiError, apiRequest, parseResponse } from '@/shared/api/client';
import { unitListSchema, unitSchema } from '@/shared/contracts/catalog/unit';
import type { SaveUnitRequest, Unit } from '@/shared/contracts/catalog/unit';
import { ulidSchema } from '@/shared/contracts/ulid';
import { strings } from '@/shared/i18n/strings';

function unitPath(storeUlid: string, unitUlid: string): string {
  if (!ulidSchema.safeParse(unitUlid).success) {
    throw new ApiError(0, undefined, strings.apiErrors.unexpected);
  }
  return `/stores/${storeUlid}/units/${unitUlid}`;
}

function bodyOf(request: SaveUnitRequest): SaveUnitRequest {
  return { name: request.name, symbol: request.symbol, allowsFractions: request.allowsFractions };
}

export async function fetchUnits(storeUlid: string): Promise<readonly Unit[]> {
  return parseResponse(unitListSchema, await apiRequest(`/stores/${storeUlid}/units`));
}

export async function createUnit(storeUlid: string, request: SaveUnitRequest): Promise<Unit> {
  return parseResponse(
    unitSchema,
    await apiRequest(`/stores/${storeUlid}/units`, { method: 'POST', body: bodyOf(request) }),
  );
}

export async function updateUnit(
  storeUlid: string,
  unitUlid: string,
  request: SaveUnitRequest,
): Promise<Unit> {
  return parseResponse(
    unitSchema,
    await apiRequest(unitPath(storeUlid, unitUlid), { method: 'PATCH', body: bodyOf(request) }),
  );
}

export async function deleteUnit(storeUlid: string, unitUlid: string): Promise<void> {
  await apiRequest(unitPath(storeUlid, unitUlid), { method: 'DELETE' });
}
