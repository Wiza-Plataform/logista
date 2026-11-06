'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';

import { strings } from '@/shared/i18n/strings';
import { Close } from '@/shared/ui/icons';

interface SideDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly children: ReactNode;
  readonly footer: ReactNode;
}

export function SideDrawer({ isOpen, onClose, title, children, footer }: SideDrawerProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[55] bg-black/50 transition-opacity duration-[280ms] data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="bg-card border-border fixed inset-y-0 right-0 z-[60] flex w-[440px] max-w-[92vw] flex-col border-l shadow-[-12px_0_40px_rgba(0,0,0,0.3)] transition-transform duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] outline-none data-ending-style:translate-x-full data-starting-style:translate-x-full">
          <div className="border-border flex items-center justify-between gap-3 border-b px-5 py-[18px]">
            <Dialog.Title className="text-lead font-bold">{title}</Dialog.Title>
            <Dialog.Close
              aria-label={strings.drawer.close}
              className="bg-card border-border text-muted-foreground hover:text-foreground hover:border-ring grid size-[38px] place-items-center rounded-[10px] border transition-colors"
            >
              <Close className="size-[18px]" strokeWidth={1.8} />
            </Dialog.Close>
          </div>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">{children}</div>
          <div className="border-border flex items-center gap-2.5 border-t px-5 py-4">{footer}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
