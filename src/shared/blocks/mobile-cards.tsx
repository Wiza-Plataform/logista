import type { Route } from 'next';
import type { ReactNode } from 'react';

import { LinkCard } from '@/shared/blocks/row-link';

export interface MobileCardField {
  readonly label: string;
  readonly value: ReactNode;
}

export function MobileCardList({ children }: { readonly children: ReactNode }) {
  return <div className="hidden flex-col gap-[11px] p-[13px] max-[560px]:flex">{children}</div>;
}

const CARD = 'bg-muted border-border rounded-[12px] border p-[13px]';

function CardFrame({
  href,
  children,
}: {
  readonly href: Route | undefined;
  readonly children: ReactNode;
}) {
  if (href === undefined) return <div className={CARD}>{children}</div>;
  return (
    <LinkCard href={href} className={CARD}>
      {children}
    </LinkCard>
  );
}

export function MobileCard({
  top,
  fields,
  href,
}: {
  readonly top: ReactNode;
  readonly fields: readonly MobileCardField[];
  readonly href?: Route | undefined;
}) {
  return (
    <CardFrame href={href}>
      <div className="mb-3 flex items-center gap-[11px]">{top}</div>
      <div className="border-border mt-px flex justify-between gap-2.5 border-t py-2.5">
        {fields.map((field) => (
          <div key={field.label}>
            <div className="text-label mb-[3px] tracking-[0.05em] text-(--txt-faint) uppercase">
              {field.label}
            </div>
            <div className="text-step font-bold">{field.value}</div>
          </div>
        ))}
      </div>
    </CardFrame>
  );
}
