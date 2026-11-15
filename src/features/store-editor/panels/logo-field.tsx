'use client';

import { useMemo } from 'react';

import { strings } from '@/shared/i18n/strings';

import { ControlHint } from '../controls/control-group';
import {
  ImagePicker,
  ImageRemoveButton,
  SECONDARY_BUTTON,
  useImageSlot,
} from '../controls/image-picker';
import { useEditor } from '../editor-context';
import { Spinner, UploadTray } from '../editor-icons';
import { previewThemeOf } from '../preview/preview-theme';
import { storeInitialOf } from '../store-initial';

const t = strings.storeEditor.media;

const TILE = 'size-[52px] shrink-0 rounded-[14px]';

function LogoTile() {
  const { draft, images } = useEditor();
  const theme = useMemo(() => previewThemeOf(draft.style), [draft.style]);

  if (images.logoUrl !== null) {
    return (
      <img
        src={images.logoUrl}
        alt={t.logoAlt}
        className={`${TILE} border-border bg-card border object-contain`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${TILE} flex items-center justify-center font-extrabold`}
      style={{
        background: theme.preset.primary,
        color: theme.preset.onPrimary,
        fontFamily: theme.displayFont,
        fontSize: 24,
      }}
    >
      {storeInitialOf(draft.identity.storeName)}
    </span>
  );
}

function pickerLabel(isUploading: boolean, hasLogo: boolean): string {
  if (isUploading) return t.uploading;
  return hasLogo ? t.replace : t.uploadLogo;
}

export function LogoField() {
  const { images } = useEditor();
  const slot = useImageSlot('logo');
  const hasLogo = images.logoUrl !== null;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-foreground text-sm font-medium">{t.logo}</span>
      <div className="flex flex-wrap items-center gap-3">
        <LogoTile />
        <div className="flex items-center gap-2">
          <ImagePicker
            isDisabled={slot.isLocked}
            isBusy={slot.isUploading}
            className={SECONDARY_BUTTON}
            onPick={slot.upload}
          >
            {slot.isUploading ? (
              <Spinner className="size-[15px] motion-safe:animate-spin" strokeWidth={2.4} />
            ) : (
              <UploadTray className="size-[15px]" strokeWidth={2} />
            )}
            <span>{pickerLabel(slot.isUploading, hasLogo)}</span>
          </ImagePicker>
          {hasLogo && (
            <ImageRemoveButton
              label={t.removeLogo}
              isDisabled={slot.isLocked}
              isBusy={slot.isRemoving}
              onRemove={slot.remove}
            />
          )}
        </div>
      </div>
      <ControlHint>{t.logoHint}</ControlHint>
    </div>
  );
}
