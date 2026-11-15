'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';

import { ACCEPTED_IMAGE_TYPES } from '@/shared/forms/image-file';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import { useEditor } from '../editor-context';
import { Spinner, TrashCan } from '../editor-icons';
import type { ImageSlot } from '../image-slot';

const FOCUS =
  'transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

export const SECONDARY_BUTTON = cn(
  'border-border bg-card text-foreground hover:bg-muted text-note flex h-[38px] items-center gap-2 rounded-[10px] border px-3 font-bold whitespace-nowrap max-[899px]:h-11',
  FOCUS,
);

export const DROPZONE = cn(
  'bg-(--surface-2) hover:bg-muted text-sm flex min-h-[84px] w-full flex-col items-center justify-center gap-1.5 rounded-[12px] border-[1.5px] border-dashed border-(--border) p-3 font-semibold text-(--txt-dim)',
  FOCUS,
);

export function useImageSlot(slot: ImageSlot) {
  const { images } = useEditor();
  const task = images.task;

  return {
    isLocked: task !== null,
    isUploading: task?.slot === slot && task.kind === 'upload',
    isRemoving: task?.slot === slot && task.kind === 'remove',
    upload: (file: File) => {
      images.upload(slot, file);
    },
    remove: () => {
      images.remove(slot);
    },
  };
}

export function ImagePicker({
  isDisabled,
  isBusy,
  className,
  children,
  onPick,
}: {
  readonly isDisabled: boolean;
  readonly isBusy: boolean;
  readonly className: string;
  readonly children: ReactNode;
  readonly onPick: (file: File) => void;
}) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        disabled={isDisabled}
        aria-busy={isBusy}
        className={className}
        onClick={() => {
          input.current?.click();
        }}
      >
        {children}
      </button>
      <input
        ref={input}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        hidden
        tabIndex={-1}
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (file !== undefined) onPick(file);
        }}
      />
    </>
  );
}

export function ImageRemoveButton({
  label,
  isDisabled,
  isBusy,
  onRemove,
}: {
  readonly label: string;
  readonly isDisabled: boolean;
  readonly isBusy: boolean;
  readonly onRemove: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={isBusy ? strings.storeEditor.media.removing : label}
      title={label}
      disabled={isDisabled}
      aria-busy={isBusy}
      onClick={onRemove}
      className={cn(SECONDARY_BUTTON, 'w-[38px] justify-center px-0 max-[899px]:w-11')}
    >
      {isBusy ? (
        <Spinner className="size-[15px] motion-safe:animate-spin" strokeWidth={2.4} />
      ) : (
        <TrashCan className="size-[15px]" strokeWidth={2} />
      )}
    </button>
  );
}
