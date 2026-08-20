'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { strings } from '@/shared/i18n/strings';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/shared/ui/sidebar';

import { mainNav, type NavItem } from './nav';

const NAV_ITEM_CLASS =
  'h-auto gap-[11px] rounded-[9px] p-[9px_11px] text-[13.5px] font-medium data-active:font-semibold data-active:shadow-[inset_0_0_0_1px_var(--active-ring)] [&_svg]:size-[17px]';

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={item.href} />}
        isActive={isActive}
        tooltip={item.label}
        className={NAV_ITEM_CLASS}
      >
        <item.icon strokeWidth={1.7} />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 justify-center px-3">
        <span className="text-primary truncate text-lg font-bold tracking-tight">
          <span className="group-data-[collapsible=icon]:hidden">{strings.app.name}</span>
          <span className="hidden group-data-[collapsible=icon]:inline">W</span>
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{strings.nav.mainMenu}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <NavLink key={item.href} item={item} isActive={pathname === item.href} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
