import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import { THEME_COOKIE, type Theme, themeFromCookie } from '@/shared/shell/theme';
import { ThemeToggle } from '@/shared/shell/theme-toggle';

export async function AuthSplitLayout({
  panel,
  children,
}: {
  panel: ReactNode;
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const theme: Theme = themeFromCookie(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <>
      <ThemeToggle
        initial={theme}
        className="fixed top-5.5 right-5.5 z-20 size-9.5 before:absolute before:-inset-0.75"
      />
      <div className="flex min-h-screen">
        {panel}
        <main className="bg-background flex min-w-0 flex-[2_1_420px] items-center justify-center px-8 py-10">
          <div className="w-full max-w-[380px]">{children}</div>
        </main>
      </div>
    </>
  );
}
