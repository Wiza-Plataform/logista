'use server';

import { ApiError } from '@/shared/api/client';
import type { SignInRequest } from '@/shared/contracts/merchant-account';
import { strings } from '@/shared/i18n/strings';
import { storeSession } from '@/shared/session/session-cookie';

import { signIn } from './api';
import { forgetEmail, rememberEmail } from './remembered-email';
import type { SignInResult } from './validation';

export async function signInAction(
  credentials: SignInRequest,
  shouldRemember: boolean,
): Promise<SignInResult> {
  try {
    const opened = await signIn(credentials);
    await storeSession(opened.session);
    if (shouldRemember) await rememberEmail(credentials.email);
    else await forgetEmail();
    return { ok: true };
  } catch (error) {
    if (error instanceof ApiError) {
      return { ok: false, status: error.status, field: error.field, message: error.message };
    }
    return { ok: false, status: 0, message: strings.apiErrors.unexpected };
  }
}
