import { Skeleton } from '@/shared/ui/skeleton';

export default function CustomizeStoreLoading() {
  return (
    <div className="grid h-dvh grid-cols-[64px_296px_minmax(0,1fr)_344px] grid-rows-[60px_minmax(0,1fr)] gap-px max-[1239px]:grid-cols-[64px_minmax(0,1fr)] max-[899px]:grid-cols-[minmax(0,1fr)]">
      <Skeleton className="col-span-full rounded-none" />
      <Skeleton className="rounded-none max-[899px]:hidden" />
      <Skeleton className="rounded-none max-[1239px]:hidden" />
      <Skeleton className="rounded-none" />
      <Skeleton className="rounded-none max-[1239px]:hidden" />
    </div>
  );
}
