'use client';

import { useState } from 'react';

import { PageHead } from '@/shared/blocks/page-head';
import { NoResults, Panel } from '@/shared/blocks/panel';
import type { Unit } from '@/shared/contracts/catalog/unit';
import { formatCount } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { Button } from '@/shared/ui/button';
import { Plus } from '@/shared/ui/icons';

import { UnitDrawer } from './unit-drawer';
import { UnitCards, UnitTable } from './unit-rows';

const text = strings.units;

interface DrawerState {
  readonly isOpen: boolean;
  readonly unit: Unit | null;
  readonly session: number;
}

export function UnitsScreen({ units }: { readonly units: readonly Unit[] }) {
  const [drawer, setDrawer] = useState<DrawerState>({ isOpen: false, unit: null, session: 0 });

  function openFor(unit: Unit | null) {
    setDrawer((current) => ({ isOpen: true, unit, session: current.session + 1 }));
  }

  function close() {
    setDrawer((current) => ({ ...current, isOpen: false }));
  }

  const createButton = (
    <Button
      variant="brand"
      size="action"
      onClick={() => {
        openFor(null);
      }}
    >
      <Plus className="size-[15px]" strokeWidth={1.9} />
      {text.create}
    </Button>
  );

  return (
    <>
      <PageHead
        title={text.title}
        subtitle={
          <>
            <b>{formatCount(units.length)}</b>{' '}
            {units.length === 1 ? text.subtitleSingular : text.subtitlePlural}
          </>
        }
        actions={createButton}
      />
      <Panel>
        {units.length === 0 ? (
          <NoResults>{text.empty}</NoResults>
        ) : (
          <>
            <UnitTable units={units} onEdit={openFor} />
            <UnitCards units={units} onEdit={openFor} />
          </>
        )}
      </Panel>
      <UnitDrawer key={drawer.session} unit={drawer.unit} isOpen={drawer.isOpen} onClose={close} />
    </>
  );
}
