'use client';

import { strings } from '@/shared/i18n/strings';

import { isPageSection, moveSection, sectionOf, toggleHidden } from '../draft-model';
import type { SectionKey } from '../draft-model';
import { useEditor } from '../editor-context';
import { ArrowDown, ArrowUp, EyeOpen, EyeShut, Sliders } from '../editor-icons';
import { sectionMetaOf } from '../section-catalog';

const t = strings.storeEditor;

const ICON_BUTTON =
  'flex size-[34px] shrink-0 items-center justify-center rounded-[8px] text-foreground transition-colors duration-150 hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-35 max-[899px]:size-11';

function MoveButtons({ section }: { readonly section: SectionKey }) {
  const { draft, edit } = useEditor();
  if (!isPageSection(section)) return null;

  const index = draft.pageOrder.indexOf(section);

  return (
    <div className="flex gap-0.5">
      <button
        type="button"
        aria-label={t.inspector.moveUp}
        disabled={index <= 0}
        onClick={() => {
          edit(moveSection(section, -1));
        }}
        className={ICON_BUTTON}
      >
        <ArrowUp className="size-4" />
      </button>
      <button
        type="button"
        aria-label={t.inspector.moveDown}
        disabled={index < 0 || index >= draft.pageOrder.length - 1}
        onClick={() => {
          edit(moveSection(section, 1));
        }}
        className={ICON_BUTTON}
      >
        <ArrowDown className="size-4" />
      </button>
    </div>
  );
}

export function InspectorHeader({ section }: { readonly section: SectionKey }) {
  const { draft, edit } = useEditor();
  const { label } = sectionMetaOf(section);
  const isHidden = sectionOf(draft.sections, section)?.hidden ?? false;

  return (
    <div className="bg-card border-border sticky top-0 z-[2] flex items-center gap-2.5 border-b px-4 py-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-(--active-bg) text-(--active-fg)">
        <Sliders className="size-[18px]" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-extrabold tracking-[-0.01em]">{label}</span>
        <span className="text-fine truncate text-(--txt-dim)">
          {isPageSection(section) ? t.inspector.pageSection : t.inspector.globalSection}
        </span>
      </div>
      <MoveButtons section={section} />
      <button
        type="button"
        aria-label={`${isHidden ? t.sections.show : t.sections.hide}${label}`}
        aria-pressed={isHidden}
        onClick={() => {
          edit(toggleHidden(section));
        }}
        className={ICON_BUTTON}
      >
        {isHidden ? <EyeShut className="size-4" /> : <EyeOpen className="size-4" />}
      </button>
    </div>
  );
}
