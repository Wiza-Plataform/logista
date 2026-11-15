'use client';

import { strings } from '@/shared/i18n/strings';

import { ControlGroup, LinkButton } from '../controls/control-group';
import { SegmentControl } from '../controls/segment-control';
import { TextControl } from '../controls/text-control';
import { patchSection } from '../draft-model';
import { useEditor } from '../editor-context';
import { whatsappLabel } from '../identity-labels';

const t = strings.storeEditor.inspector;

export function WhatsappSettings() {
  const { draft, edit, setTab } = useEditor();
  const section = draft.sections.whatsappButton;

  return (
    <>
      <ControlGroup title={t.buttonStyle}>
        <SegmentControl
          label={t.buttonStyle}
          value={section.style}
          options={[
            { value: 'icon', label: t.iconOnly },
            { value: 'iconText', label: t.iconText },
          ]}
          onChange={(style) => {
            edit(patchSection('whatsappButton', { style }));
          }}
        />
        {section.style === 'iconText' && (
          <TextControl
            label={t.buttonLabel}
            field="sections.whatsappButton.label"
            value={section.label}
            maxLength={24}
            onChange={(label) => {
              edit(patchSection('whatsappButton', { label }), 'whatsapp.label');
            }}
          />
        )}
      </ControlGroup>
      <ControlGroup title={t.position}>
        <SegmentControl
          label={t.position}
          value={section.side}
          options={[
            { value: 'right', label: t.right },
            { value: 'left', label: t.left },
          ]}
          onChange={(side) => {
            edit(patchSection('whatsappButton', { side }));
          }}
        />
      </ControlGroup>
      <ControlGroup title={t.number} isLast>
        <span className="text-body font-semibold">
          {whatsappLabel(draft.identity.whatsapp) ?? t.noNumber}
        </span>
        <LinkButton
          label={t.changeNumber}
          onClick={() => {
            setTab('brand');
          }}
        />
      </ControlGroup>
    </>
  );
}
