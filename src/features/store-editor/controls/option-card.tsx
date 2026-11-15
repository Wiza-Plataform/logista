import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

const SELECTED = 'border-foreground shadow-[0_0_0_3px_var(--active-ring)]';
const IDLE = 'border-border hover:border-(--txt-faint)';

export function OptionCard({
  isSelected,
  onClick,
  className,
  children,
}: {
  readonly isSelected: boolean;
  readonly onClick: () => void;
  readonly className?: string;
  readonly children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onClick}
      className={cn(
        'bg-card text-foreground rounded-[12px] border-[1.5px] text-left transition-[border-color,box-shadow] duration-150 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none',
        isSelected ? SELECTED : IDLE,
        className,
      )}
    >
      {children}
    </button>
  );
}

export interface VisualChoice<T> {
  readonly value: T;
  readonly label: string;
  readonly art: ReactNode;
}

export function VisualChoices<T extends string>({
  label,
  value,
  choices,
  columns,
  onChange,
}: {
  readonly label: string;
  readonly value: T;
  readonly choices: readonly VisualChoice<T>[];
  readonly columns: 2 | 3;
  readonly onChange: (value: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('grid gap-2', columns === 2 ? 'grid-cols-2' : 'grid-cols-3')}
    >
      {choices.map((choice) => (
        <OptionCard
          key={choice.value}
          isSelected={choice.value === value}
          onClick={() => {
            onChange(choice.value);
          }}
          className="flex flex-col gap-1.5 px-1.5 pt-1.5 pb-2"
        >
          <span aria-hidden="true">{choice.art}</span>
          <span className="text-fine text-center font-bold">{choice.label}</span>
        </OptionCard>
      ))}
    </div>
  );
}
