import type { VatRegime } from '@/shared/contracts/store';
import { strings } from '@/shared/i18n/strings';

export interface VatRegimeOption {
  readonly value: VatRegime;
  readonly label: string;
}

export const VAT_REGIME_OPTIONS: readonly VatRegimeOption[] = [
  { value: 'EXEMPT', label: strings.vatRegimes.EXEMPT },
  { value: 'STANDARD', label: strings.vatRegimes.STANDARD },
];

export interface BrandColor {
  readonly hex: string;
  readonly token: string;
  readonly label: string;
}

export const BRAND_COLORS: readonly BrandColor[] = [
  { hex: '#E0563E', token: '--av-red', label: strings.brandColors.red },
  { hex: '#2E9E5B', token: '--av-green', label: strings.brandColors.green },
  { hex: '#7C5CDB', token: '--av-purple', label: strings.brandColors.purple },
  { hex: '#1FA37A', token: '--av-teal', label: strings.brandColors.teal },
  { hex: '#D98A2B', token: '--av-orange', label: strings.brandColors.orange },
  { hex: '#3B7DD8', token: '--av-blue', label: strings.brandColors.blue },
];
