import type { ThemePalette } from '../contracts/store-theme.ts';

export interface PalettePreset {
  readonly primary: string;
  readonly onPrimary: string;
  readonly soft: string;
  readonly price: string;
  readonly priceOnDark: string;
}

const LIME: PalettePreset = {
  primary: '#BFD25E',
  onPrimary: '#1A2008',
  soft: '#F4F7E6',
  price: '#5E7212',
  priceOnDark: '#C9DC6E',
};

const PRESETS = new Map<ThemePalette, PalettePreset>([
  ['lime', LIME],
  [
    'coral',
    {
      primary: '#C9442F',
      onPrimary: '#FFFFFF',
      soft: '#FBEDEA',
      price: '#B23A27',
      priceOnDark: '#F07A63',
    },
  ],
  [
    'forest',
    {
      primary: '#237A4B',
      onPrimary: '#FFFFFF',
      soft: '#E9F4EE',
      price: '#237A4B',
      priceOnDark: '#5FC08A',
    },
  ],
  [
    'ocean',
    {
      primary: '#2F6FD6',
      onPrimary: '#FFFFFF',
      soft: '#EAF1FC',
      price: '#2F6FD6',
      priceOnDark: '#7AA7F0',
    },
  ],
  [
    'plum',
    {
      primary: '#7A4FD6',
      onPrimary: '#FFFFFF',
      soft: '#F1ECFB',
      price: '#6B43C4',
      priceOnDark: '#A88BF0',
    },
  ],
  [
    'sand',
    {
      primary: '#D9892B',
      onPrimary: '#2A1704',
      soft: '#FBF2E6',
      price: '#9A5A12',
      priceOnDark: '#E9A85A',
    },
  ],
]);

export function palettePresetOf(palette: ThemePalette): PalettePreset {
  return PRESETS.get(palette) ?? LIME;
}
