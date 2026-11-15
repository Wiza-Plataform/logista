'use client';

import type { CSSProperties } from 'react';

import type { DragBindings, GripKeyHandler } from '@/shared/forms/use-drag-order';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import type { SectionKey } from '../draft-model';
import { sectionOf, toggleHidden } from '../draft-model';
import { useEditor } from '../editor-context';
import { EyeOpen, EyeShut, GripDots } from '../editor-icons';
import { sectionMetaOf } from '../section-catalog';

const t = strings.storeEditor.sections;

export interface SectionRowDrag {
  readonly bindings: DragBindings;
  readonly onGripKeyDown: GripKeyHandler;
  readonly isDragging: boolean;
}

function RowGrip({
  label,
  drag,
}: {
  readonly label: string;
  readonly drag?: SectionRowDrag | undefined;
}) {
  if (drag === undefined) return <span className="w-[18px] shrink-0 max-[899px]:hidden" />;

  return (
    <button
      type="button"
      aria-label={`${t.move}${label}`}
      onKeyDown={drag.onGripKeyDown}
      className="flex w-[18px] shrink-0 cursor-grab justify-center text-(--txt-faint) focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none max-[899px]:hidden"
    >
      <GripDots className="size-3.5" />
    </button>
  );
}

function rowOpacity(isDragging: boolean, isHidden: boolean): number {
  if (isDragging) return 0.4;
  return isHidden ? 0.55 : 1;
}

function VisibilityToggle({
  section,
  label,
  isHidden,
}: {
  readonly section: SectionKey;
  readonly label: string;
  readonly isHidden: boolean;
}) {
  const { edit } = useEditor();

  return (
    <button
      type="button"
      aria-label={`${isHidden ? t.show : t.hide}${label}`}
      aria-pressed={isHidden}
      onClick={() => {
        edit(toggleHidden(section));
      }}
      className={cn(
        'flex size-[34px] shrink-0 items-center justify-center rounded-[8px] text-(--txt-dim) transition-opacity duration-150 group-hover/row:opacity-100 focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none max-[899px]:size-11 max-[899px]:opacity-100',
        isHidden ? 'opacity-100' : 'opacity-0',
      )}
    >
      {isHidden ? <EyeShut className="size-4" /> : <EyeOpen className="size-4" />}
    </button>
  );
}

export function SectionRow({
  section,
  drag,
}: {
  readonly section: SectionKey;
  readonly drag?: SectionRowDrag | undefined;
}) {
  const { draft, selected, select } = useEditor();
  const { label, icon: Icon } = sectionMetaOf(section);
  const isHidden = sectionOf(draft.sections, section)?.hidden ?? false;
  const isSelected = selected === section;
  const dim: CSSProperties = { opacity: rowOpacity(drag?.isDragging === true, isHidden) };

  return (
    <div
      {...drag?.bindings}
      style={dim}
      className={cn(
        'group/row flex items-center gap-0.5 rounded-[10px]',
        isSelected && 'bg-(--active-bg) shadow-[inset_0_0_0_1px_var(--active-ring)]',
      )}
    >
      <RowGrip label={label} drag={drag} />
      <button
        type="button"
        aria-current={isSelected}
        onClick={() => {
          select(section);
        }}
        className={cn(
          'text-body hover:bg-muted flex min-h-10 min-w-0 flex-1 items-center gap-2.5 rounded-[8px] px-2 text-left focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none max-[899px]:min-h-11',
          isSelected ? 'font-extrabold' : 'font-semibold',
        )}
      >
        <Icon className="size-[17px] shrink-0" />
        <span className="truncate">{label}</span>
      </button>
      <VisibilityToggle section={section} label={label} isHidden={isHidden} />
    </div>
  );
}
