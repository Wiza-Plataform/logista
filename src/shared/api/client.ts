import type * as z from 'zod';

import { parseApiError } from '@/shared/contracts/api-error';
import { strings } from '@/shared/i18n/strings';
import { readSessionToken } from '@/shared/session/session-cookie';

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

export interface ApiRequestOptions {
  readonly method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  readonly body?: unknown;
  readonly form?: FormData;
  readonly query?: Readonly<Record<string, string>>;
  readonly timeoutMs?: number;
}

function messageOf(body: unknown): string {
  const parsed = parseApiError(body);
  if (parsed?.message === undefined) return strings.apiErrors.unexpected;
  if (Array.isArray(parsed.message)) return parsed.message.at(0) ?? strings.apiErrors.unexpected;
  return parsed.message;
}

async function headersFor(hasBody: boolean): Promise<Record<string, string>> {
  const headers: Record<string, string> = {};
  if (hasBody) headers['content-type'] = 'application/json';

  const token = await readSessionToken();
  if (token !== undefined) headers.authorization = `Bearer ${token}`;

  return headers;
}

function urlFor(path: string, query: ApiRequestOptions['query']): string {
  if (query === undefined) return `${BASE_URL}${path}`;
  return `${BASE_URL}${path}?${new URLSearchParams(query).toString()}`;
}

function payloadOf(options: ApiRequestOptions): BodyInit | undefined {
  if (options.form !== undefined) return options.form;
  if (options.body !== undefined) return JSON.stringify(options.body);
  return undefined;
}

export async function apiRequest(path: string, options: ApiRequestOptions = {}): Promise<unknown> {
  const init: RequestInit = {
    method: options.method ?? 'GET',
    headers: await headersFor(options.body !== undefined && options.form === undefined),
    cache: 'no-store',
    signal: AbortSignal.timeout(options.timeoutMs ?? TIMEOUT_MS),
  };
  const payload = payloadOf(options);
  if (payload !== undefined) init.body = payload;

  let response: Response;
  try {
    response = await fetch(urlFor(path, options.query), init);
  } catch {
    throw new ApiError(0, undefined, strings.apiErrors.offline);
  }

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(response.status, parseApiError(body)?.field, messageOf(body));
  }

  return body;
}

export function parseResponse<T>(schema: z.ZodType<T>, body: unknown): T {
  const parsed = schema.safeParse(body);
  if (!parsed.success) throw new ApiError(0, undefined, strings.apiErrors.unexpected);
  return parsed.data;
}
