import { strings } from '@/shared/i18n/strings';

import type { FieldMessages } from './types';
import type { FailureCode, Failures } from './validation';

function messageFor(code: FailureCode): string {
  const t = strings.onboarding;

  switch (code) {
    case 'invalidEmail':
      return t.invalidEmail;
    case 'subdomainTooShort':
      return t.subdomainTooShort;
    case 'nifTooShort':
      return t.nifTooShort;
    case 'phoneTooShort':
      return t.phoneTooShort;
    default:
      return t.requiredField;
  }
}

export function toFieldMessages(failures: Failures): FieldMessages {
  return Object.fromEntries(
    Object.entries(failures).map(([field, code]) => [field, messageFor(code)]),
  );
}
