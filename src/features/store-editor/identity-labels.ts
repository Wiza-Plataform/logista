import { formatPhoneAO } from '@/shared/i18n/format';

export function instagramLabel(handle: string | null): string | null {
  if (handle === null || handle.trim() === '') return null;
  return `@${handle.trim().replace(/^@/, '').toLowerCase()}`;
}

export function whatsappLabel(phone: string | null): string | null {
  return phone === null || phone.trim() === '' ? null : formatPhoneAO(phone);
}
