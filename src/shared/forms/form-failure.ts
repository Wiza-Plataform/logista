export interface FormFailure {
  readonly message: string;
  readonly field?: string;
}

export interface FailedAction extends FormFailure {
  readonly status: 'failed';
}

export function fieldErrorOf(failure: FormFailure | null, field: string): string | undefined {
  return failure?.field === field ? failure.message : undefined;
}

export function generalErrorOf(
  failure: FormFailure | null,
  fieldNames: readonly string[],
): string | null {
  if (failure === null) return null;
  const isAboutAField = fieldNames.some((field) => field === failure.field);
  return isAboutAField ? null : failure.message;
}
