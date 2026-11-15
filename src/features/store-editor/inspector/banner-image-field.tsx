'use client';

import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import { ControlHint } from '../controls/control-group';
import {
  DROPZONE,
  ImagePicker,
  ImageRemoveButton,
  SECONDARY_BUTTON,
  useImageSlot,
} from '../controls/image-picker';
import { useEditor } from '../editor-context';
import { ImageFrame, Spinner, UploadTray } from '../editor-icons';

const t = strings.storeEditor.media;

function BusyIcon({ className }: { readonly className: string }) {
  return <Spinner className={cn(className, 'motion-safe:animate-spin')} strokeWidth={2.4} />;
}

function EmptyBanner() {
  const slot = useImageSlot('bannerImage');

  return (
    <ImagePicker
      isDisabled={slot.isLocked}
      isBusy={slot.isUploading}
      className={DROPZONE}
      onPick={slot.upload}
    >
      {slot.isUploading ? (
        <BusyIcon className="size-5" />
      ) : (
        <ImageFrame className="size-5" strokeWidth={1.8} />
      )}
      <span>{slot.isUploading ? t.uploading : t.uploadBanner}</span>
    </ImagePicker>
  );
}

function CurrentBanner({ src }: { readonly src: string }) {
  const slot = useImageSlot('bannerImage');

  return (
    <div className="flex flex-col gap-2">
      <img
        src={src}
        alt={t.bannerAlt}
        className="border-border aspect-[2/1] w-full rounded-[12px] border object-cover"
      />
      <div className="flex gap-2">
        <ImagePicker
          isDisabled={slot.isLocked}
          isBusy={slot.isUploading}
          className={cn(SECONDARY_BUTTON, 'flex-1 justify-center')}
          onPick={slot.upload}
        >
          {slot.isUploading ? (
            <BusyIcon className="size-[15px]" />
          ) : (
            <UploadTray className="size-[15px]" strokeWidth={2} />
          )}
          <span>{slot.isUploading ? t.uploading : t.replaceBanner}</span>
        </ImagePicker>
        <ImageRemoveButton
          label={t.removeBanner}
          isDisabled={slot.isLocked}
          isBusy={slot.isRemoving}
          onRemove={slot.remove}
        />
      </div>
    </div>
  );
}

export function BannerImageField() {
  const { images } = useEditor();
  const image = images.bannerImage;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-foreground text-sm font-medium">{t.bannerImage}</span>
      {image === null ? <EmptyBanner /> : <CurrentBanner src={image.mobileUrl} />}
      <ControlHint>{t.bannerHint}</ControlHint>
    </div>
  );
}
