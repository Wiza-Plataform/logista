'use client';

import type { CSSProperties } from 'react';

import type { ThemeSections } from '@/shared/contracts/store-theme';

import { useEditor } from '../editor-context';
import { ForwardArrow } from '../editor-icons';
import { usePreview } from './preview-context';
import type { SchemeColors } from './preview-theme';

export type Banner = ThemeSections['banner'];

interface BannerSize {
  readonly mobile: number;
  readonly desktop: number;
  readonly text: number;
  readonly titleSize: number;
}

export function sizeOf(height: Banner['height']): BannerSize {
  switch (height) {
    case 'small':
      return { mobile: 210, desktop: 250, text: 170, titleSize: 32 };
    case 'medium':
      return { mobile: 260, desktop: 320, text: 220, titleSize: 38 };
    case 'large':
      return { mobile: 320, desktop: 400, text: 280, titleSize: 44 };
  }
}

export function BannerText({
  colors,
  align,
}: {
  readonly colors: SchemeColors;
  readonly align?: CSSProperties;
}) {
  const { draft } = useEditor();
  const { theme, isMobile, storeName, tagline } = usePreview();
  const section = draft.sections.banner;
  const button = theme.buttonFor(section.colorScheme);
  const titleSize = isMobile ? 28 : sizeOf(section.height).titleSize;

  return (
    <>
      <span
        className="text-caption font-extrabold tracking-[0.1em] uppercase"
        style={{ color: colors.muted }}
      >
        {storeName}
      </span>
      <h3
        className="m-0 leading-[1.04] font-extrabold tracking-[-0.02em]"
        style={{ fontFamily: theme.displayFont, fontSize: titleSize, ...align }}
      >
        {section.title}
      </h3>
      <p className="m-0 text-[14.5px] leading-[1.5]" style={{ color: colors.muted, ...align }}>
        {tagline}
      </p>
      <span
        className="text-step mt-1 inline-flex h-[42px] items-center gap-2 px-5 font-extrabold"
        style={{
          alignSelf: section.layout === 'textOnly' ? 'center' : 'flex-start',
          borderRadius: theme.buttonRadius,
          background: button.background,
          color: button.foreground,
          border: button.border,
        }}
      >
        {section.buttonLabel}
        <ForwardArrow className="size-4" strokeWidth={2} />
      </span>
    </>
  );
}
