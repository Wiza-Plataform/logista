'use client';

import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import { useEditor } from '../editor-context';
import type { EditorStatus } from '../use-theme-sync';

const t = strings.storeEditor;

const STATUS_TONE: ReadonlyMap<EditorStatus, string> = new Map([
  ['saving', 'bg-(--st-wait-fg)'],
  ['failed', 'bg-destructive'],
  ['invalid', 'bg-destructive'],
  ['unpublished', 'bg-(--st-wait-fg)'],
  ['upToDate', 'bg-(--st-paid-fg)'],
  ['published', 'bg-(--st-paid-fg)'],
]);

const STATUS_TEXT: ReadonlyMap<EditorStatus, string> = new Map([
  ['saving', t.status.saving],
  ['failed', t.status.failed],
  ['invalid', t.status.invalid],
  ['unpublished', t.status.unpublished],
  ['upToDate', t.status.upToDate],
  ['published', t.status.published],
]);

export function SaveIndicator() {
  const { status } = useEditor();

  return (
    <span
      role="status"
      className="text-sm inline-flex items-center gap-[7px] font-semibold whitespace-nowrap text-(--txt-dim)"
    >
      <span className={cn('size-[7px] rounded-full', STATUS_TONE.get(status))} />
      <span>{STATUS_TEXT.get(status)}</span>
    </span>
  );
}
