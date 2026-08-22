import { strings } from '@/shared/i18n/strings';

export interface BrandColor {
  readonly hex: string;
  readonly token: string;
  readonly label: string;
}

export const BRAND_COLORS: readonly [BrandColor, ...BrandColor[]] = [
  { hex: '#E0563E', token: '--av-red', label: strings.brandColors.red },
  { hex: '#2E9E5B', token: '--av-green', label: strings.brandColors.green },
  { hex: '#7C5CDB', token: '--av-purple', label: strings.brandColors.purple },
  { hex: '#1FA37A', token: '--av-teal', label: strings.brandColors.teal },
  { hex: '#D98A2B', token: '--av-orange', label: strings.brandColors.orange },
  { hex: '#3B7DD8', token: '--av-blue', label: strings.brandColors.blue },
];

export const MAX_PRODUCT_PHOTOS = 8;

export function nextPhotoToken(count: number): string {
  return BRAND_COLORS[count % BRAND_COLORS.length]?.token ?? BRAND_COLORS[0].token;
}
