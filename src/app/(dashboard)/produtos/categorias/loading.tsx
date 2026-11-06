import { Skeleton } from '@/shared/ui/skeleton';

const STAT_PLACEHOLDERS = ['active', 'subcategories', 'products', 'uncategorized'] as const;
const ROW_PLACEHOLDERS = ['first', 'second', 'third', 'fourth'] as const;

export default function CategoriesLoading() {
  return (
    <>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-9 w-40 rounded-[10px]" />
      </div>
      <div className="mb-5 grid grid-cols-4 gap-3.5 max-[1080px]:grid-cols-2">
        {STAT_PLACEHOLDERS.map((key) => (
          <Skeleton key={key} className="h-[86px] rounded-(--radius)" />
        ))}
      </div>
      <div className="grid grid-cols-[1.5fr_1fr] items-start gap-4 max-[880px]:grid-cols-1">
        <div className="flex flex-col gap-[9px]">
          {ROW_PLACEHOLDERS.map((key) => (
            <Skeleton key={key} className="h-[66px] rounded-(--radius)" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-(--radius)" />
      </div>
    </>
  );
}
