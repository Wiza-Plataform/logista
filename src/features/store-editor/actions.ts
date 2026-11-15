'use server';

import { failedActionOf, rejectedInput } from '@/shared/api/action-failure';
import { themeDraftSchema } from '@/shared/contracts/store-theme';
import type { StoreTheme, ThemeDraft, ThemeMedia } from '@/shared/contracts/store-theme';
import type { FailedAction } from '@/shared/forms/form-failure';
import { IMAGE_FIELD, isAcceptedImage } from '@/shared/forms/image-file';
import { strings } from '@/shared/i18n/strings';
import { requireStoreUlid } from '@/shared/session/guards';

import { publishTheme, removeThemeImage, saveThemeDraft, uploadThemeImage } from './api';
import { imageSlotSchema } from './image-slot';
import type { ImageSlot } from './image-slot';
import { metaOf } from './saved-meta';
import type { SavedMeta } from './saved-meta';

export type SaveDraftResult = ({ readonly status: 'saved' } & SavedMeta) | FailedAction;

export type ThemeChangeResult =
  ({ readonly status: 'done'; readonly media: ThemeMedia } & SavedMeta) | FailedAction;

function rejectedImage(): FailedAction {
  return { status: 'failed', message: strings.storeEditor.media.rejected, field: IMAGE_FIELD };
}

async function changeTheme(
  change: (storeUlid: string) => Promise<StoreTheme>,
): Promise<ThemeChangeResult> {
  try {
    const theme = await change(await requireStoreUlid());
    return { status: 'done', media: theme.media, ...metaOf(theme) };
  } catch (error) {
    return failedActionOf(error);
  }
}

export async function saveThemeDraftAction(input: ThemeDraft): Promise<SaveDraftResult> {
  const parsed = themeDraftSchema.safeParse(input);
  if (!parsed.success) return rejectedInput();

  try {
    const storeUlid = await requireStoreUlid();
    const saved = await saveThemeDraft(storeUlid, parsed.data);
    return { status: 'saved', ...metaOf(saved) };
  } catch (error) {
    return failedActionOf(error);
  }
}

export async function publishThemeAction(): Promise<ThemeChangeResult> {
  return changeTheme((storeUlid) => publishTheme(storeUlid));
}

export async function uploadThemeImageAction(
  slot: ImageSlot,
  form: FormData,
): Promise<ThemeChangeResult> {
  const parsedSlot = imageSlotSchema.safeParse(slot);
  if (!parsedSlot.success) return rejectedInput();

  const image = form.get(IMAGE_FIELD);
  if (!(image instanceof File) || !isAcceptedImage(image)) return rejectedImage();

  return changeTheme((storeUlid) => uploadThemeImage(storeUlid, parsedSlot.data, image));
}

export async function removeThemeImageAction(slot: ImageSlot): Promise<ThemeChangeResult> {
  const parsedSlot = imageSlotSchema.safeParse(slot);
  if (!parsedSlot.success) return rejectedInput();

  return changeTheme((storeUlid) => removeThemeImage(storeUlid, parsedSlot.data));
}
