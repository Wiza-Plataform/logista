import { Panel } from '@/shared/blocks/panel';
import { Skeleton } from '@/shared/ui/skeleton';

const ROW_PLACEHOLDERS = ['first', 'second', 'third', 'fourth', 'fifth'] as const;

export default function StockLoading() {
  return (
    <>
      <div className="mb-5 flex flex-col gap-2">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <Panel>
        <div className="border-border flex items-center justify-between gap-3 border-b p-[13px]">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-9 w-64" />
        </div>
        <div className="flex flex-col gap-3 p-4">
          {ROW_PLACEHOLDERS.map((key) => (
            <Skeleton key={key} className="h-9" />
          ))}
        </div>
      </Panel>
    </>
  );
}
