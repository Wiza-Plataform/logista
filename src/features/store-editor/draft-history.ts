import type { ThemeDraft } from '@/shared/contracts/store-theme';

import type { DraftChange } from './draft-model';

const HISTORY_LIMIT = 50;
const COALESCE_MS = 800;

export interface DraftHistory {
  readonly present: ThemeDraft;
  readonly past: readonly ThemeDraft[];
  readonly future: readonly ThemeDraft[];
  readonly lastKey: string | null;
  readonly lastAt: number;
}

export type HistoryAction =
  | {
      readonly type: 'edit';
      readonly change: DraftChange;
      readonly key: string | null;
      readonly at: number;
    }
  | { readonly type: 'undo' }
  | { readonly type: 'redo' };

export function startHistory(present: ThemeDraft): DraftHistory {
  return { present, past: [], future: [], lastKey: null, lastAt: 0 };
}

function edited(
  history: DraftHistory,
  action: Extract<HistoryAction, { type: 'edit' }>,
): DraftHistory {
  const next = action.change(history.present);
  if (next === history.present) return history;

  const isSameTyping =
    action.key !== null &&
    action.key === history.lastKey &&
    action.at - history.lastAt < COALESCE_MS;

  return {
    present: next,
    past: isSameTyping ? history.past : [...history.past, history.present].slice(-HISTORY_LIMIT),
    future: [],
    lastKey: action.key,
    lastAt: action.at,
  };
}

function undone(history: DraftHistory): DraftHistory {
  const previous = history.past.at(-1);
  if (previous === undefined) return history;
  return {
    present: previous,
    past: history.past.slice(0, -1),
    future: [history.present, ...history.future],
    lastKey: null,
    lastAt: 0,
  };
}

function redone(history: DraftHistory): DraftHistory {
  const [next, ...rest] = history.future;
  if (next === undefined) return history;
  return {
    present: next,
    past: [...history.past, history.present],
    future: rest,
    lastKey: null,
    lastAt: 0,
  };
}

export function historyReducer(history: DraftHistory, action: HistoryAction): DraftHistory {
  switch (action.type) {
    case 'edit':
      return edited(history, action);
    case 'undo':
      return undone(history);
    case 'redo':
      return redone(history);
  }
}
