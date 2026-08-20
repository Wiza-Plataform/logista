import { strings } from '@/shared/i18n/strings';

import type { ScreenGroup } from './screens';
import { TileCard } from './tile-card';

export function GroupSection({ group }: { group: ScreenGroup }) {
  const liveCount = group.tiles.filter((tile) => tile.route !== null).length;
  const unit = liveCount === 1 ? strings.screenIndex.screen : strings.screenIndex.screens;

  return (
    <section className="mb-8.5">
      <div className="mb-3.5 flex items-center gap-2.5">
        <div className="grid size-7.5 shrink-0 place-items-center rounded-[8px] bg-[var(--active-bg)] text-[var(--lima-oliva)] shadow-[inset_0_0_0_1px_var(--active-ring)]">
          <group.icon className="size-4" strokeWidth={1.8} />
        </div>
        <h2 className="text-[16px] font-bold tracking-[-0.2px]">{group.title}</h2>
        <span className="border-border ml-0.5 rounded-[6px] border bg-[var(--surface-2)] px-2 py-0.5 text-xs text-[var(--txt-faint)]">
          {liveCount} {unit}
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(216px,1fr))] gap-2.75">
        {group.tiles.map((tile) => (
          <TileCard key={`${group.title}-${tile.title}`} tile={tile} />
        ))}
      </div>
    </section>
  );
}
