'use client';

import { strings } from '@/shared/i18n/strings';

import { useEditor } from '../editor-context';
import { ShoppingBag } from '../editor-icons';
import { CompactHeader, LogoCenterHeader, LogoLeftHeader } from './header-layouts';
import { usePreview } from './preview-context';
import { SectionFrame } from './section-frame';

const t = strings.storeEditor;
const ICON_BOX = 'flex size-9 items-center justify-center';

function BagIcon({ background, color }: { readonly background: string; readonly color: string }) {
  return (
    <span className={`relative ${ICON_BOX} shrink-0`}>
      <ShoppingBag className="size-5" />
      <span
        className="absolute top-0.5 right-px flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-extrabold"
        style={{ background, color }}
      >
        2
      </span>
    </span>
  );
}

export function HeaderPreview() {
  const { draft } = useEditor();
  const { theme, isMobile } = usePreview();
  const section = draft.sections.header;
  const colors = theme.schemeOf(section.colorScheme);
  const isAccent = section.colorScheme === 'accent';
  const padding = isMobile ? '12px 16px' : '14px 24px';
  const bag = (
    <BagIcon
      background={isAccent ? theme.preset.onPrimary : theme.preset.primary}
      color={isAccent ? theme.preset.primary : theme.preset.onPrimary}
    />
  );

  return (
    <SectionFrame
      section="header"
      tag={t.sectionNames.header}
      style={{
        position: section.sticky ? 'sticky' : 'relative',
        top: 0,
        zIndex: 4,
        background: colors.background,
        color: colors.foreground,
        borderBottom: `1px solid ${colors.line}`,
      }}
    >
      {section.layout === 'logoLeft' && <LogoLeftHeader bag={bag} padding={padding} />}
      {section.layout === 'logoCenter' && <LogoCenterHeader bag={bag} padding={padding} />}
      {section.layout === 'compact' && <CompactHeader bag={bag} padding={padding} />}
    </SectionFrame>
  );
}
