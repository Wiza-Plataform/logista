'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { strings } from '@/shared/i18n/strings';
import { signOutAction } from '@/shared/session/actions';
import { ArrowLeft } from '@/shared/ui/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/shared/ui/sidebar';

import { BrandSymbol } from './brand-symbol';
import { mainNav, type NavLinkEntry } from './nav';
import { NAV_ITEM_CLASS } from './nav-item-style';
import { NavSection } from './nav-section';

function NavLink({ item, isActive }: { item: NavLinkEntry; isActive: boolean }) {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={item.href} />}
        isActive={isActive}
        tooltip={item.label}
        className={NAV_ITEM_CLASS}
        onClick={() => {
          setOpenMobile(false);
        }}
      >
        <item.icon strokeWidth={1.7} />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SignOutButton() {
  return (
    <SidebarMenuItem>
      <form action={signOutAction}>
        <SidebarMenuButton type="submit" tooltip={strings.nav.signOut} className={NAV_ITEM_CLASS}>
          <ArrowLeft strokeWidth={1.7} />
          <span>{strings.nav.signOut}</span>
        </SidebarMenuButton>
      </form>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 flex-row items-center gap-2 px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <BrandSymbol className="size-6" />
        <span className="text-primary truncate text-lg font-bold tracking-tight group-data-[collapsible=icon]:hidden">
          {strings.app.name}
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{strings.nav.mainMenu}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((entry) =>
                entry.kind === 'link' ? (
                  <NavLink key={entry.href} item={entry} isActive={pathname === entry.href} />
                ) : (
                  <NavSection key={entry.basePath} section={entry} pathname={pathname} />
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SignOutButton />
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
