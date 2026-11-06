import { strings } from '@/shared/i18n/strings';
import { Close, Plus } from '@/shared/ui/icons';

import { ACCEPTED_PHOTO_TYPES, MAX_PHOTOS } from './photo-rules';

const text = strings.productForm;

export interface PhotoTileModel {
  readonly key: string;
  readonly src: string;
}

interface PhotoGridProps {
  readonly photos: readonly PhotoTileModel[];
  readonly uploadingCount: number;
  readonly isBusy: boolean;
  readonly onAdd: (files: readonly File[]) => void;
  readonly onRemove: (key: string) => void;
  readonly onPromote: (key: string) => void;
}

const TILE = 'relative aspect-square overflow-hidden rounded-[10px]';
const OVERLAY_BUTTON = 'rounded-[6px] bg-black/55 text-white disabled:opacity-60';

function PhotoTile({
  photo,
  position,
  isBusy,
  onRemove,
  onPromote,
}: {
  readonly photo: PhotoTileModel;
  readonly position: number;
  readonly isBusy: boolean;
  readonly onRemove: () => void;
  readonly onPromote: () => void;
}) {
  const isMain = position === 0;

  return (
    <div className={`${TILE} group bg-muted`}>
      <img src={photo.src} alt="" className="size-full object-cover" />
      {isMain ? (
        <span className="text-label absolute top-[5px] left-[5px] rounded-[4px] bg-(--lima) px-1.5 py-0.5 font-bold text-(--verde-primario)">
          {text.mainPhoto}
        </span>
      ) : (
        <button
          type="button"
          disabled={isBusy}
          onClick={onPromote}
          className={`${OVERLAY_BUTTON} text-label absolute inset-x-1 bottom-1 py-1 font-semibold opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100`}
        >
          {text.promotePhoto}
        </button>
      )}
      <button
        type="button"
        aria-label={`${text.removePhoto} ${String(position + 1)}`}
        disabled={isBusy}
        onClick={onRemove}
        className={`${OVERLAY_BUTTON} absolute top-1 right-1 grid size-[19px] place-items-center`}
      >
        <Close className="size-3" strokeWidth={2.2} />
      </button>
    </div>
  );
}

function UploadingTile() {
  return (
    <div
      className={`${TILE} text-label bg-muted grid animate-pulse place-items-center text-(--txt-faint)`}
    >
      {text.uploading}
    </div>
  );
}

function AddPhotoTile({
  isBusy,
  onAdd,
}: {
  readonly isBusy: boolean;
  readonly onAdd: (files: readonly File[]) => void;
}) {
  return (
    <label
      className={`${TILE} border-border bg-background focus-within:ring-ring/50 flex cursor-pointer flex-col items-center justify-center gap-[3px] border border-dashed text-(--txt-faint) focus-within:ring-3 hover:border-(--lima-oliva) hover:text-muted-foreground`}
    >
      <Plus className="size-[18px]" strokeWidth={2} />
      <span className="text-label">{text.addPhoto}</span>
      <input
        type="file"
        multiple
        disabled={isBusy}
        accept={ACCEPTED_PHOTO_TYPES.join(',')}
        className="sr-only"
        onChange={(event) => {
          onAdd([...(event.currentTarget.files ?? [])]);
          event.currentTarget.value = '';
        }}
      />
    </label>
  );
}

export function PhotoGrid({
  photos,
  uploadingCount,
  isBusy,
  onAdd,
  onRemove,
  onPromote,
}: PhotoGridProps) {
  const hasRoom = photos.length + uploadingCount < MAX_PHOTOS;

  return (
    <>
      <div className="grid grid-cols-4 gap-[9px] max-[560px]:grid-cols-3">
        {photos.map((photo, position) => (
          <PhotoTile
            key={photo.key}
            photo={photo}
            position={position}
            isBusy={isBusy}
            onRemove={() => {
              onRemove(photo.key);
            }}
            onPromote={() => {
              onPromote(photo.key);
            }}
          />
        ))}
        {Array.from({ length: uploadingCount }, (_, index) => (
          <UploadingTile key={`uploading-${String(index)}`} />
        ))}
        {hasRoom ? <AddPhotoTile isBusy={isBusy} onAdd={onAdd} /> : null}
      </div>
      <p className="mt-[9px] text-xs leading-[1.4] text-(--txt-faint)">{text.photosHint}</p>
    </>
  );
}
