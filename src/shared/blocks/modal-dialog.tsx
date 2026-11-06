'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';

import { strings } from '@/shared/i18n/strings';
import { Close } from '@/shared/ui/icons';

interface ModalDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly description: string;
  readonly children: ReactNode;
}

export function ModalDialog({ isOpen, onClose, title, description, children }: ModalDialogProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[70] bg-black/55 transition-opacity duration-[220ms] data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="bg-card border-border fixed top-1/2 left-1/2 z-[71] flex max-h-[calc(100vh-48px)] w-[440px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-[16px] border shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-[opacity,translate] duration-[220ms] outline-none data-ending-style:translate-y-[calc(-50%+10px)] data-ending-style:opacity-0 data-starting-style:translate-y-[calc(-50%+10px)] data-starting-style:opacity-0">
          <div className="border-border flex items-center justify-between gap-3 border-b px-5 py-[15px]">
            <div className="min-w-0">
              <Dialog.Title className="text-note font-semibold">{title}</Dialog.Title>
              <Dialog.Description className="text-caption text-muted-foreground mt-0.5 truncate">
                {description}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label={strings.drawer.close}
              className="bg-card border-border text-muted-foreground hover:text-foreground hover:border-ring grid size-8 shrink-0 place-items-center rounded-[9px] border transition-colors"
            >
              <Close className="size-[15px]" strokeWidth={1.8} />
            </Dialog.Close>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto p-5">{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
