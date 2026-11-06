import { Skeleton } from '@/shared/ui/skeleton';

const LEFT_SECTIONS = ['basics', 'photos', 'variations'] as const;
const RIGHT_SECTIONS = ['pricing', 'organization'] as const;

export function ProductFormSkeleton() {
  return (
    <>
      <div className="mb-5 flex flex-col gap-2.5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-56" />
      </div>
      <div className="grid grid-cols-[1.55fr_1fr] items-start gap-4 max-[1000px]:grid-cols-1">
        <div className="flex flex-col gap-3.5">
          {LEFT_SECTIONS.map((key) => (
            <Skeleton key={key} className="h-52 rounded-[12px]" />
          ))}
        </div>
        <div className="flex flex-col gap-3.5">
          {RIGHT_SECTIONS.map((key) => (
            <Skeleton key={key} className="h-44 rounded-[12px]" />
          ))}
        </div>
      </div>
    </>
  );
}
