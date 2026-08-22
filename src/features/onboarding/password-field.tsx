'use client';

import { useState } from 'react';

import { strings } from '@/shared/i18n/strings';
import { Field } from '@/shared/ui/field';
import { Eye } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';

export function PasswordField({
  value,
  error,
  onChange,
}: {
  value: string;
  error: string | undefined;
  onChange: (value: string) => void;
}) {
  const t = strings.onboarding;
  const [isVisible, setIsVisible] = useState(false);

  const eye = (
    <button
      type="button"
      aria-label={isVisible ? t.passwordHide : t.passwordShow}
      aria-pressed={isVisible}
      onClick={() => {
        setIsVisible(!isVisible);
      }}
      className="text-muted-foreground hover:text-foreground absolute right-2.5 bottom-0 grid h-10.5 w-7 place-items-center rounded-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      <Eye className="size-4.25" strokeWidth={1.8} />
    </button>
  );

  return (
    <Field label={t.password} isRequired error={error} adornment={eye}>
      <Input
        variant="form"
        type={isVisible ? 'text' : 'password'}
        value={value}
        autoComplete="new-password"
        aria-invalid={error !== undefined}
        placeholder={t.passwordPlaceholder}
        className="pr-9.5"
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </Field>
  );
}
