import type { Route } from 'next';
import type { ReactNode } from 'react';

import { LinkRow } from '@/shared/blocks/row-link';
import { cn } from '@/shared/lib/utils';

export type CellAlign = 'left' | 'center' | 'right';

interface CellProps {
  readonly align?: CellAlign;
  readonly children?: ReactNode;
}

function alignClass(align: CellAlign): string {
  switch (align) {
    case 'left':
      return 'text-left';
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
  }
}

export function DataTable({
  head,
  children,
}: {
  readonly head: ReactNode;
  readonly children: ReactNode;
}) {
  return (
    <div className="w-full overflow-x-auto max-[560px]:hidden">
      <table className="w-full min-w-[740px] border-collapse">
        <thead>
          <tr>{head}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function HeadCell({ align = 'left', children }: CellProps) {
  return (
    <th
      className={cn(
        'border-border text-label border-b bg-(--thead-bg) px-4 py-[11px] font-semibold tracking-[0.07em] whitespace-nowrap text-(--txt-faint) uppercase',
        alignClass(align),
      )}
    >
      {children}
    </th>
  );
}

const BODY_ROW = 'hover:bg-muted transition-colors duration-[120ms] [&:last-child>td]:border-b-0';

export function BodyRow({
  href,
  children,
}: {
  readonly href?: Route | undefined;
  readonly children: ReactNode;
}) {
  if (href !== undefined) {
    return (
      <LinkRow href={href} className={BODY_ROW}>
        {children}
      </LinkRow>
    );
  }
  return <tr className={BODY_ROW}>{children}</tr>;
}

export function BodyCell({ align = 'left', children }: CellProps) {
  return (
    <td
      className={cn(
        'border-b border-(--border-soft) px-4 py-[11px] align-middle',
        alignClass(align),
      )}
    >
      {children}
    </td>
  );
}
