'use client';

import { useRouter } from 'next/navigation';

import { strings } from '@/shared/i18n/strings';

import { useEditor } from '../editor-context';
import { BackArrow, Desktop, HomeOutline, Phone, Redo, Undo } from '../editor-icons';
import { DeviceButton } from './device-button';
import { PublishButton } from './publish-button';
import { SaveIndicator } from './save-indicator';

const t = strings.storeEditor;

const ICON_BUTTON =
  'flex size-9 items-center justify-center rounded-[9px] text-foreground transition-colors duration-150 hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-35 max-[899px]:size-11';

function StoreTitle() {
  const { draft, data, flush } = useEditor();
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        aria-label={t.back}
        onClick={() => {
          void flush().then((isSaved) => {
            if (isSaved) router.push('/');
          });
        }}
        className="border-border bg-card hover:bg-muted flex size-10 shrink-0 items-center justify-center rounded-[10px] border transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none max-[899px]:size-11"
      >
        <BackArrow className="size-[18px]" strokeWidth={2} />
      </button>
      <div className="flex min-w-0 flex-col gap-0.5 max-[899px]:flex-1">
        <span className="text-[17px] font-extrabold tracking-[-0.02em] whitespace-nowrap">
          {t.title}
        </span>
        <span className="text-fine truncate text-(--txt-dim)">
          {draft.identity.storeName} · <b>{`${data.subdomain}${t.domainSuffix}`}</b>
        </span>
      </div>
    </>
  );
}

export function TopBar() {
  const { undo, redo, canUndo, canRedo } = useEditor();

  return (
    <header className="border-border bg-card flex min-w-0 items-center gap-3 border-b px-4 [grid-area:top] max-[899px]:flex-wrap max-[899px]:gap-y-2.5 max-[899px]:px-3 max-[899px]:py-2.5">
      <div className="contents max-[899px]:flex max-[899px]:w-full max-[899px]:items-center max-[899px]:gap-3">
        <StoreTitle />
        <PublishButton className="min-[900px]:order-last" />
      </div>
      <div className="min-w-0 flex-1 max-[899px]:hidden" />
      <div className="flex items-center gap-2">
        <span className="border-border bg-card text-note hidden h-[38px] items-center gap-2 rounded-[10px] border px-3 font-bold min-[900px]:flex">
          <HomeOutline className="size-4" strokeWidth={1.9} />
          <span>{t.homePage}</span>
        </span>
        <div
          role="group"
          aria-label={t.device.group}
          className="bg-muted flex gap-0.5 rounded-[10px] p-[3px]"
        >
          <DeviceButton device="desktop" label={t.device.desktop} icon={Desktop} />
          <DeviceButton device="mobile" label={t.device.mobile} icon={Phone} />
        </div>
        <div className="flex gap-0.5">
          <button
            type="button"
            aria-label={t.undo}
            disabled={!canUndo}
            onClick={undo}
            className={ICON_BUTTON}
          >
            <Undo className="size-[17px]" strokeWidth={1.9} />
          </button>
          <button
            type="button"
            aria-label={t.redo}
            disabled={!canRedo}
            onClick={redo}
            className={ICON_BUTTON}
          >
            <Redo className="size-[17px]" strokeWidth={1.9} />
          </button>
        </div>
      </div>
      <div className="min-w-0 flex-1" />
      <SaveIndicator />
    </header>
  );
}
