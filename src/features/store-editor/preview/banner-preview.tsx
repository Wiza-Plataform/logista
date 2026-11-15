'use client';

import { strings } from '@/shared/i18n/strings';

import { useEditor } from '../editor-context';
import { sizeOf } from './banner-text';
import { OverlayBanner, SplitBanner, TextBanner } from './banner-variants';
import { usePreview } from './preview-context';
import { SectionFrame } from './section-frame';

export function BannerPreview() {
  const { draft } = useEditor();
  const { theme, isMobile } = usePreview();
  const section = draft.sections.banner;
  const colors = theme.schemeOf(section.colorScheme);
  const size = sizeOf(section.height);
  const height = isMobile ? size.mobile : size.desktop;

  return (
    <SectionFrame section="banner" tag={strings.storeEditor.sectionNames.banner}>
      {section.layout === 'overlay' && <OverlayBanner colors={colors} height={height} />}
      {section.layout === 'split' && <SplitBanner colors={colors} height={height} />}
      {section.layout === 'textOnly' && (
        <TextBanner colors={colors} height={isMobile ? size.text - 20 : size.text} />
      )}
    </SectionFrame>
  );
}
