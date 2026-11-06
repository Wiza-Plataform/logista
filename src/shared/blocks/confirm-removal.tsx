'use client';

import { useState } from 'react';

import { strings } from '@/shared/i18n/strings';
import { Button } from '@/shared/ui/button';
import { Trash } from '@/shared/ui/icons';

const text = strings.removal;

interface ConfirmRemovalProps {
  readonly isPending: boolean;
  readonly onConfirm: () => void;
}

export function ConfirmRemoval({ isPending, onConfirm }: ConfirmRemovalProps) {
  const [isConfirming, setConfirming] = useState(false);

  if (!isConfirming) {
    return (
      <Button
        variant="brand-danger"
        size="action"
        disabled={isPending}
        onClick={() => {
          setConfirming(true);
        }}
      >
        <Trash className="size-[15px]" strokeWidth={1.9} />
        {text.remove}
      </Button>
    );
  }

  return (
    <>
      <Button variant="brand-danger" size="action" disabled={isPending} onClick={onConfirm}>
        {isPending ? text.removing : text.confirm}
      </Button>
      <Button
        variant="brand-outline"
        size="action"
        disabled={isPending}
        onClick={() => {
          setConfirming(false);
        }}
      >
        {text.cancel}
      </Button>
    </>
  );
}
