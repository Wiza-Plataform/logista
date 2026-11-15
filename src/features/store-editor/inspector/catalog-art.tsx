import { cn } from '@/shared/lib/utils';

import { Stage } from './art-stage';

const LINE_SOFT = 'block h-[3px] rounded-[2px] bg-foreground/45';
const FAINT = 'bg-(--txt-faint)';
const TILE = 'rounded-[3px] bg-(--txt-faint)';

export function CategoryChipsArt() {
  return (
    <Stage className="justify-center gap-[3px]">
      <span className="bg-primary h-[9px] w-[18px] rounded-[5px]" />
      <span className="h-[9px] w-4 rounded-[5px] shadow-[inset_0_0_0_1px_var(--txt-faint)]" />
      <span className="h-[9px] w-3.5 rounded-[5px] shadow-[inset_0_0_0_1px_var(--txt-faint)]" />
    </Stage>
  );
}

export function CategoryTabsArt() {
  return (
    <Stage className="justify-center gap-[5px]">
      <span className="bg-foreground h-[3px] w-3.5 shadow-[0_4px_0_var(--txt)]" />
      <span className={cn('h-[3px] w-3.5', FAINT)} />
      <span className={cn('h-[3px] w-3.5', FAINT)} />
    </Stage>
  );
}

export function CategoryIconsArt() {
  return (
    <Stage className="justify-center gap-1">
      <span className="bg-primary size-[13px] rounded-full" />
      <span className={cn('size-[13px] rounded-full', FAINT)} />
      <span className={cn('size-[13px] rounded-full', FAINT)} />
    </Stage>
  );
}

export function ProductGridArt() {
  return (
    <span className="bg-muted grid h-14 grid-cols-3 grid-rows-2 gap-1 rounded-[8px] p-[7px]">
      {[0, 1, 2, 3, 4, 5].map((tile) => (
        <span key={tile} className={TILE} />
      ))}
    </span>
  );
}

export function ProductListArt() {
  return (
    <span className="bg-muted flex h-14 flex-col justify-center gap-1 rounded-[8px] p-[7px]">
      {[0, 1, 2].map((row) => (
        <span key={row} className="flex items-center gap-1">
          <span className={cn('size-2.5', TILE)} />
          <span className={cn('h-[3px] flex-1 rounded-[2px]', FAINT)} />
        </span>
      ))}
    </span>
  );
}

export function ProductCarouselArt() {
  return (
    <span className="bg-muted flex h-14 gap-1 overflow-hidden rounded-[8px] py-[7px] pl-[7px]">
      {[0, 1, 2].map((tile) => (
        <span key={tile} className={cn('flex-[0_0_34%]', TILE)} />
      ))}
    </span>
  );
}

export function ProductFeaturedArt() {
  return (
    <span className="bg-muted grid h-14 grid-cols-4 grid-rows-2 gap-1 rounded-[8px] p-[7px]">
      <span className="bg-primary col-span-2 row-span-2 rounded-[3px]" />
      {[0, 1, 2, 3].map((tile) => (
        <span key={tile} className={TILE} />
      ))}
    </span>
  );
}

export function CardPlainArt() {
  return (
    <Stage tall className="flex-col justify-center gap-[3px]">
      <span className={cn('h-6 w-[26px]', TILE)} />
      <span className={cn(LINE_SOFT, 'w-[22px]')} />
      <span className="bg-primary block h-[3px] w-3.5 rounded-[2px]" />
    </Stage>
  );
}

export function CardBoxArt() {
  return (
    <Stage tall className="justify-center">
      <span className="bg-card flex w-[30px] flex-col gap-[3px] overflow-hidden rounded-[4px] pb-1 shadow-[inset_0_0_0_1px_var(--border)]">
        <span className={cn('h-[22px]', FAINT)} />
        <span className={cn(LINE_SOFT, 'ml-1 w-[18px]')} />
        <span className="bg-primary ml-1 block h-[3px] w-3 rounded-[2px]" />
      </span>
    </Stage>
  );
}

export function CardOverlayArt() {
  return (
    <Stage tall className="justify-center">
      <span className="flex h-10 w-[30px] flex-col justify-end gap-[3px] rounded-[4px] bg-(--txt-dim) p-1">
        <span className="block h-[3px] w-[18px] rounded-[2px] bg-white" />
        <span className="block h-[3px] w-3 rounded-[2px] bg-white" />
      </span>
    </Stage>
  );
}
