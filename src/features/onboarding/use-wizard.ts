'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { createStoreAction, saveBrandingAction } from './actions';
import { toFieldMessages } from './error-messages';
import { deriveSubdomain } from './subdomain';
import type { Result, StoreForm } from './types';
import { useStoreForm } from './use-store-form';
import { validateAccount, validateTax } from './validation';

export const ACCOUNT_STEP = 0;
export const TAX_STEP = 1;
export const PRODUCT_STEP = 2;
export const LAST_STEP = 3;

function createStoreFrom(form: StoreForm): Promise<Result<{ storeUlid: string }>> {
  return createStoreAction({
    name: form.name.trim(),
    subdomain: deriveSubdomain(form.name),
    nif: form.nif.trim(),
    fiscalName: form.fiscalName.trim(),
    whatsappPhone: form.whatsappPhone.trim(),
    email: form.email.trim(),
  });
}

function saveBrandingOf(storeUlid: string, form: StoreForm): Promise<Result<null>> {
  const description = form.description.trim();

  return saveBrandingAction(storeUlid, {
    description: description === '' ? null : description,
    primaryColor: form.primaryColor === '' ? null : form.primaryColor,
  });
}

function hasNoBranding(form: StoreForm): boolean {
  return form.description.trim() === '' && form.primaryColor === '';
}

export function useWizard() {
  const router = useRouter();
  const [isSaving, startSaving] = useTransition();
  const [step, setStep] = useState(ACCOUNT_STEP);
  const [storeUlid, setStoreUlid] = useState<string | null>(null);
  const formState = useStoreForm();

  const enterDashboard = () => {
    router.push('/');
  };
  const goToFirstStep = () => {
    setStep(ACCOUNT_STEP);
  };

  async function createStore() {
    const created = await createStoreFrom(formState.form);
    if (!created.ok) {
      formState.fail(created, goToFirstStep);
      return;
    }
    setStoreUlid(created.data.storeUlid);
    setStep(PRODUCT_STEP);
  }

  async function saveBranding(ulid: string) {
    const saved = await saveBrandingOf(ulid, formState.form);
    if (!saved.ok) {
      formState.fail(saved, goToFirstStep);
      return;
    }
    enterDashboard();
  }

  function goNext() {
    if (step === ACCOUNT_STEP) {
      if (!formState.showErrors(toFieldMessages(validateAccount(formState.form)))) return;
      setStep(TAX_STEP);
      return;
    }

    if (step === TAX_STEP) {
      if (!formState.showErrors(toFieldMessages(validateTax(formState.form)))) return;
      startSaving(createStore);
      return;
    }

    setStep(LAST_STEP);
  }

  function finish() {
    if (storeUlid === null || hasNoBranding(formState.form)) {
      enterDashboard();
      return;
    }
    startSaving(async () => {
      await saveBranding(storeUlid);
    });
  }

  function skip() {
    if (step === PRODUCT_STEP) {
      setStep(LAST_STEP);
      return;
    }
    enterDashboard();
  }

  return {
    ...formState,
    step,
    isSaving,
    isLastStep: step === LAST_STEP,
    canSkip: step >= PRODUCT_STEP,
    canGoBack: step > ACCOUNT_STEP && (storeUlid === null || step > PRODUCT_STEP),
    goNext,
    finish,
    skip,
    goBack: () => {
      setStep((previous) => Math.max(ACCOUNT_STEP, previous - 1));
    },
  };
}
