'use client';

import { SideDrawer } from '@/shared/blocks/side-drawer';
import type { StockItem } from '@/shared/contracts/catalog/stock';
import { strings } from '@/shared/i18n/strings';
import { Button } from '@/shared/ui/button';

import { MovementFields, MovementHistoryList, VariantSummary } from './movement-parts';
import { useMovementForm } from './use-movement-form';
import { useMovementHistory } from './use-movement-history';

const text = strings.stock;
const FORM_ID = 'stock-movement-form';

interface MovementDrawerProps {
  readonly item: StockItem;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function MovementDrawer({ item, isOpen, onClose }: MovementDrawerProps) {
  const { history, reload } = useMovementHistory(item.variantUlid);
  const form = useMovementForm(item, reload);

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={text.drawerTitle}
      footer={
        <Button
          type="submit"
          form={FORM_ID}
          variant="brand"
          size="action"
          disabled={form.isPending}
          className="ml-auto"
        >
          {form.isPending ? text.registering : text.register}
        </Button>
      }
    >
      <VariantSummary item={item} />
      <form id={FORM_ID} onSubmit={form.submit} noValidate>
        <MovementFields
          item={item}
          values={form.values}
          failure={form.failure}
          onChange={form.change}
        />
      </form>
      <MovementHistoryList history={history} unitSymbol={item.unitSymbol} />
    </SideDrawer>
  );
}
