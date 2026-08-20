import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { GroupSection } from '@/features/screen-index/group-section';
import { screenGroups } from '@/features/screen-index/screens';
import { strings } from '@/shared/i18n/strings';
import { THEME_COOKIE, type Theme, themeFromCookie } from '@/shared/shell/theme';
import { ThemeToggle } from '@/shared/shell/theme-toggle';

export const metadata: Metadata = { title: strings.screenIndex.pageTitle };

function Wordmark() {
  return (
    <div className="flex items-center gap-2.75">
      <div className="grid size-10.5 place-items-center rounded-[12px] bg-[var(--lima)]">
        <span className="mt-0.5 font-[family-name:var(--font-sansita)] text-h1 text-[var(--verde-primario)]">
          W
        </span>
      </div>
      <div>
        <div className="bg-[image:var(--brand-grad)] bg-clip-text font-[family-name:var(--font-sansita)] text-[28px] leading-none text-transparent">
          {strings.screenIndex.brand}
        </div>
        <div className="text-muted-foreground mt-0.5 text-sm">{strings.screenIndex.subtitle}</div>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="mb-7.5 flex flex-wrap gap-3.5 text-xs text-[var(--txt-faint)]">
      <span className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-[var(--st-paid-fg)]" />
        {strings.screenIndex.legendLive}
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-[var(--st-wait-fg)]" />
        {strings.screenIndex.legendSoon}
      </span>
    </div>
  );
}

export default async function ScreenIndexPage() {
  const cookieStore = await cookies();
  const theme: Theme = themeFromCookie(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <div className="px-5.5 pb-17.5">
      <div className="mx-auto max-w-[1080px]">
        <header className="flex flex-wrap items-center gap-3.5 pt-7.5 pb-6">
          <Wordmark />
          <div className="ml-auto">
            <ThemeToggle initial={theme} />
          </div>
        </header>

        <p className="text-muted-foreground mb-2 max-w-[680px] text-[14px] leading-[1.6]">
          {strings.screenIndex.intro}
        </p>
        <Legend />

        {screenGroups.map((group) => (
          <GroupSection key={group.title} group={group} />
        ))}

        <footer className="border-border border-t pt-5 text-center text-sm leading-[1.6] text-[var(--txt-faint)]">
          {strings.screenIndex.footer}
        </footer>
      </div>
    </div>
  );
}
