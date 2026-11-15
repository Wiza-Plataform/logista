'use client';

import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import { useEditor } from '../editor-context';
import { Spinner, Tick, UploadTray } from '../editor-icons';
import type { PublishState } from '../use-publish';

const t = strings.storeEditor.publish;

const LABELS: Readonly<Record<PublishState, string>> = {
  idle: t.idle,
  busy: t.busy,
  done: t.done,
};

function PublishIcon({ state }: { readonly state: PublishState }) {
  if (state === 'busy') {
    return <Spinner className="size-4 motion-safe:animate-spin" strokeWidth={2.4} />;
  }
  if (state === 'done') return <Tick className="size-4" strokeWidth={2.4} />;
  return <UploadTray className="size-4" strokeWidth={2} />;
}

export function PublishButton({ className }: { readonly className?: string }) {
  const { publishState, publish } = useEditor();
  const isBusy = publishState === 'busy';

  return (
    <Button
      variant="brand"
      disabled={isBusy}
      aria-busy={isBusy}
      onClick={publish}
      className={cn(
        'text-body h-10 gap-2 rounded-[10px] px-4 font-extrabold disabled:opacity-100 max-[899px]:h-11',
        className,
      )}
    >
      <PublishIcon state={publishState} />
      <span>{LABELS[publishState]}</span>
    </Button>
  );
}
