import Link from 'next/link';

import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { Arrow } from '@/shared/ui/icons';

import type { ScreenTile } from './screens';

const CARD_CLASS = 'relative flex flex-col gap-2.25 overflow-hidden rounded-lg border p-3.75';

function TileIcon({ tile }: { tile: ScreenTile }) {
  return (
    <div
      className="grid size-8.5 shrink-0 place-items-center rounded-[9px]"
      style={{ background: tile.iconBackground, color: tile.iconColor }}
    >
      <tile.icon className="size-4.5" strokeWidth={1.7} />
    </div>
  );
}

function TileText({ tile }: { tile: ScreenTile }) {
  return (
    <>
      <div className="text-body leading-[1.25] font-semibold">{tile.title}</div>
      <div className="text-muted-foreground text-xs leading-[1.45]">{tile.description}</div>
    </>
  );
}

export function TileCard({ tile }: { tile: ScreenTile }) {
  if (tile.route === null) {
    return (
      <div className={cn(CARD_CLASS, 'border-border bg-card opacity-60')}>
        <TileIcon tile={tile} />
        <span className="absolute top-2.75 right-2.75 rounded-[5px] bg-[var(--st-wait-bg)] px-1.5 py-0.5 text-[9px] font-bold tracking-[0.04em] text-[var(--st-wait-fg)]">
          {strings.screenIndex.soon}
        </span>
        <TileText tile={tile} />
      </div>
    );
  }

  return (
    <Link
      href={tile.route}
      className={cn(
        CARD_CLASS,
        'border-border bg-card transition-[transform,border-color,box-shadow] duration-[140ms] hover:-translate-y-[3px] hover:border-[var(--lima-oliva)] hover:shadow-[var(--shadow)]',
      )}
    >
      <TileIcon tile={tile} />
      <TileText tile={tile} />
      <span className="mt-auto inline-flex items-center gap-1.25 text-xs font-semibold text-[var(--accent-text)]">
        {strings.screenIndex.open}
        <Arrow className="size-3.25" strokeWidth={2.2} />
      </span>
    </Link>
  );
}
