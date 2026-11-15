import { cn } from '@/shared/lib/utils';

export interface SegmentOption<T> {
  readonly value: T;
  readonly label: string;
}

interface SegmentControlProps<T> {
  readonly label: string;
  readonly value: T;
  readonly options: readonly SegmentOption<T>[];
  readonly onChange: (value: T) => void;
}

export function SegmentControl<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: SegmentControlProps<T>) {
  return (
    <div role="group" aria-label={label} className="bg-muted flex gap-1 rounded-[11px] p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => {
            onChange(option.value);
          }}
          className={cn(
            'text-sm min-h-9 flex-1 rounded-[8px] font-bold transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none max-[899px]:min-h-11',
            option.value === value
              ? 'bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.16)]'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
