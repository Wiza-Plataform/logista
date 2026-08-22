'use client';

import { strings } from '@/shared/i18n/strings';
import { AlertMessage } from '@/shared/ui/field';

import { AccountStep } from './account-step';
import { BrandingStep } from './branding-step';
import { WizardNavigation } from './navigation';
import { ProductStep } from './product-step';
import { StepBar } from './step-bar';
import type { Step } from './step-bar';
import { TaxStep } from './tax-step';
import { ACCOUNT_STEP, PRODUCT_STEP, TAX_STEP, useWizard } from './use-wizard';
import { useProductDraft } from './use-product-draft';

const STEPS: readonly Step[] = [
  { id: 'account', label: strings.onboarding.stepAccount },
  { id: 'tax', label: strings.onboarding.stepTax },
  { id: 'product', label: strings.onboarding.stepProduct },
  { id: 'branding', label: strings.onboarding.stepBranding },
];

const HEADINGS = [
  { title: strings.onboarding.accountTitle, subtitle: strings.onboarding.accountSubtitle },
  { title: strings.onboarding.taxTitle, subtitle: strings.onboarding.taxSubtitle },
  { title: strings.onboarding.productTitle, subtitle: strings.onboarding.productSubtitle },
  { title: strings.onboarding.brandingTitle, subtitle: strings.onboarding.brandingSubtitle },
];

function Heading({ heading }: { heading: { title: string; subtitle: string } | undefined }) {
  if (heading === undefined) return null;

  return (
    <div className="mb-5">
      <h1 className="text-h1 font-extrabold tracking-[-0.5px]">{heading.title}</h1>
      <p className="text-muted-foreground text-body mt-1.25 leading-[1.5]">{heading.subtitle}</p>
    </div>
  );
}

function Footer({ step }: { step: number }) {
  const t = strings.onboarding;
  const className = 'mt-4.5 text-center text-sm leading-[1.6] text-[var(--txt-faint)]';

  if (step === ACCOUNT_STEP) return <p className={className}>{t.accountFooter}</p>;
  if (step === TAX_STEP) return <p className={className}>{t.taxFooter}</p>;
  if (step === PRODUCT_STEP) return <p className={className}>{t.productFooter}</p>;

  return (
    <p className={className}>
      {t.brandingFooterStart}
      <b className="font-semibold text-[var(--accent-text)]">{t.brandingFooterHighlight}</b>
      {t.brandingFooterEnd}
    </p>
  );
}

function CurrentStep({
  wizard,
  product,
}: {
  wizard: ReturnType<typeof useWizard>;
  product: ReturnType<typeof useProductDraft>;
}) {
  if (wizard.step === ACCOUNT_STEP) {
    return <AccountStep values={wizard.form} errors={wizard.errors} onChange={wizard.setField} />;
  }
  if (wizard.step === TAX_STEP) {
    return <TaxStep values={wizard.form} errors={wizard.errors} onChange={wizard.setField} />;
  }
  if (wizard.step === PRODUCT_STEP) {
    return (
      <ProductStep
        draft={product.draft}
        onChange={product.setField}
        onAddPhoto={product.addPhoto}
        onRemovePhoto={product.removePhoto}
      />
    );
  }
  return <BrandingStep values={wizard.form} errors={wizard.errors} onChange={wizard.setField} />;
}

export function Wizard() {
  const wizard = useWizard();
  const product = useProductDraft();

  return (
    <>
      <StepBar steps={STEPS} currentStep={wizard.step} />
      <Heading heading={HEADINGS.at(wizard.step)} />

      {wizard.alertMessage !== null && <AlertMessage text={wizard.alertMessage} />}

      <CurrentStep wizard={wizard} product={product} />

      <WizardNavigation
        canGoBack={wizard.canGoBack}
        canSkip={wizard.canSkip}
        isLastStep={wizard.isLastStep}
        isSaving={wizard.isSaving}
        onBack={wizard.goBack}
        onNext={wizard.goNext}
        onFinish={wizard.finish}
        onSkip={wizard.skip}
      />

      <Footer step={wizard.step} />
    </>
  );
}
