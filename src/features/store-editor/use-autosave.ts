'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { ThemeDraft } from '@/shared/contracts/store-theme';
import type { FormFailure } from '@/shared/forms/form-failure';

import { saveThemeDraftAction } from './actions';
import { payloadOf } from './draft-model';
import { hasUnpublished, newerMeta } from './saved-meta';
import type { SavedMeta } from './saved-meta';
import { unreachableFailure } from './unreachable-failure';

const DEBOUNCE_MS = 800;
const RETRY_MS = 10_000;

export type SaveStatus = 'saving' | 'failed' | 'invalid' | 'unpublished' | 'upToDate';

function serialize(draft: ThemeDraft): string {
  return JSON.stringify(payloadOf(draft));
}

function statusOf(input: {
  readonly isValid: boolean;
  readonly failure: FormFailure | null;
  readonly isDirty: boolean;
  readonly meta: SavedMeta;
}): SaveStatus {
  if (!input.isValid) return 'invalid';
  if (input.failure !== null) return 'failed';
  if (input.isDirty) return 'saving';
  return hasUnpublished(input.meta) ? 'unpublished' : 'upToDate';
}

export function useAutosave(draft: ThemeDraft, isValid: boolean, initialMeta: SavedMeta) {
  const body = serialize(draft);
  const [savedBody, setSavedBody] = useState(body);
  const [meta, setMeta] = useState(initialMeta);
  const [failure, setFailure] = useState<FormFailure | null>(null);

  const latest = useRef({ body, isValid, savedBody });
  const running = useRef<Promise<boolean> | null>(null);

  useEffect(() => {
    latest.current = { body, isValid, savedBody };
  }, [body, isValid, savedBody]);

  const record = useCallback((next: SavedMeta) => {
    setMeta((current) => newerMeta(current, next));
  }, []);

  const runSave = useCallback(async (): Promise<boolean> => {
    for (;;) {
      const { body: next, isValid: canSave, savedBody: saved } = latest.current;
      if (!canSave) return false;
      if (next === saved) return true;

      const result = await saveThemeDraftAction(JSON.parse(next) as ThemeDraft).catch(
        unreachableFailure,
      );
      if (result.status === 'failed') {
        setFailure(result);
        return false;
      }
      latest.current = { ...latest.current, savedBody: next };
      setSavedBody(next);
      setFailure(null);
      record({ revision: result.revision, publication: result.publication });
    }
  }, [record]);

  const flush = useCallback(() => {
    running.current ??= runSave().finally(() => {
      running.current = null;
    });
    return running.current;
  }, [runSave]);

  const isDirty = body !== savedBody;

  if (!isDirty && failure !== null) setFailure(null);

  useEffect(() => {
    if (!isDirty || !isValid) return;
    const timer = setTimeout(() => void flush(), failure === null ? DEBOUNCE_MS : RETRY_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [body, isDirty, isValid, failure, flush]);

  useEffect(() => {
    if (!isDirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => {
      window.removeEventListener('beforeunload', warn);
    };
  }, [isDirty]);

  return {
    status: statusOf({ isValid, failure, isDirty, meta }),
    failure,
    flush,
    meta,
    record,
    isDirty,
  };
}
