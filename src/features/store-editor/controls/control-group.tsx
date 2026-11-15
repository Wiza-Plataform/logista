import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export function GroupTitle({ children }: { readonly children: ReactNode }) {
  return (
    <span className="text-xs font-extrabold tracking-[0.08em] text-(--txt-dim)">{children}</span>
  );
}

export function ControlGroup({
  title,
  isLast = false,
  children,
}: {
  readonly title?: string;
  readonly isLast?: boolean;
  readonly children: ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-2.5 py-4', !isLast && 'border-b border-(--border-soft)')}>
      {title !== undefined && <GroupTitle>{title}</GroupTitle>}
      {children}
    </div>
  );
}

export function ControlHint({ children }: { readonly children: ReactNode }) {
  return <span className="text-caption leading-[1.45] text-(--txt-dim)">{children}</span>;
}

export function LinkButton({
  label,
  onClick,
}: {
  readonly label: string;
  readonly onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-note self-start font-bold text-(--accent-text) underline underline-offset-3 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none max-[899px]:min-h-11"
    >
      {label}
    </button>
  );
}
