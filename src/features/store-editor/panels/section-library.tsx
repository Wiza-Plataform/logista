'use client';

import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import type { OptionalSection } from '../draft-model';
import { addOptionalSection, sectionOf } from '../draft-model';
import { useEditor } from '../editor-context';
import { Instagram, Padlock, QuestionCircle } from '../editor-icons';
import type { EditorIcon } from '../editor-icons';

const t = strings.storeEditor;

function LibraryItem({
  section,
  title,
  description,
  icon: Icon,
  onAdded,
}: {
  readonly section: OptionalSection;
  readonly title: string;
  readonly description: string;
  readonly icon: EditorIcon;
  readonly onAdded: () => void;
}) {
  const { draft, edit, select } = useEditor();
  const isAdded = sectionOf(draft.sections, section) !== null;

  return (
    <div className="border-border bg-card flex items-center gap-2.5 rounded-[10px] border p-2">
      <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[9px] bg-(--active-bg) text-(--active-fg)">
        <Icon className="size-[17px]" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-note font-bold">{title}</span>
        <span className="text-caption text-(--txt-dim)">{description}</span>
      </span>
      <button
        type="button"
        disabled={isAdded}
        onClick={() => {
          edit(addOptionalSection(section));
          select(section);
          onAdded();
        }}
        className={cn(
          'text-fine h-8 shrink-0 rounded-[8px] px-2.5 font-extrabold focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none max-[899px]:h-11',
          isAdded ? 'bg-muted text-(--txt-dim)' : 'bg-primary text-primary-foreground',
        )}
      >
        {isAdded ? t.sections.libraryAdded : t.sections.libraryAdd}
      </button>
    </div>
  );
}

function LockedItem() {
  return (
    <div className="bg-card flex items-center gap-2.5 rounded-[10px] border border-dashed border-(--border) p-2">
      <span className="bg-muted flex size-[34px] shrink-0 items-center justify-center rounded-[9px] text-(--txt-dim)">
        <Padlock className="size-4" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-note font-bold text-(--txt-dim)">{t.sections.proTitle}</span>
        <span className="text-caption text-(--txt-dim)">{t.sections.proDescription}</span>
      </span>
      <span className="bg-foreground text-background shrink-0 rounded-[6px] px-2 py-1 text-xs font-extrabold">
        {t.sections.proBadge}
      </span>
    </div>
  );
}

export function SectionLibrary({ onAdded }: { readonly onAdded: () => void }) {
  return (
    <div className="border-border bg-muted mt-2 flex flex-col gap-2 rounded-[12px] border p-2.5">
      <span className="px-1 pt-0.5 pb-1 text-xs font-extrabold tracking-[0.08em] text-(--txt-dim)">
        {t.sections.library}
      </span>
      <LibraryItem
        section="faq"
        title={t.sectionNames.faq}
        description={t.sections.faqDescription}
        icon={QuestionCircle}
        onAdded={onAdded}
      />
      <LibraryItem
        section="instagram"
        title={t.sectionNames.instagram}
        description={t.sections.instagramDescription}
        icon={Instagram}
        onAdded={onAdded}
      />
      <LockedItem />
    </div>
  );
}
