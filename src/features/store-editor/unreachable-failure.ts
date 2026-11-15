import { unstable_rethrow } from 'next/navigation';

import type { FailedAction } from '@/shared/forms/form-failure';
import { strings } from '@/shared/i18n/strings';

export function unreachableFailure(error: unknown): FailedAction {
  unstable_rethrow(error);
  return { status: 'failed', message: strings.apiErrors.offline };
}
