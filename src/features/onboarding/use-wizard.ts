'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { createStoreAction, saveBrandingAction, saveFiscalIdentityAction } from './actions';
import { toFieldMessages } from './error-messages';
import type { Result, StoreForm } from './types';
import { useStoreForm } from './use-store-form';
import { validateAccount, validateTax } from './validation';

export const LAST_STEP = 2;

async function createStoreWithFiscalIdentity(form: StoreForm): Promise<Result<string>> {
  const created = await createStoreAction({
    name: form.name.trim(),
    subdomain: form.subdomain.trim(),
    categoryUlid: form.categoryUlid,
    nif: form.nif.trim(),
    whatsappPhone: form.whatsappPhone.trim(),
    email: form.email.trim(),
  });
  if (!created.ok) return created;

  if (form.bizTypeUlid !== '') {
    const fiscal = await saveFiscalIdentityAction(created.data.storeUlid, {
      bizTypeUlid: form.bizTypeUlid,
      vatRegime: form.vatRegime,
    });
    if (!fiscal.ok) return fiscal;
  }

  return { ok: true, data: created.data.storeUlid };
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
  const [step, setStep] = useState(0);
  const [storeUlid, setStoreUlid] = useState<string | null>(null);
  const formState = useStoreForm();

  const enterDashboard = () => {
    router.push('/');
  };
  const goToFirstStep = () => {
    setStep(0);
  };

  async function createStore() {
    const created = await createStoreWithFiscalIdentity(formState.form);
    if (!created.ok) {
      formState.fail(created, goToFirstStep);
      return;
    }
    setStoreUlid(created.data);
    setStep(LAST_STEP);
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
    const failures = step === 0 ? validateAccount(formState.form) : validateTax(formState.form);
    if (!formState.showErrors(toFieldMessages(failures))) return;

    if (step === 0) {
      setStep(1);
      return;
    }
    startSaving(createStore);
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
    goNext,
    finish,
    goBack: goToFirstStep,
    skip: enterDashboard,
  };
}
