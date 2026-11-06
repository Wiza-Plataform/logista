import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AuthSplitLayout } from '@/features/login/auth-split-layout';
import { BrandPanel } from '@/features/login/brand-panel';
import { LoginForm } from '@/features/login/login-form';
import { readRememberedEmail } from '@/features/login/remembered-email';
import { strings } from '@/shared/i18n/strings';
import { currentMerchantOrNull, homeOf } from '@/shared/session/guards';

export const metadata: Metadata = { title: strings.login.pageTitle };

export default async function LoginPage() {
  const merchant = await currentMerchantOrNull();
  if (merchant !== null) redirect(homeOf(merchant));

  return (
    <AuthSplitLayout panel={<BrandPanel />}>
      <LoginForm rememberedEmail={await readRememberedEmail()} />
    </AuthSplitLayout>
  );
}
