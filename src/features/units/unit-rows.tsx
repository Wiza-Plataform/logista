import { BodyCell, BodyRow, DataTable, HeadCell } from '@/shared/blocks/data-table';
import { IconButton } from '@/shared/blocks/icon-button';
import { MobileCard, MobileCardList } from '@/shared/blocks/mobile-cards';
import { StatusBadge } from '@/shared/blocks/status-badge';
import type { Unit } from '@/shared/contracts/catalog/unit';
import { strings } from '@/shared/i18n/strings';
import { Pencil } from '@/shared/ui/icons';

const text = strings.units;

interface UnitRowsProps {
  readonly units: readonly Unit[];
  readonly onEdit: (unit: Unit) => void;
}

function FractionBadge({ unit }: { readonly unit: Unit }) {
  return unit.allowsFractions ? (
    <StatusBadge tone="paid">{text.acceptsFractions}</StatusBadge>
  ) : (
    <StatusBadge tone="done">{text.wholeOnly}</StatusBadge>
  );
}

function SymbolTag({ unit }: { readonly unit: Unit }) {
  return <span className="text-sm text-muted-foreground font-mono">{unit.symbol}</span>;
}

function EditUnitButton({
  unit,
  onEdit,
}: {
  readonly unit: Unit;
  readonly onEdit: (unit: Unit) => void;
}) {
  return (
    <IconButton
      label={`${text.edit} ${unit.name}`}
      icon={Pencil}
      onClick={() => {
        onEdit(unit);
      }}
    />
  );
}

export function UnitTable({ units, onEdit }: UnitRowsProps) {
  return (
    <DataTable
      head={
        <>
          <HeadCell>{text.columns.name}</HeadCell>
          <HeadCell>{text.columns.symbol}</HeadCell>
          <HeadCell>{text.columns.fractions}</HeadCell>
          <HeadCell align="right">{text.columns.action}</HeadCell>
        </>
      }
    >
      {units.map((unit) => (
        <BodyRow key={unit.unitUlid}>
          <BodyCell>
            <span className="text-body font-semibold">{unit.name}</span>
          </BodyCell>
          <BodyCell>
            <SymbolTag unit={unit} />
          </BodyCell>
          <BodyCell>
            <FractionBadge unit={unit} />
          </BodyCell>
          <BodyCell align="right">
            <EditUnitButton unit={unit} onEdit={onEdit} />
          </BodyCell>
        </BodyRow>
      ))}
    </DataTable>
  );
}

export function UnitCards({ units, onEdit }: UnitRowsProps) {
  return (
    <MobileCardList>
      {units.map((unit) => (
        <MobileCard
          key={unit.unitUlid}
          top={
            <>
              <span className="text-body flex-1 font-semibold">{unit.name}</span>
              <EditUnitButton unit={unit} onEdit={onEdit} />
            </>
          }
          fields={[
            { label: text.columns.symbol, value: <SymbolTag unit={unit} /> },
            { label: text.columns.fractions, value: <FractionBadge unit={unit} /> },
          ]}
        />
      ))}
    </MobileCardList>
  );
}
