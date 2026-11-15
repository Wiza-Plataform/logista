import { THEME_PALETTES } from '../contracts/store-theme.ts';
import type { ThemePalette } from '../contracts/store-theme.ts';
import { strings } from '../i18n/strings.ts';
import { palettePresetOf } from './palette-presets.ts';
import type { PalettePreset } from './palette-presets.ts';

export interface PaletteOption {
  readonly palette: ThemePalette;
  readonly label: string;
  readonly preset: PalettePreset;
}

function labelOf(palette: ThemePalette): string {
  switch (palette) {
    case 'lime':
      return strings.themePalettes.lime;
    case 'coral':
      return strings.themePalettes.coral;
    case 'forest':
      return strings.themePalettes.forest;
    case 'ocean':
      return strings.themePalettes.ocean;
    case 'plum':
      return strings.themePalettes.plum;
    case 'sand':
      return strings.themePalettes.sand;
  }
}

export const PALETTE_OPTIONS: readonly PaletteOption[] = THEME_PALETTES.map((palette) => ({
  palette,
  label: labelOf(palette),
  preset: palettePresetOf(palette),
}));
