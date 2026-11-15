import { useId } from 'react';

import { cn } from '@/shared/lib/utils';

export function SwitchControl({
  label,
  isOn,
  onChange,
}: {
  readonly label: string;
  readonly isOn: boolean;
  readonly onChange: (isOn: boolean) => void;
}) {
  const labelId = useId();

  return (
    <div className="flex min-h-[38px] items-center justify-between gap-3 max-[899px]:min-h-11">
      <span id={labelId} className="text-body font-semibold">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-labelledby={labelId}
        onClick={() => {
          onChange(!isOn);
        }}
        className={cn(
          "relative h-6 w-10 shrink-0 rounded-full border transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none max-[899px]:after:absolute max-[899px]:after:-inset-x-1 max-[899px]:after:-inset-y-2.5 max-[899px]:after:content-['']",
          isOn ? 'border-(--lima) bg-primary' : 'border-border bg-muted',
        )}
      >
        <span
          className={cn(
            'absolute top-[2px] size-[18px] rounded-full transition-[left,background-color] duration-150',
            isOn ? 'left-[18px] bg-(--verde-primario)' : 'bg-muted-foreground left-[2px]',
          )}
        />
      </button>
    </div>
  );
}
