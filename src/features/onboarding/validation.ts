import * as z from 'zod';

import { registerMerchantAccountSchema } from '../../shared/contracts/merchant-account.ts';
import { isCompletePhoneAO } from '../../shared/i18n/format.ts';
import { STORE_FORM_FIELDS } from './types.ts';
import type { StoreFormField } from './types.ts';

export type FailureCode = 'required' | 'invalidEmail' | 'phoneTooShort' | 'passwordTooShort';

export type Failures = Readonly<Record<string, FailureCode>>;

export interface AccountFields {
  readonly name: string;
  readonly fullName: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
}

const accountSchema = registerMerchantAccountSchema.extend({
  phone: z.string().refine(isCompletePhoneAO),
});

interface Issue {
  readonly path: readonly PropertyKey[];
}

function failureCodeFor(field: string): FailureCode {
  switch (field) {
    case 'email':
      return 'invalidEmail';
    case 'phone':
      return 'phoneTooShort';
    case 'password':
      return 'passwordTooShort';
    default:
      return 'required';
  }
}

function toFailures(issues: readonly Issue[]): Record<string, FailureCode> {
  const failures = new Map<string, FailureCode>();

  for (const issue of issues) {
    const field = String(issue.path.at(0) ?? '');
    if (field !== '' && !failures.has(field)) failures.set(field, failureCodeFor(field));
  }

  return Object.fromEntries(failures);
}

export function validateAccount(fields: AccountFields, withAccount: boolean): Failures {
  const failures: Record<string, FailureCode> = {};
  if (fields.name.trim() === '') failures.name = 'required';
  if (!withAccount) return failures;

  const parsed = accountSchema.safeParse({
    fullName: fields.fullName.trim(),
    email: fields.email.trim(),
    phone: fields.phone,
    password: fields.password,
  });

  return parsed.success ? failures : { ...failures, ...toFailures(parsed.error.issues) };
}

export function toFormField(apiField: string | undefined): StoreFormField | undefined {
  if (apiField === undefined) return undefined;
  return STORE_FORM_FIELDS.find((field) => field === apiField);
}
