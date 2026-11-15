'use client';

import { strings } from '@/shared/i18n/strings';

import { useEditor } from '../editor-context';
import { Instagram, MapPin, WhatsApp } from '../editor-icons';
import { instagramLabel, whatsappLabel } from '../identity-labels';
import { usePreview } from './preview-context';
import { SectionFrame, StoreLogo } from './section-frame';

const t = strings.storeEditor;

function FooterContacts() {
  const { draft } = useEditor();
  const { addressLine } = usePreview();
  const whatsapp = whatsappLabel(draft.identity.whatsapp);
  const instagram = instagramLabel(draft.identity.instagram);

  return (
    <div className="text-note flex flex-col gap-[9px]">
      {whatsapp !== null && (
        <span className="flex items-center gap-2">
          <WhatsApp className="size-[15px]" />
          <span>{whatsapp}</span>
        </span>
      )}
      {instagram !== null && (
        <span className="flex items-center gap-2">
          <Instagram className="size-[15px]" />
          <span>{instagram}</span>
        </span>
      )}
      {addressLine !== null && (
        <span className="flex items-center gap-2">
          <MapPin className="size-[15px]" />
          <span>{addressLine}</span>
        </span>
      )}
    </div>
  );
}

export function FooterPreview() {
  const { draft } = useEditor();
  const { theme, isMobile, storeName, tagline } = usePreview();
  const section = draft.sections.footer;
  const colors = theme.schemeOf(section.colorScheme);

  return (
    <SectionFrame
      section="footer"
      tag={t.preview.footerTag}
      style={{
        padding: isMobile ? '28px 16px 22px' : '36px 32px 24px',
        background: colors.background,
        color: colors.foreground,
      }}
    >
      <div
        className="flex justify-between gap-5"
        style={{ flexDirection: isMobile ? 'column' : 'row' }}
      >
        <div className="flex max-w-[320px] flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <StoreLogo size={32} fontSize={16} />
            <span className="text-base font-extrabold" style={{ fontFamily: theme.displayFont }}>
              {storeName}
            </span>
          </div>
          <span className="text-note leading-[1.5]" style={{ color: colors.muted }}>
            {tagline}
          </span>
        </div>
        {section.showContacts && <FooterContacts />}
      </div>
      <div
        className="text-fine mt-[22px] flex justify-between gap-3 pt-3.5"
        style={{ boxShadow: `inset 0 1px 0 ${colors.line}`, color: colors.muted }}
      >
        <span>{`${t.preview.copyright}${storeName}`}</span>
        <span>{t.preview.madeWith}</span>
      </div>
    </SectionFrame>
  );
}
