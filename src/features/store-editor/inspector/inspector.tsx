'use client';

import type { ComponentType } from 'react';

import { strings } from '@/shared/i18n/strings';

import type { SectionKey } from '../draft-model';
import { useEditor } from '../editor-context';
import { AboutSettings } from './about-settings';
import { AnnouncementSettings } from './announcement-settings';
import { CategoriesSettings } from './categories-settings';
import { FooterSettings } from './footer-settings';
import { BannerSettings, HeaderSettings } from './header-banner-settings';
import { InspectorHeader } from './inspector-header';
import { FaqSettings, InstagramSettings } from './optional-section-settings';
import { ProductsSettings } from './products-settings';
import { WhatsappSettings } from './whatsapp-settings';

const SETTINGS: Readonly<Record<SectionKey, ComponentType>> = {
  announcement: AnnouncementSettings,
  header: HeaderSettings,
  banner: BannerSettings,
  categories: CategoriesSettings,
  products: ProductsSettings,
  about: AboutSettings,
  faq: FaqSettings,
  instagram: InstagramSettings,
  footer: FooterSettings,
  whatsappButton: WhatsappSettings,
};

export function Inspector() {
  const { selected } = useEditor();
  const Settings = SETTINGS[selected];

  return (
    <aside
      aria-label={strings.storeEditor.regions.inspector}
      className="border-border bg-card min-h-0 overflow-y-auto border-l [grid-area:insp] max-[899px]:overflow-visible max-[899px]:border-t max-[899px]:border-l-0"
    >
      <InspectorHeader section={selected} />
      <div className="px-4 pb-6">
        <Settings />
      </div>
    </aside>
  );
}
