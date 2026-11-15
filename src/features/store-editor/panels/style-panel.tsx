'use client';

import { strings } from '@/shared/i18n/strings';

import { ControlGroup } from '../controls/control-group';
import { SegmentControl } from '../controls/segment-control';
import { patchStyle } from '../draft-model';
import { useEditor } from '../editor-context';
import { PanelSubtitle, PanelTitle } from './panel-title';
import { ButtonChoices, FontChoices, PaletteChoices } from './style-choices';

const t = strings.storeEditor.style;

export function StylePanel() {
  const { draft, edit } = useEditor();

  return (
    <div className="flex flex-col px-4 pt-[18px] pb-7">
      <div className="flex flex-col gap-1 pb-1.5">
        <PanelTitle>{t.title}</PanelTitle>
        <PanelSubtitle>{t.subtitle}</PanelSubtitle>
      </div>
      <PaletteChoices />
      <ControlGroup title={t.mode}>
        <SegmentControl
          label={t.mode}
          value={draft.style.colorMode}
          options={[
            { value: 'light', label: t.light },
            { value: 'dark', label: t.dark },
          ]}
          onChange={(colorMode) => {
            edit(patchStyle({ colorMode }));
          }}
        />
      </ControlGroup>
      <FontChoices />
      <ButtonChoices />
      <ControlGroup title={t.corners} isLast>
        <SegmentControl
          label={t.corners}
          value={draft.style.cornerStyle}
          options={[
            { value: 'square', label: t.square },
            { value: 'soft', label: t.soft },
            { value: 'round', label: t.round },
          ]}
          onChange={(cornerStyle) => {
            edit(patchStyle({ cornerStyle }));
          }}
        />
      </ControlGroup>
    </div>
  );
}
