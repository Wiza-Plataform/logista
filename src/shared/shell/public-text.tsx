import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export function PublicHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-h1 font-extrabold tracking-[-0.5px]">{title}</h1>
      <p className="text-muted-foreground text-body mt-1.25 leading-[1.5]">{subtitle}</p>
    </div>
  );
}

export function PublicNote({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn('mt-4.5 text-center text-sm leading-[1.6] text-[var(--txt-faint)]', className)}
    >
      {children}
    </p>
  );
}

export function PublicNoteLink({
  href,
  children,
}: {
  href: '/login' | '/onboarding';
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-sm font-semibold text-[var(--accent-text)] hover:underline focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      {children}
    </Link>
  );
}
