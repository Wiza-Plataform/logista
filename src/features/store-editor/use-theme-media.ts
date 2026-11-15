'use client';

import { useRef, useState } from 'react';

import type { ThemeMedia } from '@/shared/contracts/store-theme';
import { useToast } from '@/shared/feedback/toaster';
import { imageFormOf, isAcceptedImage } from '@/shared/forms/image-file';
import { strings } from '@/shared/i18n/strings';

import { removeThemeImageAction, uploadThemeImageAction } from './actions';
import type { ThemeChangeResult } from './actions';
import type { ImageSlot } from './image-slot';
import type { SavedMeta } from './saved-meta';
import { unreachableFailure } from './unreachable-failure';

const t = strings.storeEditor.media;

const CONFIRMATIONS: Readonly<Record<ImageSlot, { upload: string; remove: string }>> = {
  logo: { upload: t.logoUploaded, remove: t.logoRemoved },
  bannerImage: { upload: t.bannerUploaded, remove: t.bannerRemoved },
};

export interface ImageTask {
  readonly slot: ImageSlot;
  readonly kind: 'upload' | 'remove';
}

export interface ThemeImages extends ThemeMedia {
  readonly task: ImageTask | null;
  readonly upload: (slot: ImageSlot, file: File) => void;
  readonly remove: (slot: ImageSlot) => void;
}

export function useThemeMedia(initial: ThemeMedia, record: (meta: SavedMeta) => void): ThemeImages {
  const toast = useToast();
  const [media, setMedia] = useState(initial);
  const [task, setTask] = useState<ImageTask | null>(null);
  const isRunning = useRef(false);

  function run(next: ImageTask, change: () => Promise<ThemeChangeResult>) {
    if (isRunning.current) return;
    isRunning.current = true;
    setTask(next);

    void change()
      .catch(unreachableFailure)
      .then((result) => {
        isRunning.current = false;
        setTask(null);
        if (result.status === 'failed') {
          toast(result.message, 'error');
          return;
        }
        setMedia(result.media);
        record({ revision: result.revision, publication: result.publication });
        toast(CONFIRMATIONS[next.slot][next.kind]);
      });
  }

  return {
    ...media,
    task,
    upload: (slot, file) => {
      if (!isAcceptedImage(file)) {
        toast(t.rejected, 'error');
        return;
      }
      run({ slot, kind: 'upload' }, () => uploadThemeImageAction(slot, imageFormOf(file)));
    },
    remove: (slot) => {
      run({ slot, kind: 'remove' }, () => removeThemeImageAction(slot));
    },
  };
}
