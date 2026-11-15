'use client';

import type { ReactNode } from 'react';

import type { PageSection } from '@/shared/contracts/store-theme';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import { sectionOf } from '../draft-model';
import { useEditor } from '../editor-context';
import { Padlock } from '../editor-icons';
import { AboutPreview } from './about-preview';
import { AnnouncementPreview } from './announcement-preview';
import { BannerPreview } from './banner-preview';
import { CategoriesPreview } from './categories-preview';
import { FaqPreview } from './faq-preview';
import { FooterPreview } from './footer-preview';
import { InstagramPreview } from './instagram-preview';
import { WhatsappFloatPreview } from './whatsapp-float-preview';
import { HeaderPreview } from './header-preview';
import { PreviewProvider, usePreview } from './preview-context';
import { ProductsPreview } from './products-preview';

const t = strings.storeEditor;

function PageSectionPreview({ section }: { readonly section: PageSection }) {
  const { draft } = useEditor();

  switch (section) {
    case 'banner':
      return <BannerPreview />;
    case 'categories':
      return <CategoriesPreview />;
    case 'products':
      return <ProductsPreview />;
    case 'about':
      return <AboutPreview />;
    case 'faq':
      return draft.sections.faq === null ? null : (
        <FaqPreview colorScheme={draft.sections.faq.colorScheme} />
      );
    case 'instagram':
      return draft.sections.instagram === null ? null : (
        <InstagramPreview colorScheme={draft.sections.instagram.colorScheme} />
      );
  }
}

function StorePreview() {
  const { draft } = useEditor();
  const { theme } = usePreview();
  const { sections } = draft;
  const isShown = (section: PageSection) => sectionOf(sections, section)?.hidden === false;

  return (
    <div
      className="relative flex min-h-full flex-col text-[14px]"
      style={{
        background: theme.tokens.background,
        color: theme.tokens.text,
        fontFamily: theme.bodyFont,
      }}
    >
      {!sections.announcement.hidden && <AnnouncementPreview />}
      {!sections.header.hidden && <HeaderPreview />}
      {draft.pageOrder.filter(isShown).map((section) => (
        <PageSectionPreview key={section} section={section} />
      ))}
      {!sections.whatsappButton.hidden && <WhatsappFloatPreview />}
      {!sections.footer.hidden && <FooterPreview />}
    </div>
  );
}

function BrowserBar() {
  const { data } = useEditor();

  return (
    <div className="bg-card border-border flex h-[38px] items-center gap-2.5 border-b px-3.5">
      <span aria-hidden="true" className="flex w-12 gap-1.5">
        <span className="bg-border size-[9px] rounded-full" />
        <span className="bg-border size-[9px] rounded-full" />
        <span className="bg-border size-[9px] rounded-full" />
      </span>
      <span className="flex flex-1 justify-center">
        <span className="bg-muted text-caption inline-flex h-6 items-center gap-1.5 rounded-full px-3 font-semibold text-(--txt-dim)">
          <Padlock className="size-[11px]" />
          <span>{`${data.subdomain}${t.domainSuffix}`}</span>
        </span>
      </span>
      <span className="w-12" />
    </div>
  );
}

function DeviceFrame({ children }: { readonly children: ReactNode }) {
  const { device, draft } = useEditor();
  const isMobile = device === 'mobile';

  return (
    <div
      className={cn(
        'w-full shrink-0 [scrollbar-width:none]',
        isMobile ? 'h-[780px] max-[899px]:h-[576px]' : 'h-auto',
      )}
      style={{
        maxWidth: isMobile ? 390 : 980,
        overflow: isMobile ? 'auto' : 'clip',
        border: isMobile ? '10px solid var(--txt)' : '1px solid var(--border)',
        borderRadius: isMobile ? 46 : 14,
        boxShadow: '0 24px 50px -28px rgba(0,0,0,.45)',
        background: draft.style.colorMode === 'dark' ? '#111310' : '#FFFFFF',
      }}
    >
      {!isMobile && <BrowserBar />}
      {children}
    </div>
  );
}

export function PreviewStage() {
  return (
    <main
      aria-label={t.regions.preview}
      className="bg-background relative min-h-0 min-w-0 overflow-auto bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:18px_18px] [grid-area:stage]"
    >
      <div className="flex min-h-full items-start justify-center p-7 max-[899px]:p-3">
        <PreviewProvider>
          <DeviceFrame>
            <StorePreview />
          </DeviceFrame>
        </PreviewProvider>
      </div>
    </main>
  );
}
