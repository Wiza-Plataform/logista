'use client';

import { strings } from '@/shared/i18n/strings';

import { ColorSchemePicker } from '../controls/color-scheme-picker';
import { ControlGroup, ControlHint } from '../controls/control-group';
import { TextControl } from '../controls/text-control';
import { patchSection } from '../draft-model';
import { useEditor } from '../editor-context';

const t = strings.storeEditor.inspector;

export function AnnouncementSettings() {
  const { draft, edit } = useEditor();

  return (
    <>
      <ControlGroup>
        <TextControl
          isGroupLabel
          label={t.announcementText}
          field="sections.announcement.message"
          value={draft.sections.announcement.message}
          maxLength={120}
          onChange={(message) => {
            edit(patchSection('announcement', { message }), 'announcement.message');
          }}
        />
        <ControlHint>{t.announcementHint}</ControlHint>
      </ControlGroup>
      <ColorSchemePicker section="announcement" />
    </>
  );
}
