export function textOf(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

export function isSwitchOn(formData: FormData, key: string): boolean {
  return textOf(formData, key) === 'on';
}
