import { cache } from 'react';

import { ApiError, apiRequest, parseResponse } from '@/shared/api/client';
import { currentMerchantSchema } from '@/shared/contracts/merchant-account';
import type { CurrentMerchant } from '@/shared/contracts/merchant-account';
import { storeSchema } from '@/shared/contracts/store';
import type { Store } from '@/shared/contracts/store';

import { readSessionToken } from './session-cookie';

const UNAUTHORIZED = 401;

export const getCurrentMerchant = cache(async (): Promise<CurrentMerchant | null> => {
  if ((await readSessionToken()) === undefined) return null;

  try {
    return parseResponse(currentMerchantSchema, await apiRequest('/merchant-accounts/me'));
  } catch (error) {
    if (error instanceof ApiError && error.status === UNAUTHORIZED) return null;
    throw error;
  }
});

export const getCurrentStore = cache(async (): Promise<Store | null> => {
  const membership = (await getCurrentMerchant())?.stores.at(0);
  if (membership === undefined) return null;

  return parseResponse(storeSchema, await apiRequest(`/stores/${membership.storeUlid}`));
});

export async function revokeCurrentSession(): Promise<void> {
  await apiRequest('/merchant-sessions/current', { method: 'DELETE' });
}
