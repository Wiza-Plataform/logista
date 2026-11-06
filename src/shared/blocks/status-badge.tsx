import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export type StatusTone = 'wait' | 'paid' | 'ship' | 'done' | 'cancel';

function toneClass(tone: StatusTone): string {
  switch (tone) {
    case 'wait':
      return 'bg-(--st-wait-bg) text-(--st-wait-fg)';
    case 'paid':
      return 'bg-(--st-paid-bg) text-(--st-paid-fg)';
    case 'ship':
      return 'bg-(--st-ship-bg) text-(--st-ship-fg)';
    case 'done':
      return 'bg-(--st-done-bg) text-(--st-done-fg)';
    case 'cancel':
      return 'bg-(--st-cancel-bg) text-(--st-cancel-fg)';
  }
}

export function StatusBadge({
  tone,
  children,
}: {
  readonly tone: StatusTone;
  readonly children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[5px] rounded-[7px] px-[9px] py-[3px] text-xs font-semibold whitespace-nowrap before:size-1.5 before:shrink-0 before:rounded-full before:bg-current before:content-[""]',
        toneClass(tone),
      )}
    >
      {children}
    </span>
  );
}
