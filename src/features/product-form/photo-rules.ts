import { isAcceptedImage } from '@/shared/forms/image-file';
import { strings } from '@/shared/i18n/strings';

export const MAX_PHOTOS = 8;

export function selectPhotos(
  files: readonly File[],
  currentCount: number,
  report: (message: string) => void,
): readonly File[] {
  const accepted = files.filter(isAcceptedImage);
  if (accepted.length < files.length) report(strings.productForm.photoRejected);

  const room = Math.max(0, MAX_PHOTOS - currentCount);
  if (accepted.length > room) report(strings.productForm.photoLimit);
  return accepted.slice(0, room);
}
