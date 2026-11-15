'use client';

import { strings } from '@/shared/i18n/strings';

import { useEditor } from '../editor-context';
import { ALL_CATEGORIES, usePreview } from './preview-context';
import { ProductCard } from './product-card';
import { productGridStyle, productLookOf } from './product-look';
import { SectionFrame } from './section-frame';

const t = strings.storeEditor;

export function ProductsPreview() {
  const { draft, data } = useEditor();
  const { theme, isMobile, activeCategory } = usePreview();
  const section = draft.sections.products;
  const colors = theme.schemeOf(section.colorScheme);
  const look = productLookOf(section, theme);
  const visible =
    activeCategory === ALL_CATEGORIES
      ? data.products
      : data.products.filter((product) => product.categoryUlids.includes(activeCategory));

  return (
    <SectionFrame
      section="products"
      tag={t.sectionNames.products}
      style={{
        padding: isMobile ? '20px 16px 28px' : '28px 24px 40px',
        background: colors.background,
        color: colors.foreground,
      }}
    >
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3
          className="m-0 font-extrabold tracking-[-0.02em]"
          style={{ fontFamily: theme.displayFont, fontSize: isMobile ? 20 : 24 }}
        >
          {section.title}
        </h3>
        <span className="text-note font-bold whitespace-nowrap" style={{ color: look.priceColor }}>
          {t.preview.seeAll}
        </span>
      </div>
      <div style={productGridStyle(section, isMobile)}>
        {visible.map((product, index) => (
          <ProductCard
            key={product.productUlid}
            product={product}
            look={look}
            isLead={look.isFeatured && index === 0}
          />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="text-body m-0 py-7 text-center" style={{ color: colors.muted }}>
          {t.preview.noProducts}
        </p>
      )}
    </SectionFrame>
  );
}
