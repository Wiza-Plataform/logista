import { Panel } from '@/shared/blocks/panel';
import { Skeleton } from '@/shared/ui/skeleton';

const ROW_PLACEHOLDERS = ['first', 'second', 'third'] as const;

export default function UnitsLoading() {
  return (
    <>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-36 rounded-[10px]" />
      </div>
      <Panel>
        <div className="flex flex-col gap-3 p-4">
          {ROW_PLACEHOLDERS.map((key) => (
            <Skeleton key={key} className="h-8" />
          ))}
        </div>
      </Panel>
    </>
  );
}
