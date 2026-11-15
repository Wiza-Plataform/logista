'use client';

import { createContext, useContext, useMemo, useReducer, useState } from 'react';
import type { ReactNode } from 'react';

import type { ThemeDraft } from '@/shared/contracts/store-theme';
import type { FormFailure } from '@/shared/forms/form-failure';

import type { DraftChange, SectionKey } from './draft-model';
import { sectionOf } from './draft-model';
import { historyReducer, startHistory } from './draft-history';
import type { HistoryAction } from './draft-history';
import { validateDraft } from './draft-validation';
import type { FieldMessages } from './draft-validation';
import type { EditorData } from './editor-data';
import { useIsNarrowViewport } from './use-is-narrow-viewport';
import type { PublishState } from './use-publish';
import type { ThemeImages } from './use-theme-media';
import { useThemeSync } from './use-theme-sync';
import type { EditorStatus } from './use-theme-sync';

export type EditorTab = 'sections' | 'style' | 'templates' | 'brand';
export type PreviewDevice = 'desktop' | 'mobile';

const FALLBACK_SECTION: SectionKey = 'products';
const BRAND_FIELD_PREFIX = 'identity.';

export interface EditorApi {
  readonly data: EditorData;
  readonly draft: ThemeDraft;
  readonly errors: FieldMessages;
  readonly edit: (change: DraftChange, typingKey?: string) => void;
  readonly undo: () => void;
  readonly redo: () => void;
  readonly canUndo: boolean;
  readonly canRedo: boolean;
  readonly selected: SectionKey;
  readonly select: (key: SectionKey) => void;
  readonly tab: EditorTab;
  readonly setTab: (tab: EditorTab) => void;
  readonly device: PreviewDevice;
  readonly setDevice: (device: PreviewDevice) => void;
  readonly status: EditorStatus;
  readonly flush: () => Promise<boolean>;
  readonly images: ThemeImages;
  readonly publishState: PublishState;
  readonly publish: () => void;
}

const EditorContext = createContext<EditorApi | null>(null);

function initialDraftOf(data: EditorData): ThemeDraft {
  const { template, style, identity, sections, pageOrder } = data.theme;
  return { template, style, identity, sections, pageOrder };
}

function mergeErrors(
  client: FieldMessages,
  failures: readonly (FormFailure | null)[],
): FieldMessages {
  const server = failures.flatMap((failure) =>
    failure?.field === undefined ? [] : [[failure.field, failure.message] as const],
  );
  return { ...Object.fromEntries(server), ...client };
}

export function EditorProvider({ data, children }: { data: EditorData; children: ReactNode }) {
  const [history, dispatch] = useReducer(historyReducer, startHistory(initialDraftOf(data)));
  const [chosen, setChosen] = useState<SectionKey>(FALLBACK_SECTION);
  const [tab, setTab] = useState<EditorTab>('sections');
  const [chosenDevice, setDevice] = useState<PreviewDevice | null>(null);
  const isNarrow = useIsNarrowViewport();

  const draft = history.present;
  const clientErrors = useMemo(() => validateDraft(draft), [draft]);
  const sync = useThemeSync({
    draft,
    isValid: Object.keys(clientErrors).length === 0,
    theme: data.theme,
    onFieldFailure: (field) => {
      if (field.startsWith(BRAND_FIELD_PREFIX)) setTab('brand');
    },
  });

  const change = (action: HistoryAction) => {
    sync.clearFailure();
    dispatch(action);
  };

  const api: EditorApi = {
    data,
    draft,
    errors: mergeErrors(clientErrors, sync.failures),
    edit: (draftChange, typingKey) => {
      change({ type: 'edit', change: draftChange, key: typingKey ?? null, at: Date.now() });
    },
    undo: () => {
      change({ type: 'undo' });
    },
    redo: () => {
      change({ type: 'redo' });
    },
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    selected: sectionOf(draft.sections, chosen) === null ? FALLBACK_SECTION : chosen,
    select: setChosen,
    tab,
    setTab,
    device: chosenDevice ?? (isNarrow ? 'mobile' : 'desktop'),
    setDevice,
    status: sync.status,
    flush: sync.flush,
    images: sync.images,
    publishState: sync.publishState,
    publish: sync.publish,
  };

  return <EditorContext.Provider value={api}>{children}</EditorContext.Provider>;
}

export function useEditor(): EditorApi {
  const api = useContext(EditorContext);
  if (api === null) throw new Error('useEditor fora do EditorProvider.');
  return api;
}
