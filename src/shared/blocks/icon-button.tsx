import type { Route } from 'next';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import type { Icon } from '@/shared/ui/icons';

type IconButtonSize = 'compact' | 'regular';

interface IconButtonProps {
  readonly label: string;
  readonly icon: Icon;
  readonly onClick: () => void;
  readonly size?: IconButtonSize;
}

const COMPACT = { button: 'size-[30px] rounded-[8px]', glyph: 'size-[15px]' } as const;
const REGULAR = { button: 'size-[38px] rounded-[10px]', glyph: 'size-[18px]' } as const;

const FRAME =
  'bg-card border-border text-muted-foreground hover:text-foreground hover:border-ring inline-grid shrink-0 place-items-center border transition-colors duration-[140ms]';

export function IconButton({ label, icon: Glyph, onClick, size = 'compact' }: IconButtonProps) {
  const { button, glyph } = size === 'regular' ? REGULAR : COMPACT;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(FRAME, button)}
    >
      <Glyph className={glyph} strokeWidth={1.8} />
    </button>
  );
}

interface IconLinkProps {
  readonly label: string;
  readonly icon: Icon;
  readonly href: Route;
}

export function IconLink({ label, icon: Glyph, href }: IconLinkProps) {
  return (
    <Link href={href} aria-label={label} title={label} className={cn(FRAME, COMPACT.button)}>
      <Glyph className={COMPACT.glyph} strokeWidth={1.8} />
    </Link>
  );
}
