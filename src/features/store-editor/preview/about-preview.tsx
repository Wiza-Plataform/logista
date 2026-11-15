'use client';

import type { CSSProperties } from 'react';

import { strings } from '@/shared/i18n/strings';

import { useEditor } from '../editor-context';
import { MapPin } from '../editor-icons';
import { usePreview } from './preview-context';
import { SectionFrame } from './section-frame';

const t = strings.storeEditor;

function aboutGridStyle(isSide: boolean, isMobile: boolean): CSSProperties {
  return {
    gridTemplateColumns: isSide && !isMobile ? 'repeat(2, minmax(0, 1fr))' : 'minmax(0, 1fr)',
    gap: isMobile ? 18 : 32,
    justifyItems: isSide ? 'stretch' : 'center',
    textAlign: isSide ? 'left' : 'center',
  };
}

export function AboutPreview() {
  const { draft } = useEditor();
  const { theme, isMobile, storeName, tagline, addressLine } = usePreview();
  const section = draft.sections.about;
  const colors = theme.schemeOf(section.colorScheme);
  const isSide = section.layout === 'textImage';

  return (
    <SectionFrame
      section="about"
      tag={t.sectionNames.about}
      style={{
        padding: isMobile ? '28px 16px' : '44px 32px',
        background: colors.background,
        color: colors.foreground,
      }}
    >
      <div className="grid items-center" style={aboutGridStyle(isSide, isMobile)}>
        <div
          className="flex max-w-[520px] flex-col gap-2.5"
          style={{ alignItems: isSide ? 'flex-start' : 'center' }}
        >
          <span
            className="text-caption font-extrabold tracking-[0.1em] uppercase"
            style={{ color: colors.muted }}
          >
            {t.preview.aboutEyebrow}
          </span>
          <h3
            className="m-0 font-extrabold tracking-[-0.02em]"
            style={{ fontFamily: theme.displayFont, fontSize: isMobile ? 22 : 28 }}
          >
            {storeName}
          </h3>
          <p className="m-0 text-[14.5px] leading-[1.6]" style={{ color: colors.muted }}>
            {tagline}
          </p>
          {addressLine !== null && (
            <span className="text-note mt-1 inline-flex items-center gap-1.5 font-bold">
              <MapPin className="size-[15px]" />
              <span>{addressLine}</span>
            </span>
          )}
        </div>
        {isSide && (
          <div
            aria-hidden="true"
            className="aspect-[4/3] w-full"
            style={{ borderRadius: theme.cornerPx, background: theme.tokens.soft }}
          />
        )}
      </div>
    </SectionFrame>
  );
}
