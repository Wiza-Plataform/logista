import type { ReactNode } from 'react';

const FRAME = 'flex h-28 flex-col gap-[5px] overflow-hidden rounded-[9px] bg-muted p-2';
const BAR = 'block rounded-[2px]';
const TILE = 'rounded-[4px] bg-card shadow-[inset_0_0_0_1px_var(--border)]';
const SOLID = 'bg-(--txt-faint)';

function Frame({ children }: { readonly children: ReactNode }) {
  return (
    <span aria-hidden="true" className={FRAME}>
      {children}
    </span>
  );
}

export function ShowcaseArt() {
  return (
    <Frame>
      <span className="flex items-center gap-1">
        <span className="bg-primary size-[9px] rounded-[3px]" />
        <span className={`${BAR} h-[3px] w-[26px] ${SOLID}`} />
        <span className="flex-1" />
        <span className={`${BAR} h-[3px] w-[18px] ${SOLID}`} />
      </span>
      <span className="bg-primary flex h-9 items-center rounded-[5px] pl-2">
        <span className={`${BAR} bg-foreground h-[5px] w-12`} />
      </span>
      <span className="grid flex-1 grid-cols-3 gap-1">
        <span className={TILE} />
        <span className={TILE} />
        <span className={TILE} />
      </span>
    </Frame>
  );
}

export function BoutiqueArt() {
  return (
    <Frame>
      <span className="flex justify-center">
        <span className={`${BAR} bg-foreground h-1 w-[34px]`} />
      </span>
      <span className="grid h-9 grid-cols-2 overflow-hidden rounded-[5px]">
        <span className="bg-card flex flex-col justify-center gap-[3px] pl-1.5">
          <span className={`${BAR} bg-foreground h-1 w-[34px]`} />
          <span className={`${BAR} h-[3px] w-6 ${SOLID}`} />
        </span>
        <span className="bg-(--hover)" />
      </span>
      <span className="grid flex-1 grid-cols-4 grid-rows-2 gap-1">
        <span className="bg-border col-span-2 row-span-2" />
        <span className="bg-border" />
        <span className="bg-border" />
        <span className="bg-border" />
        <span className="bg-border" />
      </span>
    </Frame>
  );
}

function ListRow({ width }: { readonly width: string }) {
  return (
    <span className="bg-card flex items-center gap-[5px] rounded-[5px] p-1">
      <span className="bg-border size-4 rounded-[4px]" />
      <span className={`${BAR} h-[3px] ${SOLID}`} style={{ width }} />
    </span>
  );
}

export function CatalogArt() {
  return (
    <Frame>
      <span className="flex items-center gap-1">
        <span className="bg-primary size-[9px] rounded-[3px]" />
        <span className={`h-[9px] flex-1 ${TILE}`} />
      </span>
      <span className="flex flex-col items-center gap-[3px] py-1">
        <span className={`${BAR} bg-foreground h-1 w-14`} />
        <span className={`${BAR} h-[3px] w-[38px] ${SOLID}`} />
      </span>
      <ListRow width="40px" />
      <ListRow width="30px" />
      <ListRow width="46px" />
    </Frame>
  );
}

export function VibrantArt() {
  return (
    <Frame>
      <span className="flex justify-center">
        <span className={`${BAR} bg-foreground h-1 w-[30px]`} />
      </span>
      <span className="flex justify-center gap-2">
        <span className="bg-primary size-4 rounded-full" />
        <span className="bg-border size-4 rounded-full" />
        <span className="bg-border size-4 rounded-full" />
        <span className="bg-border size-4 rounded-full" />
      </span>
      <span className="flex flex-1 gap-[5px]">
        <span className="bg-foreground/80 flex-[0_0_38%] rounded-[8px]" />
        <span className="bg-foreground/55 flex-[0_0_38%] rounded-[8px]" />
        <span className="bg-foreground/30 flex-[0_0_38%] rounded-[8px]" />
      </span>
    </Frame>
  );
}
