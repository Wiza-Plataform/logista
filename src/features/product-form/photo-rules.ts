import { strings } from '@/shared/i18n/strings';

export const MAX_PHOTOS = 8;
export const PHOTO_FIELD = 'image';
export const ACCEPTED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

const MAX_PHOTO_MEGABYTES = 5;
const BYTES_PER_MEGABYTE = 1024 * 1024;
const MAX_PHOTO_BYTES = MAX_PHOTO_MEGABYTES * BYTES_PER_MEGABYTE;

export function isAcceptedPhoto(file: File): boolean {
  const isAcceptedType = ACCEPTED_PHOTO_TYPES.some((type) => type === file.type);
  return isAcceptedType && file.size > 0 && file.size <= MAX_PHOTO_BYTES;
}

export function selectPhotos(
  files: readonly File[],
  currentCount: number,
  report: (message: string) => void,
): readonly File[] {
  const accepted = files.filter(isAcceptedPhoto);
  if (accepted.length < files.length) report(strings.productForm.photoRejected);

  const room = Math.max(0, MAX_PHOTOS - currentCount);
  if (accepted.length > room) report(strings.productForm.photoLimit);
  return accepted.slice(0, room);
}

export function photoFormOf(file: File): FormData {
  const form = new FormData();
  form.append(PHOTO_FIELD, file);
  return form;
}
