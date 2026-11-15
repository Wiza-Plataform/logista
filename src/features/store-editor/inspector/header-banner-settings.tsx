'use client';

import { strings } from '@/shared/i18n/strings';

import { ColorSchemePicker } from '../controls/color-scheme-picker';
import { ControlGroup } from '../controls/control-group';
import { VisualChoices } from '../controls/option-card';
import { SegmentControl } from '../controls/segment-control';
import { SwitchControl } from '../controls/switch-control';
import { TextControl } from '../controls/text-control';
import { patchSection } from '../draft-model';
import { useEditor } from '../editor-context';
import { BannerImageField } from './banner-image-field';
import {
  BannerOverlayArt,
  BannerSplitArt,
  BannerTextArt,
  HeaderCenterArt,
  HeaderCompactArt,
  HeaderLeftArt,
} from './layout-art';

const t = strings.storeEditor.inspector;

export function HeaderSettings() {
  const { draft, edit } = useEditor();
  const section = draft.sections.header;

  return (
    <>
      <ControlGroup title={t.layout}>
        <VisualChoices
          label={t.layout}
          columns={3}
          value={section.layout}
          choices={[
            { value: 'logoLeft', label: t.headerLeft, art: <HeaderLeftArt /> },
            { value: 'logoCenter', label: t.headerCenter, art: <HeaderCenterArt /> },
            { value: 'compact', label: t.headerCompact, art: <HeaderCompactArt /> },
          ]}
          onChange={(layout) => {
            edit(patchSection('header', { layout }));
          }}
        />
      </ControlGroup>
      <ControlGroup title={t.options}>
        <SwitchControl
          label={t.showSearch}
          isOn={section.showSearch}
          onChange={(showSearch) => {
            edit(patchSection('header', { showSearch }));
          }}
        />
        <SwitchControl
          label={t.sticky}
          isOn={section.sticky}
          onChange={(sticky) => {
            edit(patchSection('header', { sticky }));
          }}
        />
      </ControlGroup>
      <ColorSchemePicker section="header" />
    </>
  );
}

export function BannerSettings() {
  const { draft, edit } = useEditor();
  const section = draft.sections.banner;

  return (
    <>
      <ControlGroup title={t.layout}>
        <VisualChoices
          label={t.layout}
          columns={3}
          value={section.layout}
          choices={[
            { value: 'overlay', label: t.bannerOverlay, art: <BannerOverlayArt /> },
            { value: 'split', label: t.bannerSplit, art: <BannerSplitArt /> },
            { value: 'textOnly', label: t.bannerText, art: <BannerTextArt /> },
          ]}
          onChange={(layout) => {
            edit(patchSection('banner', { layout }));
          }}
        />
      </ControlGroup>
      <ControlGroup title={t.height}>
        <SegmentControl
          label={t.height}
          value={section.height}
          options={[
            { value: 'small', label: t.small },
            { value: 'medium', label: t.medium },
            { value: 'large', label: t.large },
          ]}
          onChange={(height) => {
            edit(patchSection('banner', { height }));
          }}
        />
      </ControlGroup>
      <ControlGroup title={t.content}>
        <TextControl
          label={t.bannerTitle}
          field="sections.banner.title"
          value={section.title}
          maxLength={80}
          onChange={(title) => {
            edit(patchSection('banner', { title }), 'banner.title');
          }}
        />
        <TextControl
          label={t.bannerButton}
          field="sections.banner.buttonLabel"
          value={section.buttonLabel}
          maxLength={30}
          onChange={(buttonLabel) => {
            edit(patchSection('banner', { buttonLabel }), 'banner.buttonLabel');
          }}
        />
        <BannerImageField />
      </ControlGroup>
      <ColorSchemePicker section="banner" />
    </>
  );
}
