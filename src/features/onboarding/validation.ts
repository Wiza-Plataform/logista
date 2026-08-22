import * as z from 'zod';

import { createStoreSchema } from '../../shared/contracts/store.ts';
import { isCompletePhoneAO } from '../../shared/i18n/format.ts';
import { MIN_SUBDOMAIN_LENGTH, deriveSubdomain } from './subdomain.ts';
import { STORE_FORM_FIELDS } from './types.ts';
import type { StoreFormField } from './types.ts';

export type FailureCode =
  | 'required'
  | 'invalidEmail'
  | 'nameTooShortForAddress'
  | 'nifTooShort'
  | 'phoneTooShort'
  | 'passwordTooShort';

export type Failures = Readonly<Record<string, FailureCode>>;

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_NIF_DIGITS = 10;
const MIN_NIF_DIGITS = 9;

export interface AccountFields {
  readonly name: string;
  readonly whatsappPhone: string;
  readonly email: string;
  readonly password: string;
}

export interface TaxFields {
  readonly nif: string;
  readonly fiscalName: string;
}

function digitsOf(value: string): string {
  return value.replace(/\D/g, '');
}

const accountSchema = createStoreSchema.pick({ name: true, email: true }).extend({
  whatsappPhone: z.string().refine(isCompletePhoneAO),
  password: z.string().min(MIN_PASSWORD_LENGTH),
});

const taxSchema = createStoreSchema.pick({ fiscalName: true }).extend({
  nif: z.string().refine((value) => digitsOf(value).length >= MIN_NIF_DIGITS),
});

interface Issue {
  readonly path: readonly PropertyKey[];
}

function failureCodeFor(field: string): FailureCode {
  switch (field) {
    case 'email':
      return 'invalidEmail';
    case 'whatsappPhone':
      return 'phoneTooShort';
    case 'password':
      return 'passwordTooShort';
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
    email: fields.email.trim(),
    whatsappPhone: fields.whatsappPhone,
    password: fields.password,
  });

  const failures: Record<string, FailureCode> = parsed.success
    ? {}
    : { ...toFailures(parsed.error.issues) };

  if (failures.name === undefined && deriveSubdomain(fields.name).length < MIN_SUBDOMAIN_LENGTH) {
    failures.name = 'nameTooShortForAddress';
  }

  return failures;
}

export function validateTax(fields: TaxFields): Failures {
  const parsed = taxSchema.safeParse({
    nif: fields.nif.trim(),
    fiscalName: fields.fiscalName.trim(),
  });

  return parsed.success ? {} : toFailures(parsed.error.issues);
}

export function isNifComplete(value: string): boolean {
  return digitsOf(value).length >= MIN_NIF_DIGITS;
}

const API_FIELD_ALIASES: Readonly<Record<string, StoreFormField>> = { subdomain: 'name' };

export function toFormField(apiField: string | undefined): StoreFormField | undefined {
  if (apiField === undefined) return undefined;

  const alias = API_FIELD_ALIASES[apiField];
  if (alias !== undefined) return alias;

  return STORE_FORM_FIELDS.find((field) => field === apiField);
}
