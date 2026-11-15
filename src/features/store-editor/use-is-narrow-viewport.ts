'use client';

import { useSyncExternalStore } from 'react';

const NARROW_VIEWPORT = '(max-width: 899px)';

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(NARROW_VIEWPORT);
  query.addEventListener('change', onChange);
  return () => {
    query.removeEventListener('change', onChange);
  };
}

function isNarrowNow(): boolean {
  return window.matchMedia(NARROW_VIEWPORT).matches;
}

function isNarrowOnServer(): boolean {
  return false;
}

export function useIsNarrowViewport(): boolean {
  return useSyncExternalStore(subscribe, isNarrowNow, isNarrowOnServer);
}
