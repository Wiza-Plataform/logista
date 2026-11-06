import { ApiError, apiRequest, parseResponse } from '@/shared/api/client';
import { accountSessionSchema } from '@/shared/contracts/merchant-account';
import type {
  AccountSession,
  RegisterMerchantAccountRequest,
} from '@/shared/contracts/merchant-account';
import { storeSchema, subdomainAvailabilitySchema } from '@/shared/contracts/store';
import type {
  CreateStoreRequest,
  Store,
  SubdomainAvailability,
  UpdateBrandingRequest,
} from '@/shared/contracts/store';
import { ulidSchema } from '@/shared/contracts/ulid';
import { strings } from '@/shared/i18n/strings';

export async function checkAddress(name: string): Promise<SubdomainAvailability> {
  return parseResponse(
    subdomainAvailabilitySchema,
    await apiRequest('/stores/subdomain-availability', { query: { name } }),
  );
}

export async function registerMerchantAccount(
  account: RegisterMerchantAccountRequest,
): Promise<AccountSession> {
  const body = {
    fullName: account.fullName,
    email: account.email,
    phone: account.phone,
    password: account.password,
  };
  return parseResponse(
    accountSessionSchema,
    await apiRequest('/merchant-accounts', { method: 'POST', body }),
  );
}

export async function createStore(payload: CreateStoreRequest): Promise<Store> {
  return parseResponse(
    storeSchema,
    await apiRequest('/stores', { method: 'POST', body: { name: payload.name } }),
  );
}

export async function saveBranding(
  storeUlid: string,
  payload: UpdateBrandingRequest,
): Promise<Store> {
  if (!ulidSchema.safeParse(storeUlid).success) {
    throw new ApiError(0, undefined, strings.apiErrors.unexpected);
  }
  const body = { description: payload.description, primaryColor: payload.primaryColor };
  return parseResponse(
    storeSchema,
    await apiRequest(`/stores/${storeUlid}/branding`, { method: 'PATCH', body }),
  );
}
