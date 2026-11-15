import type { RegisterMerchantAccountRequest } from '../../shared/contracts/merchant-account.ts';
import type { ThemePalette } from '../../shared/contracts/store-theme.ts';

export type PaletteChoice = ThemePalette | '';

export interface StoreForm {
  readonly name: string;
  readonly fullName: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
  readonly tagline: string;
  readonly palette: PaletteChoice;
}

export type StoreFormField = keyof StoreForm;

export const EMPTY_FORM: StoreForm = {
  name: '',
  fullName: '',
  phone: '',
  email: '',
  password: '',
  tagline: '',
  palette: '',
};

export const STORE_FORM_FIELDS: readonly StoreFormField[] = [
  'name',
  'fullName',
  'phone',
  'email',
  'password',
  'tagline',
  'palette',
];

export const ACCOUNT_STEP_FIELDS: readonly StoreFormField[] = [
  'name',
  'fullName',
  'phone',
  'email',
  'password',
];

export type Failure = { ok: false; field?: string | undefined; message: string };

export type Result<T> = { ok: true; data: T } | Failure;

export interface StartStoreInput {
  readonly storeName: string;
  readonly account: RegisterMerchantAccountRequest | null;
}

export type StartStoreResult =
  { ok: true; data: { storeUlid: string } } | (Failure & { hasAccount: boolean });

export type FieldMessages = Readonly<Record<string, string>>;
