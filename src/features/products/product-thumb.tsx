import { Picture } from '@/shared/ui/icons';

const PLACEHOLDER_TONES = [
  'var(--av-red)',
  'var(--av-green)',
  'var(--av-purple)',
  'var(--av-teal)',
  'var(--av-orange)',
  'var(--av-blue)',
] as const;

function toneFor(productUlid: string): string {
  let seed = 0;
  for (let index = 0; index < productUlid.length; index += 1) {
    seed += productUlid.charCodeAt(index);
  }
  return PLACEHOLDER_TONES.at(seed % PLACEHOLDER_TONES.length) ?? PLACEHOLDER_TONES[0];
}

interface ProductThumbProps {
  readonly productUlid: string;
  readonly imageUrl: string | null;
}

export function ProductThumb({ productUlid, imageUrl }: ProductThumbProps) {
  if (imageUrl !== null) {
    return (
      <img
        src={imageUrl}
        alt=""
        width={42}
        height={42}
        loading="lazy"
        decoding="async"
        className="bg-muted size-[42px] shrink-0 rounded-[10px] object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{ background: toneFor(productUlid) }}
      className="grid size-[42px] shrink-0 place-items-center rounded-[10px] text-white"
    >
      <Picture className="size-[21px]" strokeWidth={1.6} />
    </span>
  );
}
