import { cn } from '@/shared/lib/utils';

import { Stage } from './art-stage';

const FAINT = 'bg-(--txt-faint)';
const ON_ACCENT_INK = 'block h-1 rounded-[2px] bg-(--verde-primario)';
const ON_ACCENT_SOFT = 'block h-[3px] rounded-[2px] bg-(--verde-primario)/45';

function Dot() {
  return <span className="bg-primary size-[7px] rounded-[2px]" />;
}

export function HeaderLeftArt() {
  return (
    <Stage className="px-1.5">
      <span className="bg-card flex h-4 w-full items-center gap-[3px] rounded-[4px] px-1">
        <Dot />
        <span className={cn('h-0.5 w-2', FAINT)} />
        <span className={cn('h-0.5 w-2', FAINT)} />
        <span className="flex-1" />
        <span className="bg-foreground size-1 rounded-full" />
      </span>
    </Stage>
  );
}

export function HeaderCenterArt() {
  return (
    <Stage className="px-1.5">
      <span className="bg-card flex h-[22px] w-full flex-col items-center justify-center gap-[3px] rounded-[4px]">
        <Dot />
        <span className="flex gap-[3px]">
          <span className={cn('h-0.5 w-1.5', FAINT)} />
          <span className={cn('h-0.5 w-1.5', FAINT)} />
          <span className={cn('h-0.5 w-1.5', FAINT)} />
        </span>
      </span>
    </Stage>
  );
}

export function HeaderCompactArt() {
  return (
    <Stage className="px-1.5">
      <span className="bg-card flex h-4 w-full items-center gap-[3px] rounded-[4px] px-1">
        <Dot />
        <span className="bg-muted h-[7px] flex-1 rounded-[4px]" />
        <span className="bg-foreground size-1 rounded-full" />
      </span>
    </Stage>
  );
}

export function BannerOverlayArt() {
  return (
    <span className="bg-primary relative flex h-[46px] flex-col justify-center gap-[3px] overflow-hidden rounded-[8px] px-2">
      <span className="absolute -right-2 -bottom-2.5 size-[30px] rounded-full bg-white/50" />
      <span className={cn(ON_ACCENT_INK, 'w-[26px]')} />
      <span className={cn(ON_ACCENT_SOFT, 'w-[18px]')} />
    </span>
  );
}

export function BannerSplitArt() {
  return (
    <span className="grid h-[46px] grid-cols-2 overflow-hidden rounded-[8px]">
      <span className="bg-primary flex flex-col justify-center gap-[3px] pl-1.5">
        <span className={cn(ON_ACCENT_INK, 'w-5')} />
        <span className={cn(ON_ACCENT_SOFT, 'w-3.5')} />
      </span>
      <span className="bg-primary/40" />
    </span>
  );
}

export function BannerTextArt() {
  return (
    <span className="bg-primary flex h-[46px] flex-col items-center justify-center gap-[3px] rounded-[8px]">
      <span className={cn(ON_ACCENT_INK, 'w-7')} />
      <span className={cn(ON_ACCENT_SOFT, 'w-[18px]')} />
    </span>
  );
}
