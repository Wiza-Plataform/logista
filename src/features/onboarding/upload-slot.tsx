'use client';

import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export function UploadSlot({
  isFilled,
  fill,
  label,
  className,
  onToggle,
  children,
}: {
  isFilled: boolean;
  fill: string | undefined;
  label: string;
  className: string;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isFilled}
      onClick={onToggle}
      style={isFilled && fill !== undefined ? { background: fill } : undefined}
      className={cn(
        'bg-card grid place-items-center gap-1.25 transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none',
        isFilled
          ? 'border-border border-solid text-white'
          : 'border-border text-[var(--txt-faint)] hover:border-ring hover:text-muted-foreground border-dashed',
        className,
      )}
    >
      {children}
    </button>
  );
}
