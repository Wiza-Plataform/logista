import { Panel, PanelToolbar } from '@/shared/blocks/panel';
import { StatGrid } from '@/shared/blocks/stat-card';
import { Skeleton } from '@/shared/ui/skeleton';

const STAT_PLACEHOLDERS = ['total', 'published', 'low', 'value'] as const;
const ROW_PLACEHOLDERS = ['first', 'second', 'third', 'fourth', 'fifth'] as const;

export default function ProductsLoading() {
  return (
    <>
      <div className="mb-5 flex flex-col gap-2">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-56" />
      </div>
      <StatGrid>
        {STAT_PLACEHOLDERS.map((key) => (
          <Skeleton key={key} className="h-[108px] rounded-(--radius)" />
        ))}
      </StatGrid>
      <Panel>
        <PanelToolbar>
          <Skeleton className="h-8 w-80" />
          <Skeleton className="h-9 w-60" />
        </PanelToolbar>
        <div className="flex flex-col gap-3 p-4">
          {ROW_PLACEHOLDERS.map((key) => (
            <Skeleton key={key} className="h-[42px]" />
          ))}
        </div>
      </Panel>
    </>
  );
}
