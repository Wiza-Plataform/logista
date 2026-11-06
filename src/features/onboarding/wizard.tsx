'use client';

import { strings } from '@/shared/i18n/strings';
import { PublicHeading, PublicNote, PublicNoteLink } from '@/shared/shell/public-text';
import { AlertMessage } from '@/shared/ui/field';

import { AccountStep } from './account-step';
import { BrandingStep } from './branding-step';
import { WizardNavigation } from './navigation';
import { StepBar } from './step-bar';
import type { Step } from './step-bar';
import { ACCOUNT_STEP, useWizard } from './use-wizard';

const STEPS: readonly Step[] = [
  { id: 'account', label: strings.onboarding.stepAccount },
  { id: 'branding', label: strings.onboarding.stepBranding },
];

function Heading({ step, hasAccount }: { step: number; hasAccount: boolean }) {
  const t = strings.onboarding;

  if (step !== ACCOUNT_STEP) {
    return <PublicHeading title={t.brandingTitle} subtitle={t.brandingSubtitle} />;
  }
  return (
    <PublicHeading
      title={t.accountTitle}
      subtitle={hasAccount ? t.storeOnlySubtitle : t.accountSubtitle}
    />
  );
}

function Footer({ step, hasAccount }: { step: number; hasAccount: boolean }) {
  const t = strings.onboarding;

  if (step !== ACCOUNT_STEP) {
    return (
      <PublicNote>
        {t.brandingFooterStart}
        <b className="font-semibold text-[var(--accent-text)]">{t.brandingFooterHighlight}</b>
        {t.brandingFooterEnd}
      </PublicNote>
    );
  }
  if (hasAccount) return <PublicNote>{t.accountFooter}</PublicNote>;

  return (
    <PublicNote>
      {t.accountFooter} {t.haveAccountStart}
      <PublicNoteLink href="/login">{t.haveAccountLink}</PublicNoteLink>
    </PublicNote>
  );
}

export function Wizard({
  hasAccount,
  storeUlid,
}: {
  hasAccount: boolean;
  storeUlid: string | null;
}) {
  const wizard = useWizard({ hasAccount, storeUlid });

  return (
    <>
      <StepBar steps={STEPS} currentStep={wizard.step} />
      <Heading step={wizard.step} hasAccount={wizard.hasAccount} />

      {wizard.alertMessage !== null && <AlertMessage text={wizard.alertMessage} />}

      {wizard.step === ACCOUNT_STEP ? (
        <AccountStep
          values={wizard.form}
          errors={wizard.errors}
          hasAccount={wizard.hasAccount}
          onChange={wizard.setField}
        />
      ) : (
        <BrandingStep values={wizard.form} errors={wizard.errors} onChange={wizard.setField} />
      )}

      <WizardNavigation
        isLastStep={wizard.isLastStep}
        isSaving={wizard.isSaving}
        onNext={wizard.goNext}
        onFinish={wizard.finish}
        onSkip={wizard.skip}
      />

      <Footer step={wizard.step} hasAccount={wizard.hasAccount} />
    </>
  );
}
