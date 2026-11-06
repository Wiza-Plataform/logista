'use client';

import { useState, useTransition } from 'react';

import type { ProductDetails } from '@/shared/contracts/catalog/product';
import { useToast } from '@/shared/feedback/toaster';
import { strings } from '@/shared/i18n/strings';

import {
  removeProductImageAction,
  reorderProductImagesAction,
  uploadProductImageAction,
} from './actions';
import { FormSection } from './form-section';
import { PhotoGrid } from './photo-grid';
import { photoFormOf, selectPhotos } from './photo-rules';
import type { ProductChangeResult } from './product-action-result';
import type { PhotoQueue } from './use-photo-queue';

const text = strings.productForm;

export function QueuedPhotosSection({
  queue,
  isBusy,
}: {
  readonly queue: PhotoQueue;
  readonly isBusy: boolean;
}) {
  return (
    <FormSection title={text.photos}>
      <PhotoGrid
        photos={queue.photos.map((photo) => ({ key: photo.key, src: photo.previewUrl }))}
        uploadingCount={0}
        isBusy={isBusy}
        onAdd={queue.add}
        onRemove={queue.remove}
        onPromote={queue.promote}
      />
    </FormSection>
  );
}

function useSavedPhotos(product: ProductDetails) {
  const toast = useToast();
  const [isBusy, startTransition] = useTransition();
  const [uploadingCount, setUploadingCount] = useState(0);
  const images = [...product.images].sort((left, right) => left.position - right.position);

  function settle(result: ProductChangeResult, confirmation: string): boolean {
    if (result.status === 'failed') {
      toast(result.message, 'error');
      return false;
    }
    toast(confirmation);
    return true;
  }

  function add(files: readonly File[]) {
    const selected = selectPhotos(files, images.length, (message) => {
      toast(message, 'error');
    });
    if (selected.length === 0) return;

    setUploadingCount(selected.length);
    startTransition(async () => {
      for (const [index, file] of selected.entries()) {
        const result = await uploadProductImageAction(product.productUlid, photoFormOf(file));
        setUploadingCount(selected.length - index - 1);
        if (!settle(result, text.photoAdded)) break;
      }
      setUploadingCount(0);
    });
  }

  function remove(imageUlid: string) {
    startTransition(async () => {
      settle(await removeProductImageAction(product.productUlid, imageUlid), text.photoRemoved);
    });
  }

  function promote(imageUlid: string) {
    const order = [
      imageUlid,
      ...images.map((image) => image.imageUlid).filter((ulid) => ulid !== imageUlid),
    ];
    startTransition(async () => {
      settle(await reorderProductImagesAction(product.productUlid, order), text.photoPromoted);
    });
  }

  return {
    photos: images.map((image) => ({ key: image.imageUlid, src: image.thumbnailUrl })),
    uploadingCount,
    isBusy,
    add,
    remove,
    promote,
  };
}

export function SavedPhotosSection({ product }: { readonly product: ProductDetails }) {
  const photos = useSavedPhotos(product);

  return (
    <FormSection title={text.photos}>
      <PhotoGrid
        photos={photos.photos}
        uploadingCount={photos.uploadingCount}
        isBusy={photos.isBusy}
        onAdd={photos.add}
        onRemove={photos.remove}
        onPromote={photos.promote}
      />
    </FormSection>
  );
}
