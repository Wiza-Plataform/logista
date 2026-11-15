'use client';

import type { CSSProperties, ReactNode } from 'react';

import { strings } from '@/shared/i18n/strings';

import { useEditor } from '../editor-context';
import { MenuLines, SearchLens } from '../editor-icons';
import { usePreview } from './preview-context';
import { StoreLogo } from './section-frame';

const t = strings.storeEditor;
const ICON_BOX = 'flex size-9 items-center justify-center';

function StoreMenu({ style }: { readonly style: CSSProperties }) {
  const { draft } = useEditor();
  const { theme } = usePreview();
  const colors = theme.schemeOf(draft.sections.header.colorScheme);

  return (
    <nav
      aria-label={t.regions.storeMenu}
      className="text-note flex font-semibold"
      style={{ color: colors.muted, ...style }}
    >
      <span style={{ color: colors.foreground }}>{t.preview.menuHome}</span>
      <span>{t.preview.menuProducts}</span>
      <span>{t.preview.menuAbout}</span>
      <span>{t.preview.menuContacts}</span>
    </nav>
  );
}

function SearchIconSlot() {
  return (
    <span className={ICON_BOX}>
      <SearchLens className="size-[19px]" />
    </span>
  );
}

function MenuIconSlot() {
  return (
    <span className={ICON_BOX}>
      <MenuLines className="size-5" />
    </span>
  );
}

export function LogoLeftHeader({
  bag,
  padding,
}: {
  readonly bag: ReactNode;
  readonly padding: string;
}) {
  const { draft } = useEditor();
  const { theme, isMobile, storeName } = usePreview();

  return (
    <div className="flex items-center gap-4" style={{ padding }}>
      <div className="flex min-w-0 items-center gap-2.5">
        <StoreLogo size={34} fontSize={17} />
        <span
          className="text-[17px] font-extrabold tracking-[-0.01em] whitespace-nowrap"
          style={{ fontFamily: theme.displayFont }}
        >
          {storeName}
        </span>
      </div>
      {!isMobile && <StoreMenu style={{ gap: 18, marginLeft: 10 }} />}
      <div className="flex-1" />
      {draft.sections.header.showSearch && <SearchIconSlot />}
      {bag}
      {isMobile && <MenuIconSlot />}
    </div>
  );
}

export function LogoCenterHeader({
  bag,
  padding,
}: {
  readonly bag: ReactNode;
  readonly padding: string;
}) {
  const { draft } = useEditor();
  const { theme, isMobile, storeName } = usePreview();

  return (
    <div className="flex flex-col gap-2.5" style={{ padding }}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        <div className="flex items-center gap-1">
          {isMobile && <MenuIconSlot />}
          {draft.sections.header.showSearch && <SearchIconSlot />}
        </div>
        <div className="flex items-center gap-2.5">
          <StoreLogo size={34} fontSize={17} />
          <span
            className="text-lg font-extrabold tracking-[-0.01em] whitespace-nowrap"
            style={{ fontFamily: theme.displayFont }}
          >
            {storeName}
          </span>
        </div>
        <div className="flex justify-end">{bag}</div>
      </div>
      {!isMobile && <StoreMenu style={{ justifyContent: 'center', gap: 24 }} />}
    </div>
  );
}

export function CompactHeader({
  bag,
  padding,
}: {
  readonly bag: ReactNode;
  readonly padding: string;
}) {
  const { draft } = useEditor();
  const { theme, isMobile, storeName } = usePreview();
  const section = draft.sections.header;
  const colors = theme.schemeOf(section.colorScheme);

  return (
    <div className="flex items-center gap-3" style={{ padding }}>
      <div className="flex shrink-0 items-center gap-2.5">
        <StoreLogo size={34} fontSize={17} />
        {!isMobile && (
          <span
            className="text-base font-extrabold whitespace-nowrap"
            style={{ fontFamily: theme.displayFont }}
          >
            {storeName}
          </span>
        )}
      </div>
      {section.showSearch ? (
        <div
          className="text-note flex h-[38px] min-w-0 flex-1 items-center gap-2 px-3.5"
          style={{
            borderRadius: theme.buttonRadius,
            background:
              section.colorScheme === 'base' ? theme.tokens.soft : 'rgba(127,127,127,.16)',
            color: colors.muted,
          }}
        >
          <SearchLens className="size-4 shrink-0" />
          <span className="truncate">{t.preview.search}</span>
        </div>
      ) : (
        <div className="flex-1" />
      )}
      {bag}
    </div>
  );
}
