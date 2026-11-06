'use client';

import { InputIcon } from '@/shared/forms/input-icon';
import { PasswordField } from '@/shared/forms/password-field';
import { strings } from '@/shared/i18n/strings';
import { PublicNote, PublicNoteLink } from '@/shared/shell/public-text';
import { Button } from '@/shared/ui/button';
import { Field } from '@/shared/ui/field';
import { Arrow, Mail } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';

import { LoginAlert } from './login-alert';
import { RememberCheckbox } from './remember-checkbox';
import { useLoginForm } from './use-login-form';

function SubmitContent({ isSubmitting }: { isSubmitting: boolean }) {
  const t = strings.login;

  if (isSubmitting) {
    return (
      <>
        <span
          aria-hidden="true"
          className="size-4 animate-[spin_0.6s_linear_infinite] rounded-full border-2 border-[var(--verde-primario)]/30 border-t-[var(--verde-primario)]"
        />
        <span className="sr-only">{t.submitting}</span>
      </>
    );
  }

  return (
    <>
      {t.submit}
      <Arrow className="size-4" strokeWidth={2} />
    </>
  );
}

export function LoginForm({ rememberedEmail }: { rememberedEmail: string }) {
  const t = strings.login;
  const form = useLoginForm(rememberedEmail);

  return (
    <>
      <div className="mb-6.5">
        <h1 className="text-h1 mb-1.5 font-extrabold tracking-[-0.4px]">{t.title}</h1>
        <p className="text-note text-muted-foreground leading-[1.5]">{t.subtitle}</p>
      </div>

      {form.alertMessage !== null && <LoginAlert text={form.alertMessage} />}

      <form noValidate onSubmit={form.submit}>
        <Field label={t.email} variant="auth">
          <InputIcon icon={Mail}>
            <Input
              variant="auth"
              type="email"
              value={form.email}
              maxLength={254}
              autoComplete="username"
              aria-invalid={form.isInvalid('email')}
              placeholder={t.emailPlaceholder}
              className="pl-10"
              onChange={(event) => {
                form.setEmail(event.target.value);
              }}
            />
          </InputIcon>
        </Field>

        <PasswordField
          variant="auth"
          value={form.password}
          error={undefined}
          isInvalid={form.isInvalid('password')}
          placeholder={t.passwordPlaceholder}
          autoComplete="current-password"
          onChange={form.setPassword}
        />

        <div className="mt-0.5 mb-5 flex items-center justify-between">
          <RememberCheckbox isChecked={form.shouldRemember} onChange={form.setShouldRemember} />
        </div>

        <Button
          type="submit"
          variant="brand"
          size="auth"
          disabled={form.isSubmitting}
          aria-busy={form.isSubmitting}
        >
          <SubmitContent isSubmitting={form.isSubmitting} />
        </Button>
      </form>

      <PublicNote className="text-fine mt-5.5">
        {t.noAccountStart}
        <PublicNoteLink href="/onboarding">{t.noAccountLink}</PublicNoteLink>
      </PublicNote>
    </>
  );
}
