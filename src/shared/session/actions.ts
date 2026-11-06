'use server';

import { redirect } from 'next/navigation';

import { revokeCurrentSession } from './api';
import { clearSession } from './session-cookie';

export async function signOutAction(): Promise<void> {
  await revokeCurrentSession().catch(() => undefined);
  await clearSession();
  redirect('/login');
}
