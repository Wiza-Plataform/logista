interface SwitchRowProps {
  readonly name: string;
  readonly label: string;
  readonly description?: string;
  readonly isDefaultOn: boolean;
}

export function SwitchRow({ name, label, description, isDefaultOn }: SwitchRowProps) {
  return (
    <label className="bg-background border-border flex cursor-pointer items-center justify-between gap-3 rounded-[10px] border px-[13px] py-[11px]">
      <span className="flex flex-col gap-0.5">
        <span className="text-note text-foreground">{label}</span>
        {description === undefined ? null : (
          <span className="text-xs text-(--txt-faint)">{description}</span>
        )}
      </span>
      <span className="relative h-[23px] w-10 shrink-0">
        <input
          type="checkbox"
          role="switch"
          name={name}
          defaultChecked={isDefaultOn}
          className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
        />
        <span
          aria-hidden="true"
          className="bg-muted border-border peer-checked:bg-primary peer-checked:border-(--lima) peer-focus-visible:ring-ring/50 absolute inset-0 rounded-full border transition-colors duration-[160ms] peer-focus-visible:ring-3"
        />
        <span
          aria-hidden="true"
          className="bg-muted-foreground absolute top-[3px] left-[3px] size-[17px] rounded-full transition-[transform,background-color] duration-[160ms] peer-checked:translate-x-[17px] peer-checked:bg-(--verde-primario)"
        />
      </span>
    </label>
  );
}
