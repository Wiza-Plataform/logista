import type { Route } from 'next';

import { strings } from '@/shared/i18n/strings';
import { Box, Grid, type Icon } from '@/shared/ui/icons';

export interface NavLink {
  readonly href: Route;
  readonly label: string;
}

export interface NavLinkEntry extends NavLink {
  readonly kind: 'link';
  readonly icon: Icon;
}

export interface NavSectionEntry {
  readonly kind: 'section';
  readonly label: string;
  readonly icon: Icon;
  readonly basePath: Route;
  readonly links: readonly NavLink[];
}

export type NavEntry = NavLinkEntry | NavSectionEntry;

export const mainNav: readonly NavEntry[] = [
  { kind: 'link', href: '/', label: strings.nav.summary, icon: Grid },
  {
    kind: 'section',
    label: strings.nav.products,
    icon: Box,
    basePath: '/produtos',
    links: [
      { href: '/produtos', label: strings.nav.productList },
      { href: '/produtos/novo', label: strings.nav.productCreate },
      { href: '/produtos/categorias', label: strings.nav.categories },
      { href: '/produtos/stock', label: strings.nav.stock },
      { href: '/produtos/unidades', label: strings.nav.units },
    ],
  },
];

export function isInSection(pathname: string, section: NavSectionEntry): boolean {
  return pathname === section.basePath || pathname.startsWith(`${section.basePath}/`);
}
