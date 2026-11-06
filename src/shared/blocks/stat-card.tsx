import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';
import type { Icon } from '@/shared/ui/icons';

interface StatCardProps {
  readonly label: string;
  readonly icon?: Icon;
  readonly value: string;
  readonly unit?: string;
  readonly meta?: string;
  readonly isHighlighted?: boolean;
}

export function StatGrid({ children }: { readonly children: ReactNode }) {
  return (
    <section className="mb-5 grid grid-cols-4 gap-3.5 max-[1080px]:grid-cols-2 max-[560px]:gap-[11px]">
      {children}
    </section>
  );
}

function StatIcon({
  icon: Glyph,
  isHighlighted,
}: {
  readonly icon: Icon;
  readonly isHighlighted: boolean;
}) {
  return (
    <span
      className={cn(
        'bg-secondary grid size-7 place-items-center rounded-[8px] text-(--lima-oliva)',
        isHighlighted && 'bg-primary text-primary-foreground',
      )}
    >
      <Glyph className="size-[15px]" strokeWidth={1.8} />
    </span>
  );
}

export function StatCard({ label, icon, value, unit, meta, isHighlighted = false }: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-card border-border relative overflow-hidden rounded-(--radius) border px-[15px] pt-[15px] pb-[13px]',
        isHighlighted &&
          'border-(--hl-border) bg-[image:var(--hl-grad)] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-(--lima) before:content-[""]',
      )}
    >
      <div className="mb-[11px] flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium tracking-[0.05em] uppercase">
          {label}
        </span>
        {icon === undefined ? null : <StatIcon icon={icon} isHighlighted={isHighlighted} />}
      </div>
      <div className="text-display leading-none font-bold tracking-[-0.8px] max-[560px]:text-[24px]">
        {value}
        {unit === undefined ? null : (
          <>
            {' '}
            <span className="text-step text-muted-foreground ml-0.5 font-semibold tracking-normal">
              {unit}
            </span>
          </>
        )}
      </div>
      {meta === undefined ? null : (
        <div className="text-fine text-muted-foreground mt-2">{meta}</div>
      )}
    </div>
  );
}
