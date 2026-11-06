'use client';

import { strings } from '@/shared/i18n/strings';
import { Burger } from '@/shared/ui/icons';
import { useSidebar } from '@/shared/ui/sidebar';

export function MobileBar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="border-border bg-sidebar sticky top-0 z-30 hidden items-center justify-between gap-3 border-b px-4 py-3 max-[860px]:flex">
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={strings.topbar.openMenu}
        className="bg-muted text-primary grid size-11 place-items-center rounded-[10px]"
      >
        <Burger className="size-[19px]" strokeWidth={2} />
      </button>
      <span className="text-foreground font-[family-name:var(--font-sansita)] text-[19px] leading-none">
        {strings.topbar.brand}
      </span>
      <span aria-hidden="true" className="size-11" />
    </header>
  );
}
