'use client';

import { useState } from 'react';

import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { Field, type FieldVariant } from '@/shared/ui/field';
import { Eye, EyeOff, Lock } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';

import { InputIcon } from './input-icon';

export function PasswordField({
  value,
  error,
  isInvalid = error !== undefined,
  placeholder,
  autoComplete,
  variant = 'form',
  onChange,
}: {
  value: string;
  error: string | undefined;
  isInvalid?: boolean;
  placeholder: string;
  autoComplete: 'new-password' | 'current-password';
  variant?: FieldVariant;
  onChange: (value: string) => void;
}) {
  const t = strings.passwordField;
  const [isVisible, setIsVisible] = useState(false);
  const isAuth = variant === 'auth';
  const EyeIcon = isAuth && isVisible ? EyeOff : Eye;

  const eye = (
    <button
      type="button"
      aria-label={isVisible ? t.hide : t.show}
      aria-pressed={isVisible}
      onClick={() => {
        setIsVisible(!isVisible);
      }}
      className={cn(
        'text-muted-foreground hover:text-foreground absolute right-2.5 bottom-0 grid w-7 place-items-center rounded-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none',
        isAuth ? 'h-11' : 'h-10.5',
      )}
    >
      <EyeIcon className="size-4.25" strokeWidth={1.8} />
    </button>
  );

  const input = (
    <Input
      variant={variant}
      type={isVisible ? 'text' : 'password'}
      value={value}
      autoComplete={autoComplete}
      aria-invalid={isInvalid}
      placeholder={placeholder}
      className={cn('pr-9.5', isAuth && 'pl-10')}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );

  return (
    <Field label={t.label} isRequired={!isAuth} variant={variant} error={error} adornment={eye}>
      {isAuth ? <InputIcon icon={Lock}>{input}</InputIcon> : input}
    </Field>
  );
}
