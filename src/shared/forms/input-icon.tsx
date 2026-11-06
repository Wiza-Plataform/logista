import type { ReactNode } from 'react';

import type { Icon } from '@/shared/ui/icons';

export function InputIcon({ icon: Glyph, children }: { icon: Icon; children: ReactNode }) {
  return (
    <span className="group/input-icon relative block">
      {children}
      <Glyph
        className="pointer-events-none absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-[var(--txt-faint)] transition-colors duration-200 group-focus-within/input-icon:text-[var(--accent-text)]"
        strokeWidth={1.8}
      />
    </span>
  );
}
