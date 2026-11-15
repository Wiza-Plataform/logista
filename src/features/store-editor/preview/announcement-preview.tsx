'use client';

import { strings } from '@/shared/i18n/strings';

import { useEditor } from '../editor-context';
import { usePreview } from './preview-context';
import { SectionFrame } from './section-frame';

const t = strings.storeEditor;

export function AnnouncementPreview() {
  const { draft } = useEditor();
  const { theme } = usePreview();
  const section = draft.sections.announcement;
  const colors = theme.schemeOf(section.colorScheme);

  return (
    <SectionFrame
      section="announcement"
      tag={t.sectionNames.announcement}
      style={{
        padding: '9px 16px',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.01em',
        background: colors.background,
        color: colors.foreground,
      }}
    >
      <span>{section.message}</span>
    </SectionFrame>
  );
}
