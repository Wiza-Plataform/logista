import type { Unit } from '@/shared/contracts/catalog/unit';
import { fieldErrorOf, generalErrorOf } from '@/shared/forms/form-failure';
import type { FormFailure } from '@/shared/forms/form-failure';
import { SwitchRow } from '@/shared/forms/switch-row';
import { strings } from '@/shared/i18n/strings';
import { AlertMessage, Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

const text = strings.units;
const DRAWER_INPUT = 'bg-background';
const FIELD_NAMES = ['name', 'symbol'] as const;

export function UnitFields({
  unit,
  failure,
}: {
  readonly unit: Unit | null;
  readonly failure: FormFailure | null;
}) {
  const generalError = generalErrorOf(failure, FIELD_NAMES);

  return (
    <>
      {generalError === null ? null : <AlertMessage text={generalError} />}
      <input type="hidden" name="unitUlid" value={unit?.unitUlid ?? ''} />
      <Field label={text.name} error={fieldErrorOf(failure, 'name')}>
        <Input
          variant="form"
          name="name"
          required
          maxLength={40}
          defaultValue={unit?.name ?? ''}
          placeholder={text.namePlaceholder}
          aria-invalid={fieldErrorOf(failure, 'name') !== undefined}
          className={DRAWER_INPUT}
        />
      </Field>
      <Field label={text.symbol} error={fieldErrorOf(failure, 'symbol')}>
        <Input
          variant="form"
          name="symbol"
          required
          maxLength={10}
          defaultValue={unit?.symbol ?? ''}
          placeholder={text.symbolPlaceholder}
          aria-invalid={fieldErrorOf(failure, 'symbol') !== undefined}
          className={DRAWER_INPUT}
        />
      </Field>
      <SwitchRow
        name="allowsFractions"
        label={text.fractions}
        description={text.fractionsHint}
        isDefaultOn={unit?.allowsFractions ?? false}
      />
    </>
  );
}
