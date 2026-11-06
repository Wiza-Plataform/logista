'use client';

import { Menu } from '@base-ui/react/menu';

import { strings } from '@/shared/i18n/strings';
import { signOutAction } from '@/shared/session/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ChevronDown, SignOut } from '@/shared/ui/icons';

import { UserAvatar } from './user-avatar';

interface AccountMenuProps {
  readonly name: string;
  readonly initials: string;
  readonly email: string;
  readonly storeName: string;
}

const PANEL_CLASS =
  'bg-card border-border w-80 rounded-[12px] border p-0 shadow-(--shadow) ring-0 transition-[opacity,translate] duration-[160ms] data-ending-style:-translate-y-1.5 data-ending-style:opacity-0 data-starting-style:-translate-y-1.5 data-starting-style:opacity-0';

function AccountTrigger({ name, initials, storeName }: Omit<AccountMenuProps, 'email'>) {
  return (
    <DropdownMenuTrigger className="hover:bg-muted data-popup-open:bg-muted focus-visible:ring-ring flex items-center gap-[9px] rounded-[10px] py-[5px] pr-1.5 pl-[5px] text-left outline-none transition-colors focus-visible:ring-2">
      <UserAvatar initials={initials} size="sm" />
      <span className="flex flex-col max-[680px]:sr-only">
        <span className="text-note text-foreground leading-[1.15] font-semibold">{name}</span>
        <span className="text-muted-foreground text-xs">{storeName}</span>
      </span>
      <ChevronDown className="size-[15px] text-(--txt-faint)" strokeWidth={2} />
    </DropdownMenuTrigger>
  );
}

function AccountHeader({ name, initials, email }: Omit<AccountMenuProps, 'storeName'>) {
  return (
    <div className="flex items-center gap-[11px] p-[14px]">
      <UserAvatar initials={initials} size="lg" />
      <div className="min-w-0">
        <div className="text-note text-foreground font-bold">{name}</div>
        <div className="mt-px truncate text-xs text-(--txt-faint)">{email}</div>
      </div>
    </div>
  );
}

function SignOutItem() {
  return (
    <form action={signOutAction}>
      <Menu.Item
        nativeButton
        render={<button type="submit" />}
        className="data-highlighted:bg-muted flex w-full cursor-pointer items-center gap-2.5 px-[14px] py-2.5 text-left text-sm font-medium text-(--st-cancel-fg) outline-none transition-colors duration-[120ms]"
      >
        <SignOut className="size-[15px] shrink-0" strokeWidth={1.9} />
        {strings.nav.signOut}
      </Menu.Item>
    </form>
  );
}

export function AccountMenu({ name, initials, email, storeName }: AccountMenuProps) {
  return (
    <DropdownMenu>
      <AccountTrigger name={name} initials={initials} storeName={storeName} />
      <DropdownMenuContent align="end" sideOffset={8} className={PANEL_CLASS}>
        <AccountHeader name={name} initials={initials} email={email} />
        <DropdownMenuSeparator className="bg-border mx-0 my-[5px]" />
        <SignOutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
