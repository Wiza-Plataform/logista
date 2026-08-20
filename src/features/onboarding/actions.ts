'use server';

import type { CreatedStore, SubdomainAvailability } from '@/shared/contracts/store';
import type {
  CreateStoreRequest,
  UpdateBrandingRequest,
  UpdateFiscalIdentityRequest,
} from '@/shared/contracts/store';
import { strings } from '@/shared/i18n/strings';

import { ApiError, checkSubdomain, createStore, saveBranding, saveFiscalIdentity } from './api';
import type { Result } from './types';

function toFailure(error: unknown): Result<never> {
  if (error instanceof ApiError) {
    return { ok: false, field: error.field, message: error.message };
  }
  return { ok: false, message: strings.apiErrors.unexpected };
}

export async function checkSubdomainAction(
  subdomain: string,
): Promise<Result<SubdomainAvailability>> {
  try {
    return { ok: true, data: await checkSubdomain(subdomain) };
  } catch (error) {
    return toFailure(error);
  }
}

export async function createStoreAction(
  payload: CreateStoreRequest,
): Promise<Result<CreatedStore>> {
  try {
    return { ok: true, data: await createStore(payload) };
  } catch (error) {
    return toFailure(error);
  }
}

export async function saveFiscalIdentityAction(
  storeUlid: string,
  payload: UpdateFiscalIdentityRequest,
): Promise<Result<null>> {
  try {
    await saveFiscalIdentity(storeUlid, payload);
    return { ok: true, data: null };
  } catch (error) {
    return toFailure(error);
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
