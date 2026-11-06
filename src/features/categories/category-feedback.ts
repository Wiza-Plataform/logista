import type { ToastTone } from '@/shared/feedback/toaster';
import { strings } from '@/shared/i18n/strings';

import type { CategoryActionResult } from './category-action-result';

const text = strings.categories;

export interface Feedback {
  readonly message: string;
  readonly tone: ToastTone;
}

function success(message: string): Feedback {
  return { message, tone: 'success' };
}

export function feedbackOf(result: CategoryActionResult): Feedback {
  switch (result.status) {
    case 'created':
      return success(text.created);
    case 'updated':
      return success(text.updated);
    case 'removed':
      return success(text.removed);
    case 'reordered':
      return success(text.reordered);
    case 'shown':
      return success(text.shown);
    case 'hidden':
      return success(text.hidden);
    case 'failed':
      return { message: result.message, tone: 'error' };
  }
}
