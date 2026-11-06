'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { AlertCircle, Check } from '@/shared/ui/icons';

const VISIBLE_MS = 2200;

export type ToastTone = 'success' | 'error';

interface Toast {
  readonly id: number;
  readonly message: string;
  readonly tone: ToastTone;
}

type ShowToast = (message: string, tone?: ToastTone) => void;

const ToastContext = createContext<ShowToast | null>(null);

export function useToast(): ShowToast {
  const show = useContext(ToastContext);
  if (show === null) throw new Error('useToast usado fora do ToastProvider.');
  return show;
}

function ToastIcon({ tone }: { readonly tone: ToastTone }) {
  return tone === 'success' ? (
    <Check className="size-[15px] text-(--lima-oliva)" strokeWidth={2} />
  ) : (
    <AlertCircle className="size-[15px] text-(--st-cancel-fg)" strokeWidth={2} />
  );
}

export function ToastProvider({ children }: { readonly children: ReactNode }) {
  const [toasts, setToasts] = useState<readonly Toast[]>([]);

  const show = useCallback<ShowToast>((message, tone = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, tone }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, VISIBLE_MS);
  }, []);

  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-5 left-1/2 z-[9998] flex -translate-x-1/2 flex-col items-center gap-2"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="bg-sidebar border-border text-note text-foreground flex animate-[toast-in_200ms_ease] items-center gap-2 rounded-[10px] border px-4 py-2.5 font-medium shadow-(--shadow)"
          >
            <ToastIcon tone={toast.tone} />
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
