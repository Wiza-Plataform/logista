'use server';

import { ApiError } from '@/shared/api/client';
import type { SubdomainAvailability, UpdateBrandingRequest } from '@/shared/contracts/store';
import { strings } from '@/shared/i18n/strings';
import { storeSession } from '@/shared/session/session-cookie';

import { checkAddress, createStore, registerMerchantAccount, saveBranding } from './api';
import type { Failure, Result, StartStoreInput, StartStoreResult } from './types';

function toFailure(error: unknown): Failure {
  if (error instanceof ApiError) {
    return { ok: false, field: error.field, message: error.message };
  }
  return { ok: false, message: strings.apiErrors.unexpected };
}

export async function checkAddressAction(name: string): Promise<Result<SubdomainAvailability>> {
  try {
    return { ok: true, data: await checkAddress(name) };
  } catch (error) {
    return toFailure(error);
  }
}

export async function startStoreAction(input: StartStoreInput): Promise<StartStoreResult> {
  let hasAccount = input.account === null;

  try {
    const address = await checkAddress(input.storeName);
    if (!address.available) {
      const message = address.reason ?? strings.apiErrors.unexpected;
      return { ok: false, field: 'name', message, hasAccount };
    }

    if (input.account !== null) {
      const opened = await registerMerchantAccount(input.account);
      await storeSession(opened.session);
      hasAccount = true;
    }

    const store = await createStore({ name: input.storeName });
    return { ok: true, data: { storeUlid: store.storeUlid } };
  } catch (error) {
    return { ...toFailure(error), hasAccount };
  }
}

export async function saveBrandingAction(
  storeUlid: string,
  payload: UpdateBrandingRequest,
): Promise<Result<null>> {
  try {
    await saveBranding(storeUlid, payload);
    return { ok: true, data: null };
  } catch (error) {
    return toFailure(error);
  }
}
