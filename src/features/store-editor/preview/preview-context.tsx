'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { useEditor } from '../editor-context';
import { storeInitialOf } from '../store-initial';
import { previewThemeOf } from './preview-theme';
import type { PreviewTheme } from './preview-theme';

export const ALL_CATEGORIES = 'all';

export interface PreviewModel {
  readonly theme: PreviewTheme;
  readonly isMobile: boolean;
  readonly storeName: string;
  readonly tagline: string;
  readonly initial: string;
  readonly logoUrl: string | null;
  readonly addressLine: string | null;
  readonly activeCategory: string;
  readonly setActiveCategory: (categoryUlid: string) => void;
}

const PreviewContext = createContext<PreviewModel | null>(null);

export function PreviewProvider({ children }: { readonly children: ReactNode }) {
  const { draft, images, device } = useEditor();
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const theme = useMemo(() => previewThemeOf(draft.style), [draft.style]);
  const { storeName, tagline, address } = draft.identity;

  const model: PreviewModel = {
    theme,
    isMobile: device === 'mobile',
    storeName,
    tagline: tagline ?? '',
    initial: storeInitialOf(storeName),
    logoUrl: images.logoUrl,
    addressLine:
      address === null || address.neighborhood.trim() === ''
        ? null
        : `${address.neighborhood}, ${address.municipality}`,
    activeCategory,
    setActiveCategory,
  };

  return <PreviewContext.Provider value={model}>{children}</PreviewContext.Provider>;
}

export function usePreview(): PreviewModel {
  const model = useContext(PreviewContext);
  if (model === null) throw new Error('usePreview fora do PreviewProvider.');
  return model;
}
