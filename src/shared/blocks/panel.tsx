import type { ReactNode } from 'react';

export function Panel({ children }: { readonly children: ReactNode }) {
  return (
    <section className="bg-card border-border overflow-hidden rounded-(--radius) border max-[860px]:-mx-4 max-[860px]:rounded-none max-[860px]:border-x-0">
      {children}
    </section>
  );
}

export function PanelToolbar({ children }: { readonly children: ReactNode }) {
  return (
    <div className="border-border flex flex-wrap items-center justify-between gap-3.5 border-b px-[15px] py-[13px] max-[560px]:p-[13px]">
      {children}
    </div>
  );
}

export function NoResults({ children }: { readonly children: ReactNode }) {
  return (
    <div className="text-step text-muted-foreground px-5 py-[42px] text-center">{children}</div>
  );
}
