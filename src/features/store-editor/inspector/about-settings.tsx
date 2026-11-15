'use client';

import { strings } from '@/shared/i18n/strings';

import { ColorSchemePicker } from '../controls/color-scheme-picker';
import { ControlGroup, ControlHint, LinkButton } from '../controls/control-group';
import { SegmentControl } from '../controls/segment-control';
import { patchSection } from '../draft-model';
import { useEditor } from '../editor-context';

const t = strings.storeEditor.inspector;

export function AboutSettings() {
  const { draft, edit, setTab } = useEditor();

  return (
    <>
      <ControlGroup title={t.layout}>
        <SegmentControl
          label={t.layout}
          value={draft.sections.about.layout}
          options={[
            { value: 'textImage', label: t.aboutTextImage },
            { value: 'centered', label: t.aboutCentered },
          ]}
          onChange={(layout) => {
            edit(patchSection('about', { layout }));
          }}
        />
        <ControlHint>{t.aboutHint}</ControlHint>
        <LinkButton
          label={t.editBrand}
          onClick={() => {
            setTab('brand');
          }}
        />
      </ControlGroup>
      <ColorSchemePicker section="about" />
    </>
  );
}
