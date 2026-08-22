import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';
import { Check, Close } from '@/shared/ui/icons';
import { inputVariants } from '@/shared/ui/input';

export type FieldTone = 'positive' | 'negative';

function FieldLabel({
  label,
  hint,
  isRequired,
}: {
  label: string;
  hint: string | undefined;
  isRequired: boolean;
}) {
  return (
    <span className="text-foreground mb-1.75 block text-sm font-medium">
      {label} {isRequired && <span className="text-[var(--st-cancel-fg)]">*</span>}
      {hint !== undefined && <span className="font-normal text-[var(--txt-faint)]">{hint}</span>}
    </span>
  );
}

export function Field({
  label,
  hint,
  isRequired = false,
  isGroup = false,
  adornment,
  error,
  children,
}: {
  label: string;
  hint?: string;
  isRequired?: boolean;
  isGroup?: boolean;
  adornment?: ReactNode;
  error?: string | undefined;
  children: ReactNode;
}) {
  const heading = <FieldLabel label={label} hint={hint} isRequired={isRequired} />;

  return (
    <div className="mb-3.5 last:mb-0">
      <div className="relative">
        {isGroup ? (
          <div role="group" aria-label={label}>
            {heading}
            {children}
          </div>
        ) : (
          <label className="block">
            {heading}
            {children}
          </label>
        )}
        {adornment}
      </div>
      {error !== undefined && <FieldState tone="negative" text={error} />}
    </div>
  );
}

export function FieldState({ tone, text }: { tone: FieldTone; text: string }) {
  const isPositive = tone === 'positive';
  const ToneIcon = isPositive ? Check : Close;

  return (
    <p
      className={cn(
        'mt-1.75 flex items-center gap-1.5 text-xs font-medium',
        isPositive ? 'text-[var(--st-paid-fg)]' : 'text-[var(--st-cancel-fg)]',
      )}
    >
      <ToneIcon className="size-3.25 shrink-0" strokeWidth={2.6} />
      {text}
    </p>
  );
}

export function FieldHint({ children }: { children: ReactNode }) {
  return <p className="mt-1.75 text-xs leading-[1.45] text-[var(--txt-faint)]">{children}</p>;
}

export function FieldGroup({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="mb-5.5">
      {title !== undefined && (
        <div className="text-label mb-3.25 font-semibold tracking-[0.07em] uppercase text-[var(--txt-faint)]">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export function FieldPair({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

export function NativeSelect({
  className,
  ...props
}: React.ComponentProps<'select'> & { className?: string }) {
  return (
    <select
      {...props}
      className={cn(inputVariants({ variant: 'form' }), 'cursor-pointer', className)}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<'textarea'> & { className?: string }) {
  return (
    <textarea
      {...props}
      className={cn(
        inputVariants({ variant: 'form' }),
        'h-auto min-h-17.5 resize-y py-2.5 leading-[1.5]',
        className,
      )}
    />
  );
}

export function InputAffix({
  prefix,
  suffix,
  isInvalid = false,
  ...props
}: Omit<React.ComponentProps<'input'>, 'prefix'> & {
  prefix?: string;
  suffix?: string;
  isInvalid?: boolean;
}) {
  return (
    <div
      className={cn(
        'bg-card flex h-10.5 items-center overflow-hidden rounded-sm border transition-[border-color,box-shadow] duration-150',
        isInvalid
          ? 'border-destructive'
          : 'border-border focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/15',
      )}
    >
      {prefix !== undefined && (
        <span className="pl-3 text-sm whitespace-nowrap text-[var(--txt-faint)]">{prefix}</span>
      )}
      <input
        {...props}
        aria-invalid={isInvalid}
        className="text-body text-foreground min-w-0 flex-1 border-none bg-transparent px-3 outline-none placeholder:text-[var(--txt-faint)]"
      />
      {suffix !== undefined && (
        <span className="border-border text-muted-foreground flex h-full items-center border-l bg-[var(--surface-2)] px-3 text-sm whitespace-nowrap">
          {suffix}
        </span>
      )}
    </div>
  );
}

export function AlertMessage({ text }: { text: string }) {
  return (
    <p
      role="alert"
      className="mb-3.5 rounded-sm border border-[var(--st-cancel-fg)] bg-[var(--st-cancel-bg)] px-3 py-2.25 text-sm text-[var(--st-cancel-fg)]"
    >
      {text}
    </p>
  );
}
