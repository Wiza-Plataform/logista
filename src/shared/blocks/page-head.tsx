import type { ReactNode } from 'react';

interface PageHeadProps {
  readonly title: string;
  readonly subtitle?: ReactNode;
  readonly actions?: ReactNode;
}

export function PageHead({ title, subtitle, actions }: PageHeadProps) {
  return (
    <header className="mb-5 flex flex-wrap items-end justify-between gap-[18px]">
      <div>
        <h1 className="text-h1 leading-[1.05] font-bold tracking-[-0.4px] max-[560px]:text-[22px]">
          {title}
        </h1>
        {subtitle === undefined ? null : (
          <p className="text-note text-muted-foreground mt-1 [&_b]:font-semibold [&_b]:text-(--accent-text)">
            {subtitle}
          </p>
        )}
      </div>
      {actions === undefined ? null : (
        <div className="flex shrink-0 gap-[9px] max-[560px]:w-full">{actions}</div>
      )}
    </header>
  );
}
