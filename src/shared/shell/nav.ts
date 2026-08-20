import { strings } from '@/shared/i18n/strings';
import { Grid, type Icon } from '@/shared/ui/icons';

export interface NavItem {
  readonly href: '/';
  readonly label: string;
  readonly icon: Icon;
}

export const mainNav: readonly NavItem[] = [{ href: '/', label: strings.nav.summary, icon: Grid }];
