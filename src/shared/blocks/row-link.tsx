'use client';

import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

const INTERACTIVE = 'a, button, input, select, textarea, label';

interface RowLinkProps {
  readonly href: Route;
  readonly className: string;
  readonly children: ReactNode;
}

function useOpenOnClick(href: Route) {
  const router = useRouter();

  return (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest(INTERACTIVE) !== null) return;
    if (event.metaKey || event.ctrlKey) {
      window.open(href, '_blank', 'noopener');
      return;
    }
    router.push(href);
  };
}

export function LinkRow({ href, className, children }: RowLinkProps) {
  const open = useOpenOnClick(href);
  return (
    <tr onClick={open} className={cn(className, 'cursor-pointer')}>
      {children}
    </tr>
  );
}

export function LinkCard({ href, className, children }: RowLinkProps) {
  const open = useOpenOnClick(href);
  return (
    <div onClick={open} className={cn(className, 'cursor-pointer')}>
      {children}
    </div>
  );
}
