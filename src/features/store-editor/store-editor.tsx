'use client';

import type { ReactNode } from 'react';

import { strings } from '@/shared/i18n/strings';

import { ToolRail } from './chrome/tool-rail';
import { TopBar } from './chrome/top-bar';
import { EditorProvider, useEditor } from './editor-context';
import type { EditorData } from './editor-data';
import { Inspector } from './inspector/inspector';
import { BrandPanel } from './panels/brand-panel';
import { SectionsPanel } from './panels/sections-panel';
import { StylePanel } from './panels/style-panel';
import { TemplatesPanel } from './panels/templates-panel';
import { PreviewStage } from './preview/preview-stage';

const GRID =
  'dark:[color-scheme:dark] grid h-dvh grid-cols-[64px_296px_minmax(0,1fr)_344px] grid-rows-[60px_minmax(0,1fr)] [grid-template-areas:"top_top_top_top""rail_panel_stage_insp"] max-[1239px]:grid-cols-[64px_minmax(0,1fr)_320px] max-[1239px]:grid-rows-[60px_minmax(0,1fr)_minmax(0,1fr)] max-[1239px]:[grid-template-areas:"top_top_top""rail_stage_panel""rail_stage_insp"] max-[899px]:h-auto max-[899px]:min-h-dvh max-[899px]:grid-cols-[minmax(0,1fr)] max-[899px]:grid-rows-[auto_auto_600px_auto_auto] max-[899px]:[grid-template-areas:"top""rail""stage""panel""insp"]';

function ActivePanel(): ReactNode {
  const { tab } = useEditor();

  switch (tab) {
    case 'sections':
      return <SectionsPanel />;
    case 'style':
      return <StylePanel />;
    case 'templates':
      return <TemplatesPanel />;
    case 'brand':
      return <BrandPanel />;
  }
}

export function StoreEditor({ data }: { readonly data: EditorData }) {
  return (
    <EditorProvider data={data}>
      <div className={GRID}>
        <TopBar />
        <ToolRail />
        <aside
          aria-label={strings.storeEditor.regions.panel}
          className="border-border bg-card min-h-0 overflow-y-auto border-r [grid-area:panel] max-[1239px]:border-r-0 max-[1239px]:border-b max-[1239px]:border-l max-[899px]:overflow-visible max-[899px]:border-t max-[899px]:border-l-0"
        >
          <ActivePanel />
        </aside>
        <PreviewStage />
        <Inspector />
      </div>
    </EditorProvider>
  );
}
