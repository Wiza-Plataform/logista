'use client';

import type { ReferenceItem } from '@/shared/contracts/platform-config';
import { strings } from '@/shared/i18n/strings';
import { AlertMessage } from '@/shared/ui/field';

import { AccountStep } from './account-step';
import { BrandingStep } from './branding-step';
import { WizardNavigation } from './navigation';
import { StepBar } from './step-bar';
import type { Step } from './step-bar';
import { TaxStep } from './tax-step';
import { LAST_STEP, useWizard } from './use-wizard';

const STEPS: readonly Step[] = [
  { id: 'account', label: strings.onboarding.stepAccount },
  { id: 'tax', label: strings.onboarding.stepTax },
  { id: 'branding', label: strings.onboarding.stepBranding },
];

const HEADINGS = [
  { title: strings.onboarding.accountTitle, subtitle: strings.onboarding.accountSubtitle },
  { title: strings.onboarding.taxTitle, subtitle: strings.onboarding.taxSubtitle },
  { title: strings.onboarding.brandingTitle, subtitle: strings.onboarding.brandingSubtitle },
];

interface WizardProps {
  categories: readonly ReferenceItem[];
  businessTypes: readonly ReferenceItem[];
}

function Heading({ heading }: { heading: { title: string; subtitle: string } | undefined }) {
  if (heading === undefined) return null;

  return (
    <div className="mb-5">
      <h1 className="text-h1 font-extrabold tracking-[-0.5px]">{heading.title}</h1>
      <p className="text-muted-foreground text-body mt-1.25 leading-[1.5]">{heading.subtitle}</p>
    </div>
  );
}

function CurrentStep({
  wizard,
  categories,
  businessTypes,
}: WizardProps & { wizard: ReturnType<typeof useWizard> }) {
  if (wizard.step === 0) {
    return (
      <AccountStep
        values={wizard.form}
        categories={categories}
        errors={wizard.errors}
        onChange={wizard.setField}
      />
    );
  }
  if (wizard.step === 1) {
    return (
      <TaxStep
        values={wizard.form}
        businessTypes={businessTypes}
        errors={wizard.errors}
        onChange={wizard.setField}
      />
    );
  }
  return <BrandingStep values={wizard.form} errors={wizard.errors} onChange={wizard.setField} />;
}

export function Wizard({ categories, businessTypes }: WizardProps) {
  const t = strings.onboarding;
  const wizard = useWizard();

  return (
    <>
      <StepBar steps={STEPS} currentStep={wizard.step} />
      <Heading heading={HEADINGS.at(wizard.step)} />

      {wizard.alertMessage !== null && <AlertMessage text={wizard.alertMessage} />}

      <CurrentStep wizard={wizard} categories={categories} businessTypes={businessTypes} />

      <WizardNavigation
        step={wizard.step}
        lastStep={LAST_STEP}
        isSaving={wizard.isSaving}
        onBack={wizard.goBack}
        onNext={wizard.goNext}
        onFinish={wizard.finish}
        onSkip={wizard.skip}
      />

      <p className="mt-4.5 text-center text-sm leading-[1.6] text-[var(--txt-faint)]">
        {wizard.step === LAST_STEP ? t.brandingFooter : t.accountFooter}
      </p>
    </>
  );
}
