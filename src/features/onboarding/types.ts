import type { VatRegime } from '@/shared/contracts/store';

export interface StoreForm {
  readonly name: string;
  readonly subdomain: string;
  readonly categoryUlid: string;
  readonly whatsappPhone: string;
  readonly email: string;
  readonly nif: string;
  readonly bizTypeUlid: string;
  readonly vatRegime: VatRegime;
  readonly description: string;
  readonly primaryColor: string;
}

export type StoreFormField = keyof StoreForm;

export const EMPTY_FORM: StoreForm = {
  name: '',
  subdomain: '',
  categoryUlid: '',
  whatsappPhone: '',
  email: '',
  nif: '',
  bizTypeUlid: '',
  vatRegime: 'EXEMPT',
  description: '',
  primaryColor: '',
};

export const STORE_FORM_FIELDS: readonly StoreFormField[] = [
  'name',
  'subdomain',
  'categoryUlid',
  'whatsappPhone',
  'email',
  'nif',
  'bizTypeUlid',
  'vatRegime',
  'description',
  'primaryColor',
];

export const ACCOUNT_FIELDS: readonly StoreFormField[] = [
  'name',
  'subdomain',
  'categoryUlid',
  'whatsappPhone',
  'email',
];

export type Result<T> =
  { ok: true; data: T } | { ok: false; field?: string | undefined; message: string };

export type FieldMessages = Readonly<Record<string, string>>;
