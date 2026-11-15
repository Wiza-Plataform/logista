'use client';

import { cn } from '@/shared/lib/utils';
import { PALETTE_OPTIONS } from '@/shared/store-theme/palette-options';
import type { PaletteOption } from '@/shared/store-theme/palette-options';
import { Check } from '@/shared/ui/icons';

import type { PaletteChoice } from './types';

function Swatch({
  option,
  isSelected,
  onSelect,
}: {
  option: PaletteOption;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={option.label}
      title={option.label}
      aria-pressed={isSelected}
      onClick={onSelect}
      style={{ background: option.preset.primary, color: option.preset.onPrimary }}
      className={cn(
        'grid size-11 place-items-center rounded-sm border-2 transition-transform duration-[120ms] hover:scale-[1.08] focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none sm:size-9',
        isSelected ? 'border-foreground' : 'border-transparent',
      )}
    >
      {isSelected && <Check className="size-3.5" strokeWidth={3} />}
    </button>
  );
}

export function PaletteSwatches({
  selected,
  onSelect,
}: {
  selected: PaletteChoice;
  onSelect: (palette: PaletteChoice) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {PALETTE_OPTIONS.map((option) => (
        <Swatch
          key={option.palette}
          option={option}
          isSelected={selected === option.palette}
          onSelect={() => {
            onSelect(selected === option.palette ? '' : option.palette);
          }}
        />
      ))}
    </div>
  );
}
