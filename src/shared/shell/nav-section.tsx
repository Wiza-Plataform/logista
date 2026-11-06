'use client';

import { Menu } from '@base-ui/react/menu';
import Link from 'next/link';
import { useId, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { ChevronDown, ChevronRight } from '@/shared/ui/icons';
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shared/ui/sidebar';

import { isInSection } from './nav';
import type { NavLink, NavSectionEntry } from './nav';
import { NAV_ITEM_CLASS, NAV_SUB_DOT_CLASS, NAV_SUB_LINK_CLASS } from './nav-item-style';

const HOVER_OPEN_DELAY_MS = 60;
const HOVER_CLOSE_DELAY_MS = 160;
const FLYOUT_GAP = 12;

interface NavSectionProps {
  readonly section: NavSectionEntry;
  readonly pathname: string;
}

function SectionLabel({ section }: { readonly section: NavSectionEntry }) {
  const Glyph = section.icon;
  return (
    <>
      <Glyph strokeWidth={1.7} />
      <span>{section.label}</span>
    </>
  );
}

function FlyoutLink({ link, isCurrent }: { readonly link: NavLink; readonly isCurrent: boolean }) {
  return (
    <Menu.LinkItem
      closeOnClick
      render={<Link href={link.href} />}
      aria-current={isCurrent ? 'page' : undefined}
      className={cn('group/sub', NAV_SUB_LINK_CLASS)}
    >
      <span aria-hidden="true" className={NAV_SUB_DOT_CLASS} />
      {link.label}
    </Menu.LinkItem>
  );
}

function NavSectionFlyout({ section, pathname }: NavSectionProps) {
  return (
    <SidebarMenuItem>
      <Menu.Root modal={false}>
        <Menu.Trigger
          openOnHover
          delay={HOVER_OPEN_DELAY_MS}
          closeDelay={HOVER_CLOSE_DELAY_MS}
          render={
            <SidebarMenuButton
              isActive={isInSection(pathname, section)}
              className={NAV_ITEM_CLASS}
            />
          }
        >
          <SectionLabel section={section} />
          <ChevronRight
            className="ml-auto size-[14px]! opacity-70 group-data-[collapsible=icon]:hidden"
            strokeWidth={2}
          />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner side="right" align="start" sideOffset={FLYOUT_GAP} className="z-50">
            <Menu.Popup className="bg-sidebar border-border flex w-[220px] flex-col gap-px rounded-[12px] border p-2 shadow-(--shadow) outline-none transition-[opacity,translate] duration-[160ms] data-ending-style:-translate-x-1 data-ending-style:opacity-0 data-starting-style:-translate-x-1 data-starting-style:opacity-0">
              <div className="text-label px-[11px] pt-1 pb-1.5 font-semibold tracking-[0.15em] text-(--txt-faint) uppercase">
                {section.label}
              </div>
              {section.links.map((link) => (
                <FlyoutLink key={link.href} link={link} isCurrent={pathname === link.href} />
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </SidebarMenuItem>
  );
}

function NavSectionAccordion({ section, pathname }: NavSectionProps) {
  const { setOpenMobile } = useSidebar();
  const [isExpanded, setExpanded] = useState(() => isInSection(pathname, section));
  const listId = useId();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isInSection(pathname, section)}
        aria-expanded={isExpanded}
        aria-controls={listId}
        onClick={() => {
          setExpanded(!isExpanded);
        }}
        className={NAV_ITEM_CLASS}
      >
        <SectionLabel section={section} />
        <ChevronDown
          className={cn(
            'ml-auto size-[14px]! opacity-70 transition-transform duration-200',
            isExpanded && 'rotate-180',
          )}
          strokeWidth={2}
        />
      </SidebarMenuButton>
      {isExpanded ? (
        <ul id={listId} className="mt-px mb-[3px] flex flex-col gap-px">
          {section.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                onClick={() => {
                  setOpenMobile(false);
                }}
                className={cn(
                  'group/sub border-border ml-[13px] rounded-l-none border-l pl-[22px] aria-[current=page]:border-(--lima-oliva)',
                  NAV_SUB_LINK_CLASS,
                )}
              >
                <span aria-hidden="true" className={NAV_SUB_DOT_CLASS} />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </SidebarMenuItem>
  );
}

export function NavSection({ section, pathname }: NavSectionProps) {
  const { isMobile } = useSidebar();
  return isMobile ? (
    <NavSectionAccordion section={section} pathname={pathname} />
  ) : (
    <NavSectionFlyout section={section} pathname={pathname} />
  );
}
