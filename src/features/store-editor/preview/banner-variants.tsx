'use client';

import type { CSSProperties } from 'react';

import { useEditor } from '../editor-context';
import { BannerText } from './banner-text';
import type { Banner } from './banner-text';
import { usePreview } from './preview-context';
import type { SchemeColors } from './preview-theme';

function ColorCircles({ scheme }: { readonly scheme: Banner['colorScheme'] }) {
  const { theme, isMobile } = usePreview();
  const big =
    scheme === 'accent'
      ? 'rgba(255,255,255,0.3)'
      : `color-mix(in srgb, ${theme.preset.primary} 30%, transparent)`;
  const small =
    scheme === 'accent'
      ? 'rgba(255,255,255,0.2)'
      : `color-mix(in srgb, ${theme.preset.primary} 18%, transparent)`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        right: isMobile ? '-22%' : '2%',
        bottom: '-6%',
        width: isMobile ? '80%' : '50%',
        opacity: isMobile ? 0.3 : 1,
      }}
    >
      <svg viewBox="0 0 320 260" className="block w-full">
        <circle cx="190" cy="140" r="118" fill={big} />
        <circle cx="56" cy="62" r="42" fill={small} />
        <circle cx="296" cy="36" r="22" fill={small} />
      </svg>
    </div>
  );
}

export function OverlayBanner({
  colors,
  height,
}: {
  readonly colors: SchemeColors;
  readonly height: number;
}) {
  const { draft, images } = useEditor();
  const { isMobile } = usePreview();
  const image = images.bannerImage;
  const section = draft.sections.banner;

  return (
    <div
      className="relative flex overflow-hidden"
      style={{
        minHeight: height,
        alignItems: isMobile ? 'flex-end' : 'center',
        padding: isMobile ? '28px 20px' : '44px 48px',
        background: colors.background,
        color: colors.foreground,
      }}
    >
      {image === null ? (
        <ColorCircles scheme={section.colorScheme} />
      ) : (
        <img
          src={isMobile ? image.mobileUrl : image.url}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
        />
      )}
      <div
        className="relative z-[1] flex flex-col gap-3"
        style={{ maxWidth: isMobile ? '100%' : '58%' }}
      >
        <BannerText colors={colors} />
      </div>
    </div>
  );
}

export function SplitBanner({
  colors,
  height,
}: {
  readonly colors: SchemeColors;
  readonly height: number;
}) {
  const { images } = useEditor();
  const { theme, isMobile } = usePreview();
  const image = images.bannerImage;
  const side = `color-mix(in srgb, ${theme.preset.primary} 30%, ${theme.tokens.background})`;

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))',
        minHeight: height,
        background: colors.background,
        color: colors.foreground,
      }}
    >
      <div
        className="flex flex-col justify-center gap-3"
        style={{ padding: isMobile ? '28px 20px' : '44px 48px' }}
      >
        <BannerText colors={colors} />
      </div>
      <div
        aria-hidden="true"
        className="overflow-hidden"
        style={{ minHeight: isMobile ? 200 : 0, background: side }}
      >
        {image !== null && (
          <img
            src={isMobile ? image.mobileUrl : image.url}
            alt=""
            className="size-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export function TextBanner({
  colors,
  height,
}: {
  readonly colors: SchemeColors;
  readonly height: number;
}) {
  const { isMobile } = usePreview();
  const centered: CSSProperties = { maxWidth: 560 };

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 text-center"
      style={{
        minHeight: height,
        padding: isMobile ? '28px 20px' : '44px 48px',
        background: colors.background,
        color: colors.foreground,
      }}
    >
      <BannerText colors={colors} align={centered} />
    </div>
  );
}
