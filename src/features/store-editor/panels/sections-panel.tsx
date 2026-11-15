'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import { useDragOrder } from '@/shared/forms/use-drag-order';
import { strings } from '@/shared/i18n/strings';

import { BOTTOM_SECTIONS, reorderPage, TOP_SECTIONS } from '../draft-model';
import type { SectionKey } from '../draft-model';
import { useEditor } from '../editor-context';
import { AddPlus } from '../editor-icons';
import { PanelTitle } from './panel-title';
import { SectionLibrary } from './section-library';
import { SectionRow } from './section-row';

const t = strings.storeEditor.sections;

function RowGroup({
  title,
  sections,
}: {
  readonly title: string;
  readonly sections: readonly SectionKey[];
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <SectionGroupTitle>{title}</SectionGroupTitle>
      {sections.map((section) => (
        <SectionRow key={section} section={section} />
      ))}
    </div>
  );
}

function SectionGroupTitle({ children }: { readonly children: ReactNode }) {
  return (
    <span className="px-1.5 pb-1.5 text-xs font-extrabold tracking-[0.08em] text-(--txt-dim)">
      {children}
    </span>
  );
}

function PageRows() {
  const { draft, edit } = useEditor();
  const order = useDragOrder(draft.pageOrder, (next) => {
    edit(reorderPage(next));
  });

  return (
    <div className="flex flex-col gap-0.5">
      {draft.pageOrder.map((section) => (
        <SectionRow
          key={section}
          section={section}
          drag={{
            bindings: order.dragBindingsFor(section),
            onGripKeyDown: order.keyDownFor(section),
            isDragging: order.draggedId === section,
          }}
        />
      ))}
    </div>
  );
}

export function SectionsPanel() {
  const { draft } = useEditor();
  const [isLibraryOpen, setLibraryOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 px-3.5 pt-[18px] pb-7">
      <div className="flex items-baseline justify-between gap-2 px-1">
        <PanelTitle>{t.title}</PanelTitle>
        <span className="text-fine font-semibold text-(--txt-dim)">
          {`${String(draft.pageOrder.length)}${t.countSuffix}`}
        </span>
      </div>

      <RowGroup title={t.top} sections={TOP_SECTIONS} />

      <div className="flex flex-col gap-0.5">
        <SectionGroupTitle>
          {t.page}
          <span className="max-[899px]:hidden">{t.pageDragHint}</span>
        </SectionGroupTitle>
        <PageRows />
        <button
          type="button"
          aria-expanded={isLibraryOpen}
          onClick={() => {
            setLibraryOpen((open) => !open);
          }}
          className="text-note hover:bg-muted bg-card mt-2 flex min-h-[42px] items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-dashed border-(--txt-faint) font-bold transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none max-[899px]:min-h-11"
        >
          <AddPlus className="size-4" strokeWidth={2} />
          <span>{t.add}</span>
        </button>
        {isLibraryOpen && (
          <SectionLibrary
            onAdded={() => {
              setLibraryOpen(false);
            }}
          />
        )}
      </div>

      <RowGroup title={t.bottom} sections={BOTTOM_SECTIONS} />

      <p className="bg-muted text-sm m-0 rounded-[12px] p-3 leading-[1.5] text-(--txt-dim)">
        {t.hint}
      </p>
    </div>
  );
}
