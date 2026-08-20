'use client';

import { useState } from 'react';

import { strings } from '@/shared/i18n/strings';
import { Moon, Sun } from '@/shared/ui/icons';

import { THEME_COOKIE, THEME_MAX_AGE, type Theme } from './theme';

export function ThemeToggle({ initial }: { initial: Theme }) {
  const [theme, setTheme] = useState<Theme>(initial);

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=${String(THEME_MAX_AGE)}; samesite=lax`;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={strings.theme.toggle}
      className="bg-card border-border text-muted-foreground hover:text-foreground hover:border-ring grid size-10 place-items-center rounded-[10px] border transition-colors"
    >
      {theme === 'light' ? (
        <Sun className="size-[18px]" strokeWidth={1.8} />
      ) : (
        <Moon className="size-[18px]" strokeWidth={1.8} />
      )}
    </button>
  );
}
