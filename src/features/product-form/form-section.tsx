import type { ReactNode } from 'react';

import { FieldState } from '@/shared/ui/field';

export const SECTION_INPUT = 'bg-background';

interface FormSectionProps {
  readonly title: string;
  readonly note?: string;
  readonly error?: string | undefined;
  readonly children: ReactNode;
}

export function FormSection({ title, note, error, children }: FormSectionProps) {
  return (
    <section className="bg-card border-border min-w-0 rounded-[12px] border p-4">
      <h2 className="text-note mb-[13px] flex items-center gap-[7px] font-semibold">
        {title}
        {note === undefined ? null : (
          <span className="text-xs font-medium text-(--txt-faint)">{note}</span>
        )}
      </h2>
      {children}
      {error === undefined ? null : <FieldState tone="negative" text={error} />}
    </section>
  );
}
