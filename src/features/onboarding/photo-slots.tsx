'use client';

import { strings } from '@/shared/i18n/strings';
import { Box, Close, Plus } from '@/shared/ui/icons';

import { MAX_PRODUCT_PHOTOS } from './options';

function FilledSlot({
  token,
  isMain,
  onRemove,
}: {
  token: string;
  isMain: boolean;
  onRemove: () => void;
}) {
  const t = strings.onboarding;

  return (
    <div
      style={{ background: `var(${token})` }}
      className="relative grid aspect-square place-items-center rounded-[11px] text-white"
    >
      <Box className="size-6.5 opacity-85" strokeWidth={1.5} />

      {isMain && (
        <span className="absolute top-1.25 left-1.25 rounded-[4px] bg-[var(--lima)] px-1.25 py-0.5 text-[8.5px] font-bold text-[var(--verde-primario)]">
          {t.productPhotoMain}
        </span>
      )}

      <button
        type="button"
        aria-label={t.productPhotoRemove}
        onClick={onRemove}
        className="absolute top-1 right-1 grid size-4.5 place-items-center rounded-[6px] bg-black/45 text-white after:absolute after:-inset-2.5 after:content-[''] hover:bg-black/65"
      >
        <Close className="size-2.5" strokeWidth={3} />
      </button>
    </div>
  );
}

function AddSlot({ onAdd }: { onAdd: () => void }) {
  const t = strings.onboarding;

  return (
    <button
      type="button"
      aria-label={t.productPhotoAddLabel}
      onClick={onAdd}
      className="border-border text-[var(--txt-faint)] hover:border-ring hover:text-muted-foreground bg-card grid aspect-square place-items-center gap-0.75 rounded-[11px] border border-dashed transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      <Plus className="size-4.5" strokeWidth={1.5} />
      <span className="text-[9px]">{t.productPhotoAdd}</span>
    </button>
  );
}

export function PhotoSlots({
  photos,
  onAdd,
  onRemove,
}: {
  photos: readonly string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.25 min-[520px]:grid-cols-4">
      {photos.map((token, index) => (
        <FilledSlot
          key={`${token}-${String(index)}`}
          token={token}
          isMain={index === 0}
          onRemove={() => {
            onRemove(index);
          }}
        />
      ))}
      {photos.length < MAX_PRODUCT_PHOTOS && <AddSlot onAdd={onAdd} />}
    </div>
  );
}
