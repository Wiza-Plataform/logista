'use client';

import type { ColorScheme } from '@/shared/contracts/store-theme';
import { strings } from '@/shared/i18n/strings';

import { useEditor } from '../editor-context';
import { Instagram } from '../editor-icons';
import { instagramLabel } from '../identity-labels';
import { usePreview } from './preview-context';
import { SectionFrame } from './section-frame';

const t = strings.storeEditor;
const INSTAGRAM_TILES = 6;

export function InstagramPreview({ colorScheme }: { readonly colorScheme: ColorScheme }) {
  const { draft, data } = useEditor();
  const { theme, isMobile } = usePreview();
  const colors = theme.schemeOf(colorScheme);
  const covers = data.products.map((product) => product.imageUrl);
  const tiles = Array.from({ length: INSTAGRAM_TILES }, (_, index) => covers.at(index) ?? null);
  const radius = Math.min(theme.cornerPx, 14);

  return (
    <SectionFrame
      section="instagram"
      tag={t.sectionNames.instagram}
      style={{
        padding: isMobile ? '20px 16px 28px' : '28px 24px 40px',
        background: colors.background,
        color: colors.foreground,
      }}
    >
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <span
          className="flex items-center gap-2 font-extrabold tracking-[-0.02em]"
          style={{ fontFamily: theme.displayFont, fontSize: isMobile ? 20 : 24 }}
        >
          <Instagram className="size-[22px]" />
          <span>{instagramLabel(draft.identity.instagram) ?? t.preview.instagramFallback}</span>
        </span>
        <span
          className="text-note font-bold whitespace-nowrap"
          style={{ color: theme.tokens.price }}
        >
          {t.preview.follow}
        </span>
      </div>
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${isMobile ? '3' : '6'}, minmax(0, 1fr))` }}
      >
        {tiles.map((imageUrl, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden"
            style={{ borderRadius: radius, background: theme.tokens.soft }}
          >
            {imageUrl !== null && (
              <img src={imageUrl} alt="" className="absolute inset-0 size-full object-cover" />
            )}
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
