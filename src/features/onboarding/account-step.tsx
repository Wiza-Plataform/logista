'use client';

import type { ReferenceItem } from '@/shared/contracts/platform-config';
import { strings } from '@/shared/i18n/strings';
import {
  Field,
  FieldGroup,
  FieldHint,
  FieldPair,
  FieldState,
  InputAffix,
  NativeSelect,
} from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type { FieldMessages, StoreForm, StoreFormField } from './types';
import { useSubdomainStatus } from './use-subdomain-status';
import type { SubdomainStatus } from './use-subdomain-status';

export type AccountValues = Pick<
  StoreForm,
  'name' | 'subdomain' | 'categoryUlid' | 'whatsappPhone' | 'email'
>;

interface AccountStepProps {
  values: AccountValues;
  categories: readonly ReferenceItem[];
  errors: FieldMessages;
  onChange: <K extends StoreFormField>(field: K, value: StoreForm[K]) => void;
}

type FieldProps = Omit<AccountStepProps, 'categories'>;

function TradeNameField({ values, errors, onChange }: FieldProps) {
  const t = strings.onboarding;

  return (
    <Field label={t.tradeName} isRequired error={errors.name}>
      <Input
        variant="form"
        value={values.name}
        aria-invalid={errors.name !== undefined}
        placeholder={t.tradeNamePlaceholder}
        onChange={(event) => {
          onChange('name', event.target.value);
        }}
      />
    </Field>
  );
}

function SubdomainAvailability({ status }: { status: SubdomainStatus }) {
  const t = strings.onboarding;

  if (status.phase === 'checking') {
    return <p className="mt-1.75 text-xs text-[var(--txt-faint)]">{t.subdomainChecking}</p>;
  }
  if (status.phase === 'available') {
    return <FieldState tone="positive" text={t.subdomainAvailable} />;
  }
  if (status.phase === 'taken') {
    return <FieldState tone="negative" text={status.reason} />;
  }
  return null;
}

function StoreAddressField({ values, errors, onChange }: FieldProps) {
  const t = strings.onboarding;
  const status = useSubdomainStatus(values.subdomain);

  return (
    <Field label={t.storeAddress} isRequired error={errors.subdomain}>
      <InputAffix
        value={values.subdomain}
        suffix={t.domainSuffix}
        autoComplete="off"
        isInvalid={errors.subdomain !== undefined || status.phase === 'taken'}
        placeholder={t.subdomainPlaceholder}
        onChange={(event) => {
          onChange('subdomain', event.target.value);
        }}
      />
      <SubdomainAvailability status={status} />
    </Field>
  );
}

function CategoryField({ values, categories, errors, onChange }: AccountStepProps) {
  const t = strings.onboarding;

  return (
    <Field label={t.category} isRequired error={errors.categoryUlid}>
      <NativeSelect
        value={values.categoryUlid}
        aria-invalid={errors.categoryUlid !== undefined}
        onChange={(event) => {
          onChange('categoryUlid', event.target.value);
        }}
      >
        <option value="">{t.selectPlaceholder}</option>
        {categories.map((category) => (
          <option key={category.ulid} value={category.ulid}>
            {category.label}
          </option>
        ))}
      </NativeSelect>
    </Field>
  );
}

function ContactFields({ values, errors, onChange }: FieldProps) {
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
              onChange('whatsappPhone', event.target.value);
            }}
          />
        </Field>

        <Field label={t.email} isRequired error={errors.email}>
          <Input
            variant="form"
            type="email"
            value={values.email}
            aria-invalid={errors.email !== undefined}
            placeholder={t.emailPlaceholder}
            onChange={(event) => {
              onChange('email', event.target.value);
            }}
          />
        </Field>
      </FieldPair>

      <FieldHint>
        {t.contactHintStart}
        <b className="font-semibold text-[var(--accent-text)]">{t.contactHintHighlight}</b>
        {t.contactHintEnd}
      </FieldHint>
    </FieldGroup>
  );
}

export function AccountStep({ values, categories, errors, onChange }: AccountStepProps) {
  return (
    <>
      <FieldGroup>
        <TradeNameField values={values} errors={errors} onChange={onChange} />
        <StoreAddressField values={values} errors={errors} onChange={onChange} />
        <CategoryField
          values={values}
          categories={categories}
          errors={errors}
          onChange={onChange}
        />
      </FieldGroup>
      <ContactFields values={values} errors={errors} onChange={onChange} />
    </>
  );
}
