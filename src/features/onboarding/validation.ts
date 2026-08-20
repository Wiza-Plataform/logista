import * as z from 'zod';

import { createStoreSchema } from '../../shared/contracts/store.ts';
import { isCompletePhoneAO } from '../../shared/i18n/format.ts';
import { STORE_FORM_FIELDS } from './types.ts';
import type { StoreFormField } from './types.ts';

export type FailureCode =
  'required' | 'invalidEmail' | 'subdomainTooShort' | 'nifTooShort' | 'phoneTooShort';

export type Failures = Readonly<Record<string, FailureCode>>;

export interface AccountFields {
  readonly name: string;
  readonly subdomain: string;
  readonly categoryUlid: string;
  readonly whatsappPhone: string;
  readonly email: string;
}

export interface TaxFields {
  readonly nif: string;
}

const MIN_NIF_DIGITS = 9;

function digitsOf(value: string): string {
  return value.replace(/\D/g, '');
}

const accountSchema = createStoreSchema
  .pick({ name: true, subdomain: true, categoryUlid: true, email: true })
  .extend({
    whatsappPhone: z.string().refine(isCompletePhoneAO),
  });

const taxSchema = z.object({
  nif: z.string().refine((value) => digitsOf(value).length >= MIN_NIF_DIGITS),
});

interface Issue {
  readonly path: readonly PropertyKey[];
}

function failureCodeFor(field: string): FailureCode {
  switch (field) {
    case 'email':
      return 'invalidEmail';
    case 'subdomain':
      return 'subdomainTooShort';
    case 'whatsappPhone':
      return 'phoneTooShort';
    case 'nif':
      return 'nifTooShort';
    default:
      return 'required';
  }
}

function toFailures(issues: readonly Issue[]): Failures {
  const failures = new Map<string, FailureCode>();

  for (const issue of issues) {
    const field = String(issue.path.at(0) ?? '');
    if (field !== '' && !failures.has(field)) failures.set(field, failureCodeFor(field));
  }

  return Object.fromEntries(failures);
}

export function validateAccount(fields: AccountFields): Failures {
  const parsed = accountSchema.safeParse({
    name: fields.name.trim(),
    subdomain: fields.subdomain.trim(),
    categoryUlid: fields.categoryUlid,
    email: fields.email.trim(),
    whatsappPhone: fields.whatsappPhone,
  });

  return parsed.success ? {} : toFailures(parsed.error.issues);
}

export function validateTax(fields: TaxFields): Failures {
  const parsed = taxSchema.safeParse({ nif: fields.nif.trim() });

  return parsed.success ? {} : toFailures(parsed.error.issues);
}

export function toFormField(apiField: string | undefined): StoreFormField | undefined {
  if (apiField === undefined) return undefined;
  return STORE_FORM_FIELDS.find((field) => field === apiField);
}
