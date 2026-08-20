import { parseApiError } from '@/shared/contracts/api-error';
import { referenceItemsSchema } from '@/shared/contracts/platform-config';
import type { ReferenceItem, ReferenceList } from '@/shared/contracts/platform-config';
import { createdStoreSchema, subdomainAvailabilitySchema } from '@/shared/contracts/store';
import type {
  CreateStoreRequest,
  CreatedStore,
  SubdomainAvailability,
  UpdateBrandingRequest,
  UpdateFiscalIdentityRequest,
} from '@/shared/contracts/store';
import { strings } from '@/shared/i18n/strings';

import type { Result } from './types';

const BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:3001';
const TIMEOUT_MS = 12_000;

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly field: string | undefined,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions {
  readonly method?: 'POST' | 'PATCH';
  readonly body?: unknown;
  readonly storeUlid?: string;
}

function messageOf(body: unknown): string {
  const parsed = parseApiError(body);
  if (parsed?.message === undefined) return strings.apiErrors.unexpected;
  if (Array.isArray(parsed.message)) return parsed.message.at(0) ?? strings.apiErrors.unexpected;
  return parsed.message;
}

async function request(path: string, options: RequestOptions = {}): Promise<unknown> {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (options.storeUlid !== undefined) headers['x-store-ulid'] = options.storeUlid;

  const init: RequestInit = {
    method: options.method ?? 'GET',
    headers,
    cache: 'no-store',
    signal: AbortSignal.timeout(TIMEOUT_MS),
  };
  if (options.body !== undefined) init.body = JSON.stringify(options.body);

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, init);
  } catch {
    throw new ApiError(0, undefined, strings.apiErrors.offline);
  }

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(response.status, parseApiError(body)?.field, messageOf(body));
  }

  return body;
}

export async function fetchReferenceItems(list: ReferenceList): Promise<ReferenceItem[]> {
  const parsed = referenceItemsSchema.safeParse(await request(`/platform-config/lists/${list}`));
  if (!parsed.success) throw new ApiError(0, undefined, strings.apiErrors.unexpected);

  return parsed.data.items;
}

export interface OnboardingLists {
  readonly categories: readonly ReferenceItem[];
  readonly businessTypes: readonly ReferenceItem[];
}

export async function loadOnboardingLists(): Promise<Result<OnboardingLists>> {
  try {
    const [categories, businessTypes] = await Promise.all([
      fetchReferenceItems('STORE_CATEGORY'),
      fetchReferenceItems('BIZ_TYPE'),
    ]);

    return { ok: true, data: { categories, businessTypes } };
  } catch (error) {
    if (error instanceof ApiError) return { ok: false, message: error.message };
    return { ok: false, message: strings.apiErrors.unexpected };
  }
}

export async function checkSubdomain(subdomain: string): Promise<SubdomainAvailability> {
  const query = new URLSearchParams({ subdomain });
  const parsed = subdomainAvailabilitySchema.safeParse(
    await request(`/stores/subdomain-availability?${query.toString()}`),
  );
  if (!parsed.success) throw new ApiError(0, undefined, strings.apiErrors.unexpected);

  return parsed.data;
}

export async function createStore(payload: CreateStoreRequest): Promise<CreatedStore> {
  const parsed = createdStoreSchema.safeParse(
    await request('/stores', { method: 'POST', body: payload }),
  );
  if (!parsed.success) throw new ApiError(0, undefined, strings.apiErrors.unexpected);

  return parsed.data;
}

export async function saveFiscalIdentity(
  storeUlid: string,
  payload: UpdateFiscalIdentityRequest,
): Promise<void> {
  await request('/stores/me/fiscal-identity', { method: 'PATCH', storeUlid, body: payload });
}

export async function saveBranding(
  storeUlid: string,
  payload: UpdateBrandingRequest,
): Promise<void> {
  await request('/stores/me/branding', { method: 'PATCH', storeUlid, body: payload });
}
