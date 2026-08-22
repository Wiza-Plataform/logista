'use client';

import { cn } from '@/shared/lib/utils';
import { Check } from '@/shared/ui/icons';

import { BRAND_COLORS } from './options';
import type { BrandColor } from './options';

function Swatch({
  color,
  isSelected,
  onSelect,
}: {
  color: BrandColor;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={color.label}
      aria-pressed={isSelected}
      onClick={onSelect}
      style={{ background: `var(${color.token})` }}
      className={cn(
        'grid size-11 place-items-center rounded-sm border-2 transition-transform duration-[120ms] hover:scale-[1.08] focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none sm:size-9',
        isSelected ? 'border-foreground' : 'border-transparent',
      )}
    >
      {isSelected && <Check className="size-3.5 text-white" strokeWidth={3} />}
    </button>
  );
}

export function ColorSwatches({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (hex: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {BRAND_COLORS.map((color) => (
        <Swatch
          key={color.hex}
          color={color}
          isSelected={selected === color.hex}
          onSelect={() => {
            onSelect(selected === color.hex ? '' : color.hex);
          }}
        />
      ))}
    </div>
  );
}

export function tokenOfHex(hex: string): string | undefined {
  return BRAND_COLORS.find((color) => color.hex === hex)?.token;
}
