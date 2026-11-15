'use client';

import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import { useEditor } from '../editor-context';
import type { EditorTab } from '../editor-context';
import { Layers, LayoutGrid, Paint, Shopfront } from '../editor-icons';
import type { EditorIcon } from '../editor-icons';

const t = strings.storeEditor;

const TOOLS: readonly {
  readonly tab: EditorTab;
  readonly label: string;
  readonly icon: EditorIcon;
}[] = [
  { tab: 'sections', label: t.tabs.sections, icon: Layers },
  { tab: 'style', label: t.tabs.style, icon: Paint },
  { tab: 'templates', label: t.tabs.templates, icon: LayoutGrid },
  { tab: 'brand', label: t.tabs.brand, icon: Shopfront },
];

export function ToolRail() {
  const { tab, setTab } = useEditor();

  return (
    <nav
      aria-label={t.regions.tools}
      className="border-border bg-card flex flex-col items-center gap-1.5 border-r px-1.5 py-3 [grid-area:rail] max-[899px]:flex-row max-[899px]:justify-center max-[899px]:border-r-0 max-[899px]:border-b max-[899px]:p-1.5"
    >
      {TOOLS.map(({ tab: value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-pressed={tab === value}
          onClick={() => {
            setTab(value);
          }}
          className={cn(
            'text-label flex min-h-14 w-[52px] flex-col items-center justify-center gap-1 rounded-[12px] font-bold focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none',
            tab === value
              ? 'bg-(--active-bg) text-(--active-fg)'
              : 'text-muted-foreground hover:bg-muted',
          )}
        >
          <Icon className="size-5" strokeWidth={1.9} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
