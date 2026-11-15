export const IMAGE_FIELD = 'image';
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

const MAX_IMAGE_MEGABYTES = 5;
const BYTES_PER_MEGABYTE = 1024 * 1024;
const MAX_IMAGE_BYTES = MAX_IMAGE_MEGABYTES * BYTES_PER_MEGABYTE;

export function isAcceptedImage(file: File): boolean {
  const isAcceptedType = ACCEPTED_IMAGE_TYPES.some((type) => type === file.type);
  return isAcceptedType && file.size > 0 && file.size <= MAX_IMAGE_BYTES;
}

export function imageFormOf(file: File): FormData {
  const form = new FormData();
  form.append(IMAGE_FIELD, file);
  return form;
}
