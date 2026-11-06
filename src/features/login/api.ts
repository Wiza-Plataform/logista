import { apiRequest, parseResponse } from '@/shared/api/client';
import { accountSessionSchema } from '@/shared/contracts/merchant-account';
import type { AccountSession, SignInRequest } from '@/shared/contracts/merchant-account';

export async function signIn(credentials: SignInRequest): Promise<AccountSession> {
  const body = { email: credentials.email, password: credentials.password };
  return parseResponse(
    accountSessionSchema,
    await apiRequest('/merchant-sessions', { method: 'POST', body }),
  );
}
