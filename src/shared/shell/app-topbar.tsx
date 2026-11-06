import { Suspense } from 'react';

import { CollapseButton } from './collapse-button';
import type { Theme } from './theme';
import { ThemeToggle } from './theme-toggle';
import { TopbarAccount, TopbarAccountSkeleton } from './topbar-account';

export function AppTopbar({ theme }: { theme: Theme }) {
  return (
    <header className="border-border bg-sidebar sticky top-0 z-25 flex items-center gap-4 border-b px-[26px] py-[13px] max-[860px]:hidden">
      <CollapseButton />
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle initial={theme} className="size-[38px]" />
        <div aria-hidden="true" className="bg-border mx-0.5 h-6 w-px" />
        <Suspense fallback={<TopbarAccountSkeleton />}>
          <TopbarAccount />
        </Suspense>
      </div>
    </header>
  );
}
