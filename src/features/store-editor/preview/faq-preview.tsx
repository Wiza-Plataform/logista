'use client';

import type { ColorScheme } from '@/shared/contracts/store-theme';
import { strings } from '@/shared/i18n/strings';

import { usePreview } from './preview-context';
import { SectionFrame } from './section-frame';

const t = strings.storeEditor;

function FaqRow({ question, line }: { readonly question: string; readonly line: string }) {
  return (
    <div
      className="flex justify-between gap-3 px-0.5 py-3.5 text-[14.5px] font-bold"
      style={{ boxShadow: `inset 0 -1px 0 ${line}` }}
    >
      <span>{question}</span>
      <span aria-hidden="true">+</span>
    </div>
  );
}

export function FaqPreview({ colorScheme }: { readonly colorScheme: ColorScheme }) {
  const { theme, isMobile } = usePreview();
  const colors = theme.schemeOf(colorScheme);

  return (
    <SectionFrame
      section="faq"
      tag={t.sectionNames.faq}
      style={{
        padding: isMobile ? '28px 16px' : '44px 32px',
        background: colors.background,
        color: colors.foreground,
      }}
    >
      <div className="mx-auto flex max-w-[640px] flex-col gap-4">
        <h3
          className="m-0 text-center font-extrabold tracking-[-0.02em]"
          style={{ fontFamily: theme.displayFont, fontSize: isMobile ? 22 : 28 }}
        >
          {t.preview.faqTitle}
        </h3>
        <div className="flex flex-col" style={{ boxShadow: `inset 0 1px 0 ${colors.line}` }}>
          <div
            className="flex flex-col gap-1.5 px-0.5 py-3.5"
            style={{ boxShadow: `inset 0 -1px 0 ${colors.line}` }}
          >
            <span className="flex justify-between gap-3 text-[14.5px] font-bold">
              <span>{t.preview.faqFirstQuestion}</span>
              <span aria-hidden="true">−</span>
            </span>
            <span className="text-body leading-[1.55]" style={{ color: colors.muted }}>
              {t.preview.faqFirstAnswer}
            </span>
          </div>
          <FaqRow question={t.preview.faqSecondQuestion} line={colors.line} />
          <FaqRow question={t.preview.faqThirdQuestion} line={colors.line} />
        </div>
      </div>
    </SectionFrame>
  );
}
