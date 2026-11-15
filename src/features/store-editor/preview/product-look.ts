import type { CSSProperties } from 'react';

import type { ThemeSections } from '@/shared/contracts/store-theme';

import type { PreviewTheme } from './preview-theme';

type Products = ThemeSections['products'];

export interface ProductLook {
  readonly isList: boolean;
  readonly isCarousel: boolean;
  readonly isFeatured: boolean;
  readonly isOverlay: boolean;
  readonly isCard: boolean;
  readonly aspectRatio: string;
  readonly cardBackground: string;
  readonly priceColor: string;
  readonly nameColor: string;
}

function aspectOf(ratio: Products['imageRatio']): string {
  switch (ratio) {
    case 'square':
      return '1 / 1';
    case 'portrait':
      return '4 / 5';
    case 'tall':
      return '3 / 4';
  }
}

function cardBackgroundOf(scheme: Products['colorScheme'], theme: PreviewTheme): string {
  if (scheme === 'accent') {
    return `color-mix(in srgb, ${theme.preset.onPrimary} 10%, ${theme.preset.primary})`;
  }
  return scheme === 'dark' ? '#1C1F1A' : theme.tokens.card;
}

function priceColorOf(scheme: Products['colorScheme'], theme: PreviewTheme): string {
  if (scheme === 'accent') return theme.preset.onPrimary;
  return scheme === 'dark' ? theme.preset.priceOnDark : theme.tokens.price;
}

export function productLookOf(section: Products, theme: PreviewTheme): ProductLook {
  const isList = section.layout === 'list';
  const isOverlay = section.cardStyle === 'overlay' && !isList;
  const cardType = section.cardStyle === 'overlay' && isList ? 'card' : section.cardStyle;
  const colors = theme.schemeOf(section.colorScheme);

  return {
    isList,
    isCarousel: section.layout === 'carousel',
    isFeatured: section.layout === 'featured',
    isOverlay,
    isCard: cardType === 'card' && !isOverlay,
    aspectRatio: aspectOf(section.imageRatio),
    cardBackground: cardBackgroundOf(section.colorScheme, theme),
    priceColor: priceColorOf(section.colorScheme, theme),
    nameColor: isOverlay ? '#FFFFFF' : colors.foreground,
  };
}

function columnsOf(section: Products, isMobile: boolean): number {
  if (section.layout === 'list') return isMobile ? 1 : 2;
  if (section.layout === 'featured') return isMobile ? 2 : 4;
  return isMobile ? 2 : section.desktopColumns;
}

export function productGridStyle(section: Products, isMobile: boolean): CSSProperties {
  const isCarousel = section.layout === 'carousel';
  return {
    display: isCarousel ? 'flex' : 'grid',
    gridTemplateColumns: `repeat(${String(columnsOf(section, isMobile))}, minmax(0, 1fr))`,
    gridAutoFlow: 'dense',
    gap: isMobile ? 12 : 16,
    overflowX: isCarousel ? 'auto' : 'visible',
    scrollSnapType: isCarousel ? 'x mandatory' : 'none',
    scrollbarWidth: 'none',
  };
}

function imageSize(look: ProductLook, isMobile: boolean): Pick<CSSProperties, 'width' | 'height'> {
  if (!look.isList) return { width: '100%', height: 'auto' };
  const side = isMobile ? 76 : 84;
  return { width: side, height: side };
}

function imageRadius(look: ProductLook, theme: PreviewTheme): number {
  if (look.isList) return Math.max(theme.cornerPx - 4, 0);
  return look.isCard ? 0 : theme.cornerPx;
}

export function productImageStyle(
  look: ProductLook,
  theme: PreviewTheme,
  isMobile: boolean,
  isLead: boolean,
): CSSProperties {
  return {
    ...imageSize(look, isMobile),
    flex: isLead ? '1 1 auto' : '0 0 auto',
    aspectRatio: look.isList || isLead ? 'auto' : look.aspectRatio,
    minHeight: isLead ? 220 : 0,
    borderRadius: imageRadius(look, theme),
    background: theme.tokens.soft,
  };
}

function infoPadding(look: ProductLook, isMobile: boolean): string {
  if (look.isOverlay) return isMobile ? '28px 10px 10px' : '36px 14px 14px';
  if (look.isList) return '0px';
  return look.isCard ? '12px 12px 14px' : '0px 2px';
}

export function productInfoStyle(look: ProductLook, isMobile: boolean): CSSProperties {
  return {
    position: look.isOverlay ? 'absolute' : 'static',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    flex: look.isList ? '1 1 auto' : '0 0 auto',
    padding: infoPadding(look, isMobile),
    background: look.isOverlay
      ? 'linear-gradient(180deg, rgba(10,12,8,0) 0%, rgba(10,12,8,.8) 100%)'
      : 'transparent',
    color: look.nameColor,
  };
}

function cardFlex(look: ProductLook, isMobile: boolean): string {
  if (!look.isCarousel) return '0 1 auto';
  return isMobile ? '0 0 150px' : '0 0 200px';
}

function cardGap(look: ProductLook): number {
  if (look.isList) return 12;
  return look.isCard || look.isOverlay ? 0 : 10;
}

export function productCardStyle(
  look: ProductLook,
  theme: PreviewTheme,
  isMobile: boolean,
  isLead: boolean,
  line: string,
): CSSProperties {
  return {
    flexDirection: look.isList ? 'row' : 'column',
    alignItems: look.isList ? 'center' : 'stretch',
    gap: cardGap(look),
    flex: cardFlex(look, isMobile),
    scrollSnapAlign: look.isCarousel ? 'start' : 'none',
    gridColumn: isLead ? 'span 2' : 'auto',
    gridRow: isLead ? 'span 2' : 'auto',
    padding: look.isList && look.isCard ? 10 : 0,
    borderRadius: theme.cornerPx,
    background: look.isCard ? look.cardBackground : 'transparent',
    boxShadow: look.isCard ? `inset 0 0 0 1px ${line}` : 'none',
  };
}
