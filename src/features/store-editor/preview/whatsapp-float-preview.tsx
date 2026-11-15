'use client';

import { strings } from '@/shared/i18n/strings';

import { useEditor } from '../editor-context';
import { WhatsApp } from '../editor-icons';

const t = strings.storeEditor;

export function WhatsappFloatPreview() {
  const { draft, selected, select } = useEditor();
  const section = draft.sections.whatsappButton;
  const isRight = section.side === 'right';
  const showsLabel = section.style === 'iconText';

  return (
    <div
      className="pointer-events-none sticky bottom-4 z-[6] mx-4 h-0 overflow-visible"
      style={{ alignSelf: isRight ? 'flex-end' : 'flex-start' }}
    >
      <button
        type="button"
        aria-label={t.preview.whatsappLabel}
        onClick={() => {
          select('whatsappButton');
        }}
        className="text-step pointer-events-auto absolute bottom-0 flex h-[52px] cursor-pointer items-center gap-2 rounded-full border-0 font-extrabold whitespace-nowrap shadow-[0_12px_26px_-10px_rgba(0,0,0,0.5)]"
        style={{
          left: isRight ? 'auto' : 0,
          right: isRight ? 0 : 'auto',
          padding: showsLabel ? '0 20px 0 16px' : '0 15px',
          background: '#178046',
          color: '#FFFFFF',
          outline: selected === 'whatsappButton' ? '2px solid #3366FF' : undefined,
          outlineOffset: 3,
        }}
      >
        <WhatsApp className="size-[22px]" />
        {showsLabel && <span>{section.label}</span>}
      </button>
    </div>
  );
}
