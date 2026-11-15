'use client';

import type { CSSProperties } from 'react';

import { strings } from '@/shared/i18n/strings';

import type { PreviewProduct } from '../editor-data';
import { useEditor } from '../editor-context';
import { WhatsApp } from '../editor-icons';
import { usePreview } from './preview-context';
import { productCardStyle, productImageStyle, productInfoStyle } from './product-look';
import type { ProductLook } from './product-look';

const t = strings.storeEditor;

function ProductImage({
  product,
  look,
  isLead,
}: {
  readonly product: PreviewProduct;
  readonly look: ProductLook;
  readonly isLead: boolean;
}) {
  const { draft } = useEditor();
  const { theme, isMobile } = usePreview();
  const showBadge = draft.sections.products.showNewBadge && product.isNew && !look.isList;

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={productImageStyle(look, theme, isMobile, isLead)}
    >
      {product.imageUrl === null ? (
        <span
          className="text-[28px] font-extrabold"
          style={{ color: theme.tokens.muted, fontFamily: theme.displayFont }}
        >
          {product.name.charAt(0).toUpperCase()}
        </span>
      ) : (
        <img src={product.imageUrl} alt="" className="absolute inset-0 size-full object-cover" />
      )}
      {showBadge && (
        <span
          className="text-label absolute top-2 left-2 px-2 py-1 font-extrabold"
          style={{
            borderRadius: theme.buttonRadius,
            background: theme.preset.primary,
            color: theme.preset.onPrimary,
          }}
        >
          {t.preview.newBadge}
        </span>
      )}
    </div>
  );
}

function orderButtonStyle(
  look: ProductLook,
  isFilled: boolean,
  colors: { background: string; foreground: string },
): CSSProperties {
  return {
    alignSelf: look.isList || look.isOverlay ? 'flex-start' : 'stretch',
    background: look.isOverlay ? '#FFFFFF' : colors.background,
    color: look.isOverlay ? '#16190F' : colors.foreground,
    boxShadow: look.isOverlay || isFilled ? 'none' : `inset 0 0 0 1.5px ${colors.foreground}`,
  };
}

function ProductInfo({
  product,
  look,
}: {
  readonly product: PreviewProduct;
  readonly look: ProductLook;
}) {
  const { draft } = useEditor();
  const { theme, isMobile } = usePreview();
  const section = draft.sections.products;
  const showPrice = section.showPrice && product.priceLabel !== null;

  return (
    <div className="flex min-w-0 flex-col gap-[5px]" style={productInfoStyle(look, isMobile)}>
      <span
        className="truncate leading-[1.3] font-bold"
        style={{
          fontSize: isMobile ? 12.5 : 13.5,
          whiteSpace: look.isCarousel || look.isOverlay ? 'nowrap' : 'normal',
        }}
      >
        {product.name}
      </span>
      {showPrice && (
        <span
          className="font-extrabold"
          style={{
            fontFamily: theme.displayFont,
            fontSize: isMobile ? 14 : 15,
            color: look.isOverlay ? '#FFFFFF' : look.priceColor,
          }}
        >
          {product.priceLabel}
        </span>
      )}
      {section.showOrderButton && (
        <span
          className="text-fine mt-1 flex h-[34px] items-center justify-center gap-1.5 px-3 font-extrabold whitespace-nowrap"
          style={{
            borderRadius: theme.buttonRadius,
            ...orderButtonStyle(look, theme.isSolid, theme.buttonFor(section.colorScheme)),
          }}
        >
          <WhatsApp className="size-3.5" />
          <span>{t.preview.order}</span>
        </span>
      )}
    </div>
  );
}

export function ProductCard({
  product,
  look,
  isLead,
}: {
  readonly product: PreviewProduct;
  readonly look: ProductLook;
  readonly isLead: boolean;
}) {
  const { draft } = useEditor();
  const { theme, isMobile } = usePreview();
  const line = theme.schemeOf(draft.sections.products.colorScheme).line;

  return (
    <div
      className="relative flex min-w-0 overflow-hidden"
      style={productCardStyle(look, theme, isMobile, isLead, line)}
    >
      <ProductImage product={product} look={look} isLead={isLead} />
      <ProductInfo product={product} look={look} />
    </div>
  );
}
