export interface StoreForm {
  readonly name: string;
  readonly whatsappPhone: string;
  readonly email: string;
  readonly password: string;
  readonly nif: string;
  readonly fiscalName: string;
  readonly description: string;
  readonly primaryColor: string;
}

export type StoreFormField = keyof StoreForm;

export const EMPTY_FORM: StoreForm = {
  name: '',
  whatsappPhone: '',
  email: '',
  password: '',
  nif: '',
  fiscalName: '',
  description: '',
  primaryColor: '',
};

export const STORE_FORM_FIELDS: readonly StoreFormField[] = [
  'name',
  'whatsappPhone',
  'email',
  'password',
  'nif',
  'fiscalName',
  'description',
  'primaryColor',
];

export const ACCOUNT_FIELDS: readonly StoreFormField[] = [
  'name',
  'whatsappPhone',
  'email',
  'password',
];

export interface ProductDraft {
  readonly name: string;
  readonly category: string;
  readonly price: string;
  readonly stock: string;
  readonly weight: string;
  readonly description: string;
  readonly photos: readonly string[];
}

export type ProductDraftField = keyof Omit<ProductDraft, 'photos'>;

export const EMPTY_PRODUCT: ProductDraft = {
  name: '',
  category: '',
  price: '',
  stock: '',
  weight: '',
  description: '',
  photos: [],
};

export type Result<T> =
  { ok: true; data: T } | { ok: false; field?: string | undefined; message: string };

export type FieldMessages = Readonly<Record<string, string>>;
