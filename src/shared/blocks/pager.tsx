import type { Route } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { ChevronLeft, ChevronRight } from '@/shared/ui/icons';

const VISIBLE_PAGES = 5;
const PAGE_BUTTON =
  'border-border bg-background text-note text-muted-foreground grid h-[30px] min-w-[30px] place-items-center rounded-[8px] border px-1 font-medium transition-colors duration-[140ms]';

interface PagerProps {
  readonly page: number;
  readonly pageSize: number;
  readonly shown: number;
  readonly total: number;
  readonly hrefFor: (page: number) => Route;
}

function visiblePages(page: number, lastPage: number): readonly number[] {
  const first = Math.max(1, Math.min(page - 2, lastPage - VISIBLE_PAGES + 1));
  const last = Math.min(lastPage, first + VISIBLE_PAGES - 1);
  return Array.from({ length: last - first + 1 }, (_, index) => first + index);
}

function PageLink({
  href,
  label,
  isCurrent = false,
  children,
}: {
  readonly href: Route | null;
  readonly label: string;
  readonly isCurrent?: boolean;
  readonly children: ReactNode;
}) {
  if (href === null) {
    return (
      <span aria-hidden="true" className={cn(PAGE_BUTTON, 'opacity-40')}>
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      scroll={false}
      aria-label={label}
      aria-current={isCurrent ? 'page' : undefined}
      className={cn(
        PAGE_BUTTON,
        isCurrent
          ? 'bg-primary text-primary-foreground border-(--lima)'
          : 'hover:text-foreground hover:border-ring',
      )}
    >
      {children}
    </Link>
  );
}

export function Pager({ page, pageSize, shown, total, hrefFor }: PagerProps) {
  const lastPage = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div className="text-muted-foreground text-sm [&_b]:font-semibold [&_b]:text-foreground">
        {strings.pager.showing} <b>{shown}</b> {strings.pager.of} <b>{total}</b>
      </div>
      <nav aria-label={strings.pager.page} className="flex items-center gap-[5px]">
        <PageLink href={page > 1 ? hrefFor(page - 1) : null} label={strings.pager.previous}>
          <ChevronLeft className="size-[15px]" strokeWidth={2} />
        </PageLink>
        {visiblePages(page, lastPage).map((number) => (
          <PageLink
            key={number}
            href={hrefFor(number)}
            label={`${strings.pager.page} ${String(number)}`}
            isCurrent={number === page}
          >
            {number}
          </PageLink>
        ))}
        <PageLink href={page < lastPage ? hrefFor(page + 1) : null} label={strings.pager.next}>
          <ChevronRight className="size-[15px]" strokeWidth={2} />
        </PageLink>
      </nav>
    </div>
  );
}
