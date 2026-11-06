import type { Route } from 'next';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

export interface SegmentTab {
  readonly key: string;
  readonly label: string;
  readonly count: number;
  readonly href: Route;
  readonly isActive: boolean;
}

interface SegmentTabsProps {
  readonly label: string;
  readonly tabs: readonly SegmentTab[];
}

const COUNT_IDLE = 'bg-[rgba(138,144,153,0.18)] text-muted-foreground';

export function SegmentTabs({ label, tabs }: SegmentTabsProps) {
  return (
    <nav
      aria-label={label}
      className="flex flex-wrap gap-[5px] max-[560px]:w-full max-[560px]:flex-nowrap max-[560px]:overflow-x-auto max-[560px]:pb-[3px]"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          scroll={false}
          aria-current={tab.isActive ? 'page' : undefined}
          className={cn(
            'text-note inline-flex items-center gap-1.5 rounded-[9px] px-3 py-[7px] font-medium whitespace-nowrap transition-colors duration-[140ms]',
            tab.isActive
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground',
          )}
        >
          {tab.label}
          <span
            className={cn(
              'rounded-[5px] px-1.5 py-px text-xs font-bold',
              tab.isActive ? 'text-primary bg-(--verde-primario)' : COUNT_IDLE,
            )}
          >
            {tab.count}
          </span>
        </Link>
      ))}
    </nav>
  );
}
