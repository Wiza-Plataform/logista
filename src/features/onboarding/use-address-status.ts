'use client';

import { useEffect, useRef, useState } from 'react';

import { strings } from '@/shared/i18n/strings';

import { checkAddressAction } from './actions';

const DEBOUNCE_MS = 400;
const MIN_LENGTH = 2;

export type AddressStatus =
  | { phase: 'idle' }
  | { phase: 'checking' }
  | { phase: 'available'; subdomain: string }
  | { phase: 'unavailable'; reason: string };

export function useAddressStatus(name: string): AddressStatus {
  const [status, setStatus] = useState<AddressStatus>({ phase: 'idle' });
  const latestRequest = useRef(0);

  useEffect(() => {
    const value = name.trim();
    if (value.length < MIN_LENGTH) {
      setStatus({ phase: 'idle' });
      return;
    }

    setStatus({ phase: 'checking' });
    const requestId = ++latestRequest.current;

    const timer = setTimeout(() => {
      void checkAddressAction(value).then((result) => {
        if (requestId !== latestRequest.current) return;

        if (!result.ok) {
          setStatus({ phase: 'unavailable', reason: result.message });
          return;
        }

        const { subdomain, available, reason } = result.data;
        setStatus(
          available && subdomain !== null
            ? { phase: 'available', subdomain }
            : { phase: 'unavailable', reason: reason ?? strings.apiErrors.unexpected },
        );
      });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [name]);

  return status;
}
