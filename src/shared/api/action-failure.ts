import type { FailedAction } from '@/shared/forms/form-failure';
import { strings } from '@/shared/i18n/strings';

import { ApiError } from './client';

export function failedActionOf(error: unknown): FailedAction {
  if (!(error instanceof ApiError)) throw error;
  return error.field === undefined
    ? { status: 'failed', message: error.message }
    : { status: 'failed', message: error.message, field: error.field };
}

export function rejectedInput(): FailedAction {
  return { status: 'failed', message: strings.apiErrors.unexpected };
}
