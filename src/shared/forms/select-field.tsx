'use client';

import { Select } from '@base-ui/react/select';

import { cn } from '@/shared/lib/utils';
import { ChevronDown } from '@/shared/ui/icons';
import { inputVariants } from '@/shared/ui/input';

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

interface SelectFieldProps {
  readonly options: readonly SelectOption[];
  readonly name?: string | undefined;
  readonly value?: string | undefined;
  readonly defaultValue?: string | undefined;
  readonly onValueChange?: ((value: string) => void) | undefined;
  readonly isInvalid?: boolean | undefined;
  readonly variant?: 'form' | 'auth' | undefined;
  readonly className?: string | undefined;
}

const TRIGGER =
  'group flex cursor-pointer items-center justify-between gap-2 text-left not-aria-invalid:hover:border-ring data-popup-open:border-ring data-popup-open:ring-3 data-popup-open:ring-ring/15';

const POPUP =
  'bg-card border-border max-h-[min(240px,var(--available-height))] w-(--anchor-width) min-w-45 overflow-y-auto rounded-[11px] border p-[5px] shadow-(--shadow) outline-none';

const OPTION =
  'text-foreground data-highlighted:bg-muted flex w-full cursor-pointer items-center gap-2 rounded-[8px] px-2.5 py-[9px] text-left text-sm outline-none select-none data-selected:font-semibold data-selected:text-(--lima-oliva) data-selected:after:ml-auto data-selected:after:size-1.5 data-selected:after:shrink-0 data-selected:after:rounded-full data-selected:after:bg-(--lima-oliva)';

export function SelectField({
  options,
  name,
  value,
  defaultValue,
  onValueChange,
  isInvalid = false,
  variant = 'form',
  className,
}: SelectFieldProps) {
  return (
    <Select.Root
      items={options}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next: string | null) => {
        onValueChange?.(next ?? '');
      }}
    >
      <Select.Trigger
        aria-invalid={isInvalid}
        className={cn(inputVariants({ variant }), TRIGGER, className)}
      >
        <Select.Value className="truncate" />
        <Select.Icon className="text-muted-foreground flex shrink-0 transition-transform duration-[140ms] group-data-popup-open:rotate-180">
          <ChevronDown className="size-[15px]" strokeWidth={2} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          sideOffset={6}
          alignItemWithTrigger={false}
          className="z-[95] outline-none"
        >
          <Select.Popup className={POPUP}>
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value} className={OPTION}>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
