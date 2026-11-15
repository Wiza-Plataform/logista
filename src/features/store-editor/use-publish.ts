'use client';

import { useRef, useState } from 'react';

import { useToast } from '@/shared/feedback/toaster';
import type { FormFailure } from '@/shared/forms/form-failure';
import { strings } from '@/shared/i18n/strings';

import { publishThemeAction } from './actions';
import { hasUnpublished } from './saved-meta';
import type { SavedMeta } from './saved-meta';
import { unreachableFailure } from './unreachable-failure';

const t = strings.storeEditor.publish;

export type PublishState = 'idle' | 'busy' | 'done';

interface PublishInput {
  readonly meta: SavedMeta;
  readonly isDirty: boolean;
  readonly isValid: boolean;
  readonly flush: () => Promise<boolean>;
  readonly record: (meta: SavedMeta) => void;
  readonly onFieldFailure: (field: string) => void;
}

type PublishOutcome =
  | { readonly status: 'published'; readonly meta: SavedMeta }
  | { readonly status: 'failed'; readonly message: string; readonly failure: FormFailure | null };

async function attemptPublish(
  flush: () => Promise<boolean>,
  isValid: boolean,
): Promise<PublishOutcome> {
  if (!(await flush())) {
    return { status: 'failed', message: isValid ? t.saveFailed : t.fixFields, failure: null };
  }
  const result = await publishThemeAction().catch(unreachableFailure);
  if (result.status === 'failed') {
    return { status: 'failed', message: result.message, failure: result };
  }
  return {
    status: 'published',
    meta: { revision: result.revision, publication: result.publication },
  };
}

function stateOf(isBusy: boolean, isDone: boolean): PublishState {
  if (isBusy) return 'busy';
  return isDone ? 'done' : 'idle';
}

export function usePublish(input: PublishInput) {
  const toast = useToast();
  const [isBusy, setIsBusy] = useState(false);
  const [publishedRevision, setPublishedRevision] = useState<number | null>(null);
  const [failure, setFailure] = useState<FormFailure | null>(null);
  const isRunning = useRef(false);

  const settle = (outcome: PublishOutcome) => {
    if (outcome.status === 'published') {
      input.record(outcome.meta);
      setPublishedRevision(outcome.meta.revision);
      return;
    }
    setFailure(outcome.failure);
    toast(outcome.message, 'error');
    if (outcome.failure?.field !== undefined) input.onFieldFailure(outcome.failure.field);
  };

  const isDone =
    publishedRevision === input.meta.revision && !input.isDirty && !hasUnpublished(input.meta);

  return {
    state: stateOf(isBusy, isDone),
    failure,
    clearFailure: () => {
      setFailure(null);
    },
    publish: () => {
      if (isRunning.current) return;
      isRunning.current = true;
      setIsBusy(true);
      setFailure(null);
      void attemptPublish(input.flush, input.isValid)
        .then(settle)
        .finally(() => {
          isRunning.current = false;
          setIsBusy(false);
        });
    },
  };
}
