'use client';

import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { SidebarToggle } from '@/shared/ui/icons';
import { useSidebar } from '@/shared/ui/sidebar';

const ARROW_CLASS =
  '[&>path:last-child]:origin-[14px_12px] [&>path:last-child]:transition-transform [&>path:last-child]:duration-[220ms]';

export function CollapseButton() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const label = isCollapsed ? strings.topbar.expandMenu : strings.topbar.collapseMenu;

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      aria-label={label}
      title={label}
      className="bg-card border-border text-muted-foreground hover:text-foreground hover:border-ring grid size-[38px] shrink-0 place-items-center rounded-[10px] border transition-colors"
    >
      <SidebarToggle
        strokeWidth={1.8}
        className={cn('size-[18px]', ARROW_CLASS, isCollapsed && '[&>path:last-child]:rotate-180')}
      />
    </button>
  );
}
