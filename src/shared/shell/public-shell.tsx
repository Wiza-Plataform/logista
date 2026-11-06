import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import { strings } from '@/shared/i18n/strings';

import { BrandSymbol } from './brand-symbol';
import { THEME_COOKIE, type Theme, themeFromCookie } from './theme';
import { ThemeToggle } from './theme-toggle';

function Wordmark() {
  return (
    <div className="flex items-center gap-2.25">
      <BrandSymbol className="size-7.5" />
      <div className="bg-[image:var(--brand-grad)] bg-clip-text font-[family-name:var(--font-sansita)] text-xl text-transparent">
        {strings.publicShell.brand}
      </div>
    </div>
  );
}

export async function PublicShell({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const theme: Theme = themeFromCookie(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <div className="flex min-h-screen justify-center px-5 pt-7.5 pb-17.5">
      <div className="w-full max-w-[540px]">
        <div className="mb-6.5 flex items-center justify-between">
          <Wordmark />
          <ThemeToggle initial={theme} />
        </div>

        {children}
      </div>
    </div>
  );
}
