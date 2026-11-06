import { getCurrentStore } from '@/shared/session/api';
import { currentMerchantOrNull } from '@/shared/session/guards';
import { Skeleton } from '@/shared/ui/skeleton';

import { AccountMenu } from './account-menu';
import { initials, shortName } from './merchant-identity';

export async function TopbarAccount() {
  const merchant = await currentMerchantOrNull();
  const store = merchant === null ? null : await getCurrentStore().catch(() => null);
  if (merchant === null || store === null) return null;

  const { fullName, email } = merchant.account;

  return (
    <AccountMenu
      name={shortName(fullName)}
      initials={initials(fullName)}
      email={email}
      storeName={store.name}
    />
  );
}

export function TopbarAccountSkeleton() {
  return (
    <div className="flex items-center gap-[9px] py-[5px] pr-1.5 pl-[5px]">
      <Skeleton className="size-[30px] rounded-[8px]" />
      <div className="flex flex-col gap-1.5 max-[680px]:hidden">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-2.5 w-14" />
      </div>
    </div>
  );
}
