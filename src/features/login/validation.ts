import { signInSchema } from '../../shared/contracts/merchant-account.ts';

export type SignInField = 'email' | 'password';

export type SignInProblem = 'emailAndPassword' | 'email' | 'password';

export type SignInFailure = { status: number; field?: string | undefined; message: string };

export type SignInResult = { ok: true } | ({ ok: false } & SignInFailure);

export function invalidSignInFields(email: string, password: string): SignInField[] {
  const fields: SignInField[] = [];
  if (!signInSchema.shape.email.safeParse(email.trim()).success) fields.push('email');
  if (password === '') fields.push('password');
  return fields;
}

export function signInProblem(fields: readonly SignInField[]): SignInProblem | null {
  const isEmailInvalid = fields.includes('email');
  const isPasswordInvalid = fields.includes('password');
  if (isEmailInvalid && isPasswordInvalid) return 'emailAndPassword';
  if (isEmailInvalid) return 'email';
  if (isPasswordInvalid) return 'password';
  return null;
}

export function toSignInField(apiField: string | undefined): SignInField | undefined {
  return apiField === 'email' || apiField === 'password' ? apiField : undefined;
}

export function fieldsBlamedBy(failure: SignInFailure): SignInField[] {
  const field = toSignInField(failure.field);
  if (field !== undefined) return [field];
  return failure.status === 401 ? ['password'] : [];
}
