'use client';

import { strings } from '@/shared/i18n/strings';

import { ColorSchemePicker } from '../controls/color-scheme-picker';
import { ControlGroup, ControlHint, LinkButton } from '../controls/control-group';
import { SwitchControl } from '../controls/switch-control';
import { patchSection } from '../draft-model';
import { useEditor } from '../editor-context';

const t = strings.storeEditor.inspector;

export function FooterSettings() {
  const { draft, edit, setTab } = useEditor();

  return (
    <>
      <ControlGroup title={t.footerContent}>
        <SwitchControl
          label={t.showContacts}
          isOn={draft.sections.footer.showContacts}
          onChange={(showContacts) => {
            edit(patchSection('footer', { showContacts }));
          }}
        />
        <ControlHint>{t.footerHint}</ControlHint>
        <LinkButton
          label={t.editContacts}
          onClick={() => {
            setTab('brand');
          }}
        />
      </ControlGroup>
      <ColorSchemePicker section="footer" />
    </>
  );
}
