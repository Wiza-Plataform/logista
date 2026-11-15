'use client';

import type { CSSProperties, ReactNode } from 'react';

import type { SectionKey } from '../draft-model';
import { useEditor } from '../editor-context';
import { usePreview } from './preview-context';

export const SELECTION_BLUE = '#3366FF';

export function SectionFrame({
  section,
  tag,
  style,
  children,
}: {
  readonly section: SectionKey;
  readonly tag: string;
  readonly style?: CSSProperties;
  readonly children: ReactNode;
}) {
  const { selected, select } = useEditor();
  const isSelected = selected === section;

  return (
    <div
      onClick={() => {
        select(section);
      }}
      style={{
        position: 'relative',
        outline: isSelected ? `2px solid ${SELECTION_BLUE}` : undefined,
        outlineOffset: -2,
        ...style,
      }}
      className="cursor-pointer hover:shadow-[inset_0_0_0_1px_rgba(51,102,255,0.6)]"
    >
      {isSelected && (
        <span
          className="pointer-events-none absolute top-1.5 left-1.5 z-[8] rounded-[6px] px-2 py-[5px] text-[11px] leading-none font-bold whitespace-nowrap text-white"
          style={{ background: SELECTION_BLUE }}
        >
          {tag}
        </span>
      )}
      {children}
    </div>
  );
}

export function StoreLogo({
  size,
  fontSize,
}: {
  readonly size: number;
  readonly fontSize: number;
}) {
  const { theme, initial, logoUrl } = usePreview();
  const box: CSSProperties = { width: size, height: size, borderRadius: theme.logoRadius };

  if (logoUrl !== null) {
    return <img src={logoUrl} alt="" className="shrink-0 object-contain" style={box} />;
  }

  return (
    <span
      className="flex shrink-0 items-center justify-center font-extrabold"
      style={{
        ...box,
        background: theme.preset.primary,
        color: theme.preset.onPrimary,
        fontFamily: theme.displayFont,
        fontSize,
      }}
    >
      {initial}
    </span>
  );
}
