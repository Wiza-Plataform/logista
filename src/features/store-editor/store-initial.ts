import { strings } from '@/shared/i18n/strings';

export function storeInitialOf(storeName: string): string {
  return (storeName.trim().charAt(0) || strings.storeEditor.preview.fallbackInitial).toUpperCase();
}
