import { redirect } from 'next/navigation';

import type { CurrentMerchant } from '@/shared/contracts/merchant-account';

import { getCurrentMerchant } from './api';

export async function requireMerchantWithStore(): Promise<CurrentMerchant> {
  const merchant = await getCurrentMerchant();
  if (merchant === null) redirect('/login');
  if (merchant.stores.length === 0) redirect('/onboarding');
  return merchant;
}

export async function requireStoreUlid(): Promise<string> {
  const store = (await requireMerchantWithStore()).stores.at(0);
  if (store === undefined) redirect('/onboarding');
  return store.storeUlid;
}

export async function currentMerchantOrNull(): Promise<CurrentMerchant | null> {
  return getCurrentMerchant().catch(() => null);
}

export function homeOf(merchant: CurrentMerchant): '/' | '/onboarding' {
  return merchant.stores.length > 0 ? '/' : '/onboarding';
}
