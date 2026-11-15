'use client';

import type { StoreTheme, ThemeDraft } from '@/shared/contracts/store-theme';

import { metaOf } from './saved-meta';
import { useAutosave } from './use-autosave';
import type { SaveStatus } from './use-autosave';
import { usePublish } from './use-publish';
import { useThemeMedia } from './use-theme-media';

export type EditorStatus = SaveStatus | 'published';

interface ThemeSyncInput {
  readonly draft: ThemeDraft;
  readonly isValid: boolean;
  readonly theme: StoreTheme;
  readonly onFieldFailure: (field: string) => void;
}

export function useThemeSync({ draft, isValid, theme, onFieldFailure }: ThemeSyncInput) {
  const autosave = useAutosave(draft, isValid, metaOf(theme));
  const images = useThemeMedia(theme.media, autosave.record);
  const publication = usePublish({
    meta: autosave.meta,
    isDirty: autosave.isDirty,
    isValid,
    flush: autosave.flush,
    record: autosave.record,
    onFieldFailure,
  });
  const status: EditorStatus = publication.state === 'done' ? 'published' : autosave.status;

  return {
    status,
    failures: [autosave.failure, publication.failure] as const,
    flush: autosave.flush,
    images,
    publishState: publication.state,
    publish: publication.publish,
    clearFailure: publication.clearFailure,
  };
}
