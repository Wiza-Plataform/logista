'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { SubmitEvent } from 'react';

import { strings } from '@/shared/i18n/strings';

import { signInAction } from './actions';
import { fieldsBlamedBy, invalidSignInFields, signInProblem } from './validation';
import type { SignInField } from './validation';

export function useLoginForm(rememberedEmail: string) {
  const router = useRouter();
  const [isSubmitting, startSubmitting] = useTransition();
  const [email, setEmail] = useState(rememberedEmail);
  const [password, setPassword] = useState('');
  const [shouldRemember, setShouldRemember] = useState(true);
  const [invalidFields, setInvalidFields] = useState<readonly SignInField[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  async function signIn() {
    const result = await signInAction({ email: email.trim(), password }, shouldRemember);
    if (result.ok) {
      router.push('/');
      return;
    }
    setInvalidFields(fieldsBlamedBy(result));
    setAlertMessage(result.message);
  }

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = invalidSignInFields(email, password);
    const problem = signInProblem(fields);
    setInvalidFields(fields);
    setAlertMessage(problem === null ? null : strings.login.problems[problem]);
    if (problem !== null) return;
    startSubmitting(signIn);
  }

  return {
    email,
    password,
    shouldRemember,
    alertMessage,
    isSubmitting,
    isInvalid: (field: SignInField) => invalidFields.includes(field),
    setEmail,
    setPassword,
    setShouldRemember,
    submit,
  };
}
