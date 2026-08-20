'use client';

import { cn } from '@/shared/lib/utils';
import { Check } from '@/shared/ui/icons';

export interface Step {
  readonly id: string;
  readonly label: string;
}

function bubbleClass(isDone: boolean, isCurrent: boolean): string {
  if (isDone) return 'bg-[var(--lima)] border-[var(--lima)] text-[var(--verde-primario)]';
  if (isCurrent) return 'bg-[var(--active-bg)] border-[var(--lima)] text-[var(--lima-oliva)]';
  return 'bg-card border-border text-[var(--txt-faint)]';
}

function labelClass(isDone: boolean, isCurrent: boolean): string {
  if (isCurrent) return 'text-foreground';
  if (isDone) return 'text-muted-foreground';
  return 'text-[var(--txt-faint)]';
}

function Connector({ side, isLit }: { side: 'left' | 'right'; isLit: boolean }) {
  return (
    <span
      className={cn(
        'absolute top-3.5 z-0 h-0.5 w-1/2',
        side === 'left' ? 'left-0' : 'right-0',
        isLit ? 'bg-[var(--lima-oliva)]' : 'bg-border',
      )}
    />
  );
}

function Bubble({
  step,
  index,
  currentStep,
  isFirst,
  isLast,
}: {
  step: Step;
  index: number;
  currentStep: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const isDone = index < currentStep;
  const isCurrent = index === currentStep;

  return (
    <li
      className="relative flex flex-1 flex-col items-center gap-1.75"
      aria-current={isCurrent ? 'step' : undefined}
    >
      {!isFirst && <Connector side="left" isLit={isDone || isCurrent} />}
      {!isLast && <Connector side="right" isLit={isDone} />}

      <span
        className={cn(
          'z-1 grid size-7.5 place-items-center rounded-full border-2 text-sm font-bold transition-[background-color,border-color,color] duration-[180ms]',
          bubbleClass(isDone, isCurrent),
        )}
      >
        {isDone ? <Check className="size-3.75" strokeWidth={3} /> : index + 1}
      </span>
      <span className={cn('text-center text-xs font-semibold', labelClass(isDone, isCurrent))}>
        {step.label}
      </span>
    </li>
  );
}

export function StepBar({ steps, currentStep }: { steps: readonly Step[]; currentStep: number }) {
  return (
    <ol className="mb-6.5 flex items-start">
      {steps.map((step, index) => (
        <Bubble
          key={step.id}
          step={step}
          index={index}
          currentStep={currentStep}
          isFirst={index === 0}
          isLast={index === steps.length - 1}
        />
      ))}
    </ol>
  );
}
