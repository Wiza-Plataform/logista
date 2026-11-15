'use client';

import { strings } from '@/shared/i18n/strings';

import { ColorSchemePicker } from '../controls/color-scheme-picker';
import { ControlGroup, ControlHint } from '../controls/control-group';
import { VisualChoices } from '../controls/option-card';
import { SegmentControl } from '../controls/segment-control';
import { SwitchControl } from '../controls/switch-control';
import { TextControl } from '../controls/text-control';
import { patchSection } from '../draft-model';
import { useEditor } from '../editor-context';
import {
  CardBoxArt,
  CardOverlayArt,
  CardPlainArt,
  ProductCarouselArt,
  ProductFeaturedArt,
  ProductGridArt,
  ProductListArt,
} from './catalog-art';

const t = strings.storeEditor.inspector;

function ProductLayoutControls() {
  const { draft, edit } = useEditor();
  const section = draft.sections.products;

  return (
    <ControlGroup title={t.layout}>
      <VisualChoices
        label={t.layout}
        columns={2}
        value={section.layout}
        choices={[
          { value: 'grid', label: t.grid, art: <ProductGridArt /> },
          { value: 'list', label: t.list, art: <ProductListArt /> },
          { value: 'carousel', label: t.carousel, art: <ProductCarouselArt /> },
          { value: 'featured', label: t.featured, art: <ProductFeaturedArt /> },
        ]}
        onChange={(layout) => {
          edit(patchSection('products', { layout }));
        }}
      />
      {section.layout === 'grid' && (
        <div className="flex flex-col gap-2">
          <span className="text-note font-bold">{t.columns}</span>
          <SegmentControl
            label={t.columns}
            value={section.desktopColumns}
            options={[
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' },
            ]}
            onChange={(desktopColumns) => {
              edit(patchSection('products', { desktopColumns }));
            }}
          />
          <ControlHint>{t.columnsHint}</ControlHint>
        </div>
      )}
    </ControlGroup>
  );
}

function ProductCardControls() {
  const { draft, edit } = useEditor();
  const section = draft.sections.products;

  return (
    <ControlGroup title={t.productCard}>
      <VisualChoices
        label={t.productCard}
        columns={3}
        value={section.cardStyle}
        choices={[
          { value: 'plain', label: t.cardPlain, art: <CardPlainArt /> },
          { value: 'card', label: t.cardCard, art: <CardBoxArt /> },
          { value: 'overlay', label: t.cardOverlay, art: <CardOverlayArt /> },
        ]}
        onChange={(cardStyle) => {
          edit(patchSection('products', { cardStyle }));
        }}
      />
      <span className="text-note font-bold">{t.imageRatio}</span>
      <SegmentControl
        label={t.imageRatio}
        value={section.imageRatio}
        options={[
          { value: 'square', label: t.ratioSquare },
          { value: 'portrait', label: t.ratioPortrait },
          { value: 'tall', label: t.ratioTall },
        ]}
        onChange={(imageRatio) => {
          edit(patchSection('products', { imageRatio }));
        }}
      />
    </ControlGroup>
  );
}

function ProductCardFields() {
  const { draft, edit } = useEditor();
  const section = draft.sections.products;

  return (
    <ControlGroup title={t.showOnCard}>
      <SwitchControl
        label={t.showPrice}
        isOn={section.showPrice}
        onChange={(showPrice) => {
          edit(patchSection('products', { showPrice }));
        }}
      />
      <SwitchControl
        label={t.showOrderButton}
        isOn={section.showOrderButton}
        onChange={(showOrderButton) => {
          edit(patchSection('products', { showOrderButton }));
        }}
      />
      <SwitchControl
        label={t.showNewBadge}
        isOn={section.showNewBadge}
        onChange={(showNewBadge) => {
          edit(patchSection('products', { showNewBadge }));
        }}
      />
    </ControlGroup>
  );
}

export function ProductsSettings() {
  const { draft, edit } = useEditor();

  return (
    <>
      <ControlGroup>
        <TextControl
          isGroupLabel
          label={t.sectionTitle}
          field="sections.products.title"
          value={draft.sections.products.title}
          maxLength={60}
          onChange={(title) => {
            edit(patchSection('products', { title }), 'products.title');
          }}
        />
      </ControlGroup>
      <ProductLayoutControls />
      <ProductCardControls />
      <ProductCardFields />
      <ColorSchemePicker section="products" />
    </>
  );
}
