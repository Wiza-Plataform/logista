import { strings } from '@/shared/i18n/strings';

import type { SectionKey } from './draft-model';
import {
  BannerPicture,
  FooterBar,
  HeaderBar,
  InfoCircle,
  Instagram,
  Megaphone,
  PriceTag,
  QuestionCircle,
  Tiles,
  WhatsApp,
} from './editor-icons';
import type { EditorIcon } from './editor-icons';

const names = strings.storeEditor.sectionNames;

export interface SectionMeta {
  readonly key: SectionKey;
  readonly label: string;
  readonly icon: EditorIcon;
}

export const SECTION_CATALOG: readonly SectionMeta[] = [
  { key: 'announcement', label: names.announcement, icon: Megaphone },
  { key: 'header', label: names.header, icon: HeaderBar },
  { key: 'banner', label: names.banner, icon: BannerPicture },
  { key: 'categories', label: names.categories, icon: PriceTag },
  { key: 'products', label: names.products, icon: Tiles },
  { key: 'about', label: names.about, icon: InfoCircle },
  { key: 'faq', label: names.faq, icon: QuestionCircle },
  { key: 'instagram', label: names.instagram, icon: Instagram },
  { key: 'footer', label: names.footer, icon: FooterBar },
  { key: 'whatsappButton', label: names.whatsappButton, icon: WhatsApp },
];

export function sectionMetaOf(key: SectionKey): SectionMeta {
  const meta = SECTION_CATALOG.find((candidate) => candidate.key === key);
  if (meta === undefined) throw new Error(`Secção desconhecida: ${key}.`);
  return meta;
}
