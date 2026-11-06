'use client';

import { useEffect, useRef, useState } from 'react';

import { useToast } from '@/shared/feedback/toaster';

import { selectPhotos } from './photo-rules';

export interface QueuedPhoto {
  readonly key: string;
  readonly file: File;
  readonly previewUrl: string;
}

export interface PhotoQueue {
  readonly photos: readonly QueuedPhoto[];
  readonly add: (files: readonly File[]) => void;
  readonly remove: (key: string) => void;
  readonly promote: (key: string) => void;
}

export function usePhotoQueue(): PhotoQueue {
  const toast = useToast();
  const [photos, setPhotos] = useState<readonly QueuedPhoto[]>([]);
  const latestPhotos = useRef(photos);

  useEffect(() => {
    latestPhotos.current = photos;
  }, [photos]);

  useEffect(
    () => () => {
      for (const photo of latestPhotos.current) URL.revokeObjectURL(photo.previewUrl);
    },
    [],
  );

  return {
    photos,
    add: (files) => {
      const selected = selectPhotos(files, photos.length, (message) => {
        toast(message, 'error');
      });
      const queued = selected.map((file) => ({
        key: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setPhotos((current) => [...current, ...queued]);
    },
    remove: (key) => {
      const removed = photos.find((photo) => photo.key === key);
      if (removed !== undefined) URL.revokeObjectURL(removed.previewUrl);
      setPhotos((current) => current.filter((photo) => photo.key !== key));
    },
    promote: (key) => {
      setPhotos((current) => [
        ...current.filter((photo) => photo.key === key),
        ...current.filter((photo) => photo.key !== key),
      ]);
    },
  };
}
