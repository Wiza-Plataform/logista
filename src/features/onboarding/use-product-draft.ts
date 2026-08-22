'use client';

import { useState } from 'react';

import { MAX_PRODUCT_PHOTOS, nextPhotoToken } from './options';
import { EMPTY_PRODUCT } from './types';
import type { ProductDraft, ProductDraftField } from './types';

export function useProductDraft() {
  const [draft, setDraft] = useState<ProductDraft>(EMPTY_PRODUCT);

  return {
    draft,

    setField: (field: ProductDraftField, value: string) => {
      setDraft((previous) => ({ ...previous, [field]: value }));
    },

    addPhoto: () => {
      setDraft((previous) =>
        previous.photos.length >= MAX_PRODUCT_PHOTOS
          ? previous
          : { ...previous, photos: [...previous.photos, nextPhotoToken(previous.photos.length)] },
      );
    },

    removePhoto: (index: number) => {
      setDraft((previous) => ({
        ...previous,
        photos: previous.photos.filter((_, position) => position !== index),
      }));
    },
  };
}
