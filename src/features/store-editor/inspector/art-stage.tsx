import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export function Stage({
  tall = false,
  className,
  children,
}: {
  readonly tall?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'bg-muted flex items-center rounded-[8px] overflow-hidden',
        tall ? 'h-14' : 'h-[46px]',
        className,
      )}
    >
      {children}
    </span>
  );
}
