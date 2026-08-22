import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Wizard } from '@/features/onboarding/wizard';
import { strings } from '@/shared/i18n/strings';
import { THEME_COOKIE, type Theme, themeFromCookie } from '@/shared/shell/theme';
import { ThemeToggle } from '@/shared/shell/theme-toggle';

export const metadata: Metadata = { title: strings.onboarding.pageTitle };

function Wordmark() {
  return (
    <div className="flex items-center gap-2.25">
      <div className="grid size-7.5 place-items-center rounded-[9px] bg-[var(--lima)]">
        <span className="mt-0.5 font-[family-name:var(--font-sansita)] text-lg text-[var(--verde-primario)]">
          W
        </span>
      </div>
      <div className="bg-[image:var(--brand-grad)] bg-clip-text font-[family-name:var(--font-sansita)] text-xl text-transparent">
        {strings.onboarding.brand}
      </div>
    </div>
  );
}

export default async function OnboardingPage() {
  const cookieStore = await cookies();
  const theme: Theme = themeFromCookie(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <div className="flex min-h-screen justify-center px-5 pt-7.5 pb-17.5">
      <div className="w-full max-w-[540px]">
        <div className="mb-6.5 flex items-center justify-between">
          <Wordmark />
          <ThemeToggle initial={theme} />
        </div>

        <Wizard />
      </div>
    </div>
  );
}
