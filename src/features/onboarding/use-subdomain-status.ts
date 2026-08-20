'use client';

import { useEffect, useRef, useState } from 'react';

import { checkSubdomainAction } from './actions';

const DEBOUNCE_MS = 400;
const MIN_LENGTH = 3;

export type SubdomainStatus =
  | { phase: 'idle' }
  | { phase: 'checking' }
  | { phase: 'available' }
  | { phase: 'taken'; reason: string };

export function useSubdomainStatus(subdomain: string): SubdomainStatus {
  const [status, setStatus] = useState<SubdomainStatus>({ phase: 'idle' });
  const latestRequest = useRef(0);

  useEffect(() => {
    const value = subdomain.trim();
    if (value.length < MIN_LENGTH) {
      setStatus({ phase: 'idle' });
      return;
    }

    setStatus({ phase: 'checking' });
    const requestId = ++latestRequest.current;

    const timer = setTimeout(() => {
      void checkSubdomainAction(value).then((result) => {
        if (requestId !== latestRequest.current) return;

        if (!result.ok) {
          setStatus({ phase: 'taken', reason: result.message });
          return;
        }

        setStatus(
          result.data.available
            ? { phase: 'available' }
            : { phase: 'taken', reason: result.data.reason ?? '' },
        );
      });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [subdomain]);

  return status;
}
