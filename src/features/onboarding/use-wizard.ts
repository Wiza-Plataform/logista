'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { saveBrandingAction, startStoreAction } from './actions';
import { toFieldMessages } from './error-messages';
import type { StartStoreInput, StoreForm } from './types';
import { useStoreForm } from './use-store-form';
import { validateAccount } from './validation';

export const ACCOUNT_STEP = 0;
export const BRANDING_STEP = 1;

function startInputOf(form: StoreForm, hasAccount: boolean): StartStoreInput {
  return {
    storeName: form.name.trim(),
    account: hasAccount
      ? null
      : {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone,
          password: form.password,
        },
  };
}

function hasNoBranding(form: StoreForm): boolean {
  return form.description.trim() === '' && form.primaryColor === '';
}

export function useWizard(initial: { hasAccount: boolean; storeUlid: string | null }) {
  const router = useRouter();
  const [isSaving, startSaving] = useTransition();
  const [step, setStep] = useState(initial.storeUlid === null ? ACCOUNT_STEP : BRANDING_STEP);
  const [hasAccount, setHasAccount] = useState(initial.hasAccount);
  const [storeUlid, setStoreUlid] = useState(initial.storeUlid);
  const formState = useStoreForm();

  const enterDashboard = () => {
    router.push('/');
  };
  const goToFirstStep = () => {
    setStep(ACCOUNT_STEP);
  };

  async function startStore() {
    const started = await startStoreAction(startInputOf(formState.form, hasAccount));
    if (!started.ok) {
      if (started.hasAccount) setHasAccount(true);
      formState.fail(started, goToFirstStep);
      return;
    }
    setHasAccount(true);
    setStoreUlid(started.data.storeUlid);
    setStep(BRANDING_STEP);
  }

  async function saveBranding(ulid: string) {
    const description = formState.form.description.trim();
    const saved = await saveBrandingAction(ulid, {
      description: description === '' ? null : description,
      primaryColor: formState.form.primaryColor === '' ? null : formState.form.primaryColor,
    });
    if (!saved.ok) {
      formState.fail(saved, goToFirstStep);
      return;
    }
    enterDashboard();
  }

  function goNext() {
    const failures = validateAccount(formState.form, !hasAccount);
    if (!formState.showErrors(toFieldMessages(failures))) return;
    startSaving(startStore);
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

  return {
    ...formState,
    step,
    isSaving,
    hasAccount,
    isLastStep: step === BRANDING_STEP,
    goNext,
    finish,
    skip: enterDashboard,
  };
}
