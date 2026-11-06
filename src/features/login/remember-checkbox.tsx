import { strings } from '@/shared/i18n/strings';
import { Check } from '@/shared/ui/icons';

export function RememberCheckbox({
  isChecked,
  onChange,
}: {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}) {
  return (
    <label className="text-muted-foreground relative flex cursor-pointer items-center gap-2 text-sm select-none before:absolute before:-inset-x-1 before:-inset-y-3.5">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isChecked}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
      />
      <span className="border-border bg-card peer-focus-visible:ring-ring/40 grid size-4.25 shrink-0 place-items-center rounded-[5px] border transition-colors duration-150 peer-checked:border-[var(--lima)] peer-checked:bg-[var(--lima)] peer-focus-visible:ring-3 peer-checked:[&>svg]:opacity-100">
        <Check
          className="size-2.75 text-[var(--verde-primario)] opacity-0 transition-opacity duration-100"
          strokeWidth={3}
        />
      </span>
      {strings.login.remember}
    </label>
  );
}
