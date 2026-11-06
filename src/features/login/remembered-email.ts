import { cookies } from 'next/headers';

import { signInSchema } from '@/shared/contracts/merchant-account';

const REMEMBERED_EMAIL_COOKIE = 'wiza_remembered_email';

const MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

export async function readRememberedEmail(): Promise<string> {
  const cookieStore = await cookies();
  const value = cookieStore.get(REMEMBERED_EMAIL_COOKIE)?.value ?? '';
  return signInSchema.shape.email.safeParse(value).success ? value : '';
}

export async function rememberEmail(email: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(REMEMBERED_EMAIL_COOKIE, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/login',
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function forgetEmail(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({ name: REMEMBERED_EMAIL_COOKIE, path: '/login' });
}
