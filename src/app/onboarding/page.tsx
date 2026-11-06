import type { Metadata } from 'next';

import { Wizard } from '@/features/onboarding/wizard';
import { strings } from '@/shared/i18n/strings';
import { currentMerchantOrNull } from '@/shared/session/guards';
import { PublicShell } from '@/shared/shell/public-shell';

export const metadata: Metadata = { title: strings.onboarding.pageTitle };

export default async function OnboardingPage() {
  const merchant = await currentMerchantOrNull();
  const store = merchant?.stores.at(0);

  return (
    <PublicShell>
      <Wizard hasAccount={merchant !== null} storeUlid={store?.storeUlid ?? null} />
    </PublicShell>
  );
}
