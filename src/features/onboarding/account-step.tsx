'use client';

import { maskLocalPhoneAO } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { Field, FieldGroup, FieldHint, FieldPair, FieldState, InputAffix } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import { PasswordField } from './password-field';
import { deriveSubdomain } from './subdomain';
import type { FieldMessages, StoreForm, StoreFormField } from './types';
import { useSubdomainStatus } from './use-subdomain-status';
import type { SubdomainStatus } from './use-subdomain-status';

export type AccountValues = Pick<StoreForm, 'name' | 'whatsappPhone' | 'email' | 'password'>;

interface AccountStepProps {
  values: AccountValues;
  errors: FieldMessages;
  onChange: <K extends StoreFormField>(field: K, value: StoreForm[K]) => void;
}

function AddressPreview({ subdomain, status }: { subdomain: string; status: SubdomainStatus }) {
  const t = strings.onboarding;

  if (subdomain === '') return null;
  if (status.phase === 'checking') {
    return <FieldHint>{t.subdomainChecking}</FieldHint>;
  }
  if (status.phase === 'taken') {
    return <FieldState tone="negative" text={status.reason} />;
  }
  if (status.phase === 'idle') return null;

  return (
    <FieldState tone="positive" text={`${subdomain}${t.domainSuffix}${t.addressAvailableSuffix}`} />
  );
}

function TradeNameField({ values, errors, onChange }: AccountStepProps) {
  const t = strings.onboarding;
  const subdomain = deriveSubdomain(values.name);
  const status = useSubdomainStatus(subdomain);

  return (
    <Field label={t.tradeName} isRequired error={errors.name}>
      <Input
        variant="form"
        value={values.name}
        maxLength={120}
        aria-invalid={errors.name !== undefined || status.phase === 'taken'}
        placeholder={t.tradeNamePlaceholder}
        onChange={(event) => {
          onChange('name', event.target.value);
        }}
      />
      {errors.name === undefined && <AddressPreview subdomain={subdomain} status={status} />}
    </Field>
  );
}

function ContactFields({ values, errors, onChange }: AccountStepProps) {
  const t = strings.onboarding;

  return (
    <FieldGroup title={t.contactsGroup}>
      <FieldPair>
        <Field label={t.mobile} isRequired error={errors.whatsappPhone}>
          <InputAffix
            value={values.whatsappPhone}
            prefix={t.phonePrefix}
            inputMode="tel"
            isInvalid={errors.whatsappPhone !== undefined}
            placeholder={t.phonePlaceholder}
            onChange={(event) => {
              onChange('whatsappPhone', maskLocalPhoneAO(event.target.value));
            }}
          />
        </Field>

        <Field label={t.email} isRequired error={errors.email}>
          <Input
            variant="form"
            type="email"
            value={values.email}
            maxLength={160}
            aria-invalid={errors.email !== undefined}
            placeholder={t.emailPlaceholder}
            onChange={(event) => {
              onChange('email', event.target.value);
            }}
          />
        </Field>
      </FieldPair>

      <PasswordField
        value={values.password}
        error={errors.password}
        onChange={(value) => {
          onChange('password', value);
        }}
      />

      <FieldHint>
        {t.contactHintStart}
        <b className="font-semibold text-[var(--accent-text)]">{t.contactHintHighlight}</b>
        {t.contactHintEnd}
      </FieldHint>
    </FieldGroup>
  );
}

export function AccountStep({ values, errors, onChange }: AccountStepProps) {
  return (
    <>
      <FieldGroup>
        <TradeNameField values={values} errors={errors} onChange={onChange} />
      </FieldGroup>
      <ContactFields values={values} errors={errors} onChange={onChange} />
    </>
  );
}
