'use client';

import { useState, useTransition } from 'react';
import type { SubmitEvent } from 'react';

import { ConfirmRemoval } from '@/shared/blocks/confirm-removal';
import { SideDrawer } from '@/shared/blocks/side-drawer';
import type { Unit } from '@/shared/contracts/catalog/unit';
import { useToast } from '@/shared/feedback/toaster';
import type { FormFailure } from '@/shared/forms/form-failure';
import { strings } from '@/shared/i18n/strings';
import { Button } from '@/shared/ui/button';

import { deleteUnitAction, saveUnitAction } from './actions';
import type { UnitActionResult } from './unit-action-result';
import { UnitFields } from './unit-fields';

const text = strings.units;
const FORM_ID = 'unit-form';

interface UnitDrawerProps {
  readonly unit: Unit | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

function confirmationOf(result: UnitActionResult): string | null {
  switch (result.status) {
    case 'created':
      return text.created;
    case 'updated':
      return text.updated;
    case 'removed':
      return text.removed;
    case 'failed':
      return null;
  }
}

function useUnitActions(onClose: () => void) {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const [failure, setFailure] = useState<FormFailure | null>(null);

  function settle(result: UnitActionResult) {
    const confirmation = confirmationOf(result);
    if (result.status === 'failed') setFailure(result);
    if (confirmation === null) return;
    toast(confirmation);
    onClose();
  }

  return {
    isPending,
    failure,
    save: (formData: FormData) => {
      startTransition(async () => {
        settle(await saveUnitAction(formData));
      });
    },
    remove: (unitUlid: string) => {
      startTransition(async () => {
        settle(await deleteUnitAction(unitUlid));
      });
    },
  };
}

export function UnitDrawer({ unit, isOpen, onClose }: UnitDrawerProps) {
  const { isPending, failure, save, remove } = useUnitActions(onClose);

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    save(new FormData(event.currentTarget));
  }

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={unit === null ? text.drawerNew : text.drawerEdit}
      footer={
        <>
          {unit === null ? null : (
            <ConfirmRemoval
              isPending={isPending}
              onConfirm={() => {
                remove(unit.unitUlid);
              }}
            />
          )}
          <Button
            type="submit"
            form={FORM_ID}
            variant="brand"
            size="action"
            disabled={isPending}
            className="ml-auto"
          >
            {isPending ? text.saving : text.save}
          </Button>
        </>
      }
    >
      <form id={FORM_ID} onSubmit={submit} noValidate>
        <UnitFields unit={unit} failure={failure} />
      </form>
    </SideDrawer>
  );
}
