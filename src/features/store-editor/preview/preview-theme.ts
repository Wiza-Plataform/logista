import type { ColorScheme, ThemeStyle } from '@/shared/contracts/store-theme';
import { palettePresetOf } from '@/shared/store-theme/palette-presets';
import type { PalettePreset } from '@/shared/store-theme/palette-presets';

export const LIGHT_INK = '#17190F';

export const FONT_STACKS = {
  bricolage: 'var(--font-bricolage), system-ui, sans-serif',
  fraunces: 'var(--font-fraunces), Georgia, serif',
  manrope: 'var(--font-manrope), system-ui, sans-serif',
  spaceGrotesk: 'var(--font-space-grotesk), system-ui, sans-serif',
} as const;

const ON_DARK_FOREGROUND = '#F2F4EE';
const ON_DARK_MUTED = '#B4BBAD';

export interface SchemeColors {
  readonly background: string;
  readonly foreground: string;
  readonly muted: string;
  readonly line: string;
}

export interface ButtonColors {
  readonly background: string;
  readonly foreground: string;
  readonly border: string;
}

export interface ThemeTokens {
  readonly background: string;
  readonly soft: string;
  readonly text: string;
  readonly muted: string;
  readonly line: string;
  readonly card: string;
  readonly ink: string;
  readonly price: string;
}

export interface PreviewTheme {
  readonly preset: PalettePreset;
  readonly tokens: ThemeTokens;
  readonly displayFont: string;
  readonly bodyFont: string;
  readonly cornerPx: number;
  readonly buttonRadius: string;
  readonly logoRadius: string;
  readonly isSolid: boolean;
  readonly isSquareCorners: boolean;
  readonly schemeOf: (scheme: ColorScheme) => SchemeColors;
  readonly buttonFor: (scheme: ColorScheme) => ButtonColors;
}

function tokensOf(preset: PalettePreset, isDark: boolean): ThemeTokens {
  return isDark
    ? {
        background: '#111310',
        soft: `color-mix(in srgb, ${preset.primary} 16%, #141612)`,
        text: ON_DARK_FOREGROUND,
        muted: '#A3AA9C',
        line: '#2A2E26',
        card: '#1A1D17',
        ink: '#050605',
        price: preset.priceOnDark,
      }
    : {
        background: '#FFFFFF',
        soft: preset.soft,
        text: '#17190F',
        muted: '#5F6457',
        line: '#E6E8E1',
        card: '#FFFFFF',
        ink: LIGHT_INK,
        price: preset.price,
      };
}

function fontsOf(pairing: ThemeStyle['fontPairing']): { display: string; body: string } {
  switch (pairing) {
    case 'modern':
      return { display: FONT_STACKS.bricolage, body: FONT_STACKS.manrope };
    case 'classic':
      return { display: FONT_STACKS.fraunces, body: FONT_STACKS.manrope };
    case 'minimal':
      return { display: FONT_STACKS.spaceGrotesk, body: FONT_STACKS.spaceGrotesk };
  }
}

function cornerPxOf(corners: ThemeStyle['cornerStyle']): number {
  switch (corners) {
    case 'square':
      return 0;
    case 'soft':
      return 12;
    case 'round':
      return 22;
  }
}

function buttonRadiusOf(shape: ThemeStyle['buttonShape']): string {
  switch (shape) {
    case 'pill':
      return '999px';
    case 'rounded':
      return '10px';
    case 'square':
      return '0px';
  }
}

function logoRadiusOf(corners: ThemeStyle['cornerStyle']): string {
  switch (corners) {
    case 'square':
      return '0px';
    case 'soft':
      return '9px';
    case 'round':
      return '50%';
  }
}

function schemeColors(
  scheme: ColorScheme,
  tokens: ThemeTokens,
  preset: PalettePreset,
): SchemeColors {
  switch (scheme) {
    case 'soft':
      return {
        background: tokens.soft,
        foreground: tokens.text,
        muted: tokens.muted,
        line: tokens.line,
      };
    case 'accent':
      return {
        background: preset.primary,
        foreground: preset.onPrimary,
        muted: `color-mix(in srgb, ${preset.onPrimary} 80%, ${preset.primary})`,
        line: `color-mix(in srgb, ${preset.onPrimary} 18%, transparent)`,
      };
    case 'dark':
      return {
        background: tokens.ink,
        foreground: ON_DARK_FOREGROUND,
        muted: ON_DARK_MUTED,
        line: 'rgba(255,255,255,.12)',
      };
    case 'base':
      return {
        background: tokens.background,
        foreground: tokens.text,
        muted: tokens.muted,
        line: tokens.line,
      };
  }
}

function buttonColors(
  scheme: ColorScheme,
  isSolid: boolean,
  tokens: ThemeTokens,
  preset: PalettePreset,
): ButtonColors {
  if (scheme === 'accent') {
    return {
      background: isSolid ? preset.onPrimary : 'transparent',
      foreground: isSolid ? preset.primary : preset.onPrimary,
      border: `1.5px solid ${preset.onPrimary}`,
    };
  }
  const { foreground } = schemeColors(scheme, tokens, preset);
  return isSolid
    ? {
        background: preset.primary,
        foreground: preset.onPrimary,
        border: `1.5px solid ${preset.primary}`,
      }
    : { background: 'transparent', foreground, border: `1.5px solid ${foreground}` };
}

export function previewThemeOf(style: ThemeStyle): PreviewTheme {
  const preset = palettePresetOf(style.palette);
  const tokens = tokensOf(preset, style.colorMode === 'dark');
  const fonts = fontsOf(style.fontPairing);
  const isSolid = style.buttonFill === 'solid';

  return {
    preset,
    tokens,
    displayFont: fonts.display,
    bodyFont: fonts.body,
    cornerPx: cornerPxOf(style.cornerStyle),
    buttonRadius: buttonRadiusOf(style.buttonShape),
    logoRadius: logoRadiusOf(style.cornerStyle),
    isSolid,
    isSquareCorners: style.cornerStyle === 'square',
    schemeOf: (scheme) => schemeColors(scheme, tokens, preset),
    buttonFor: (scheme) => buttonColors(scheme, isSolid, tokens, preset),
  };
}
