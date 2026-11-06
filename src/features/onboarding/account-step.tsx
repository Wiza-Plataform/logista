'use client';

import { PasswordField } from '@/shared/forms/password-field';
import { maskLocalPhoneAO } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { Field, FieldGroup, FieldHint, FieldPair, FieldState, InputAffix } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type { FieldMessages, StoreForm, StoreFormField } from './types';
import { useAddressStatus } from './use-address-status';
import type { AddressStatus } from './use-address-status';

export type AccountValues = Pick<StoreForm, 'name' | 'fullName' | 'phone' | 'email' | 'password'>;

interface AccountFieldsProps {
  values: AccountValues;
  errors: FieldMessages;
  onChange: <K extends StoreFormField>(field: K, value: StoreForm[K]) => void;
}

function AddressPreview({ status }: { status: AddressStatus }) {
  const t = strings.onboarding;

  if (status.phase === 'idle') return null;
  if (status.phase === 'checking') {
    return <FieldHint>{t.subdomainChecking}</FieldHint>;
  }
  if (status.phase === 'unavailable') {
    return <FieldState tone="negative" text={status.reason} />;
  }

  return (
    <FieldState
      tone="positive"
      text={`${status.subdomain}${t.domainSuffix}${t.addressAvailableSuffix}`}
    />
  );
}

function TradeNameField({ values, errors, onChange }: AccountFieldsProps) {
  const t = strings.onboarding;
  const status = useAddressStatus(values.name);

  return (
    <Field label={t.tradeName} isRequired error={errors.name}>
      <Input
        variant="form"
        value={values.name}
        maxLength={120}
        aria-invalid={errors.name !== undefined || status.phase === 'unavailable'}
        placeholder={t.tradeNamePlaceholder}
        onChange={(event) => {
          onChange('name', event.target.value);
        }}
      />
      {errors.name === undefined && <AddressPreview status={status} />}
    </Field>
  );
}

function PhoneAndEmail({ values, errors, onChange }: AccountFieldsProps) {
  const t = strings.onboarding;

  return (
    <FieldPair>
      <Field label={t.mobile} isRequired error={errors.phone}>
        <InputAffix
          value={values.phone}
          prefix={t.phonePrefix}
          inputMode="tel"
          autoComplete="tel-national"
          isInvalid={errors.phone !== undefined}
          placeholder={t.phonePlaceholder}
          onChange={(event) => {
            onChange('phone', maskLocalPhoneAO(event.target.value));
          }}
        />
      </Field>

      <Field label={t.email} isRequired error={errors.email}>
        <Input
          variant="form"
          type="email"
          value={values.email}
          maxLength={160}
          autoComplete="email"
          aria-invalid={errors.email !== undefined}
          placeholder={t.emailPlaceholder}
          onChange={(event) => {
            onChange('email', event.target.value);
          }}
        />
      </Field>
    </FieldPair>
  );
}

function ContactFields({ values, errors, onChange }: AccountFieldsProps) {
  const t = strings.onboarding;

  return (
    <FieldGroup title={t.contactsGroup}>
      <Field label={t.fullName} isRequired error={errors.fullName}>
        <Input
          variant="form"
          value={values.fullName}
          maxLength={120}
          autoComplete="name"
          aria-invalid={errors.fullName !== undefined}
          placeholder={t.fullNamePlaceholder}
          onChange={(event) => {
            onChange('fullName', event.target.value);
          }}
        />
      </Field>

      <PhoneAndEmail values={values} errors={errors} onChange={onChange} />

      <PasswordField
        value={values.password}
        error={errors.password}
        placeholder={t.passwordPlaceholder}
        autoComplete="new-password"
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

export function AccountStep({
  hasAccount,
  ...fields
}: AccountFieldsProps & { hasAccount: boolean }) {
  return (
    <>
      <FieldGroup>
        <TradeNameField {...fields} />
      </FieldGroup>
      {!hasAccount && <ContactFields {...fields} />}
    </>
  );
}
