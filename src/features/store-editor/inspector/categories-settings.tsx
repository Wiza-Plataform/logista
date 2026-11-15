'use client';

import { strings } from '@/shared/i18n/strings';

import { ColorSchemePicker } from '../controls/color-scheme-picker';
import { ControlGroup } from '../controls/control-group';
import { VisualChoices } from '../controls/option-card';
import { SegmentControl } from '../controls/segment-control';
import { patchSection } from '../draft-model';
import { useEditor } from '../editor-context';
import { CategoryChipsArt, CategoryIconsArt, CategoryTabsArt } from './catalog-art';

const t = strings.storeEditor.inspector;

export function CategoriesSettings() {
  const { draft, edit } = useEditor();
  const section = draft.sections.categories;

  return (
    <>
      <ControlGroup title={t.style}>
        <VisualChoices
          label={t.style}
          columns={3}
          value={section.style}
          choices={[
            { value: 'chips', label: t.chips, art: <CategoryChipsArt /> },
            { value: 'tabs', label: t.tabs, art: <CategoryTabsArt /> },
            { value: 'icons', label: t.icons, art: <CategoryIconsArt /> },
          ]}
          onChange={(style) => {
            edit(patchSection('categories', { style }));
          }}
        />
      </ControlGroup>
      <ControlGroup title={t.alignment}>
        <SegmentControl
          label={t.alignment}
          value={section.alignment}
          options={[
            { value: 'left', label: t.left },
            { value: 'center', label: t.center },
          ]}
          onChange={(alignment) => {
            edit(patchSection('categories', { alignment }));
          }}
        />
      </ControlGroup>
      <ColorSchemePicker section="categories" />
    </>
  );
}
