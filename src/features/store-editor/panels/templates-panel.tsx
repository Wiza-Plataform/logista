'use client';

import type { ReactNode } from 'react';

import type { ThemeDraft } from '@/shared/contracts/store-theme';
import { strings } from '@/shared/i18n/strings';

import { OptionCard } from '../controls/option-card';
import { useEditor } from '../editor-context';
import { applyTemplate } from '../template-presets';
import { PanelSubtitle, PanelTitle } from './panel-title';
import { BoutiqueArt, CatalogArt, ShowcaseArt, VibrantArt } from './template-art';

const t = strings.storeEditor.templates;

const TEMPLATES: readonly {
  readonly value: ThemeDraft['template'];
  readonly name: string;
  readonly description: string;
  readonly art: ReactNode;
}[] = [
  { value: 'showcase', name: t.showcase, description: t.showcaseDescription, art: <ShowcaseArt /> },
  { value: 'boutique', name: t.boutique, description: t.boutiqueDescription, art: <BoutiqueArt /> },
  { value: 'catalog', name: t.catalog, description: t.catalogDescription, art: <CatalogArt /> },
  { value: 'vibrant', name: t.vibrant, description: t.vibrantDescription, art: <VibrantArt /> },
];

export function TemplatesPanel() {
  const { draft, edit } = useEditor();

  return (
    <div className="flex flex-col gap-3 px-4 pt-[18px] pb-7">
      <PanelTitle>{t.title}</PanelTitle>
      <PanelSubtitle>{t.subtitle}</PanelSubtitle>
      {TEMPLATES.map(({ value, name, description, art }) => (
        <OptionCard
          key={value}
          isSelected={draft.template === value}
          onClick={() => {
            edit(applyTemplate(value));
          }}
          className="flex flex-col gap-2.5 rounded-[14px] p-2.5"
        >
          {art}
          <span className="flex items-center justify-between gap-2">
            <span className="flex flex-col gap-0.5">
              <span className="text-step font-extrabold">{name}</span>
              <span className="text-fine text-(--txt-dim)">{description}</span>
            </span>
            {draft.template === value && (
              <span className="bg-foreground text-background inline-flex items-center rounded-[6px] px-2 py-1 text-xs font-extrabold">
                {t.inUse}
              </span>
            )}
          </span>
        </OptionCard>
      ))}
    </div>
  );
}
