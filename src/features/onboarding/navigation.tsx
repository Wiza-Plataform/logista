'use client';

import { strings } from '@/shared/i18n/strings';
import { Button } from '@/shared/ui/button';
import { Arrow, ArrowLeft, Check } from '@/shared/ui/icons';

function PrimaryAction({
  isLastStep,
  isSaving,
  onClick,
}: {
  isLastStep: boolean;
  isSaving: boolean;
  onClick: () => void;
}) {
  const t = strings.onboarding;
  const ActionIcon = isLastStep ? Check : Arrow;

  function label(): string {
    if (isSaving) return t.saving;
    return isLastStep ? t.finish : t.next;
  }

  return (
    <Button variant="brand" size="form" disabled={isSaving} onClick={onClick}>
      {label()}
      <ActionIcon className="size-3.75" strokeWidth={2} />
    </Button>
  );
}

export function WizardNavigation({
  step,
  lastStep,
  isSaving,
  onBack,
  onNext,
  onFinish,
  onSkip,
}: {
  step: number;
  lastStep: number;
  isSaving: boolean;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  onSkip: () => void;
}) {
  const t = strings.onboarding;
  const isLastStep = step === lastStep;

  return (
    <div className="border-border mt-7 flex items-center gap-2.5 border-t pt-5">
      {step > 0 && !isLastStep && (
        <Button variant="brand-outline" size="form" disabled={isSaving} onClick={onBack}>
          <ArrowLeft className="size-3.75" strokeWidth={2} />
          {t.previous}
        </Button>
      )}

      <div className="ml-auto flex items-center gap-2.5">
        {isLastStep && (
          <Button variant="brand-link" size="form-link" disabled={isSaving} onClick={onSkip}>
            {t.skip}
          </Button>
        )}
        <PrimaryAction
          isLastStep={isLastStep}
          isSaving={isSaving}
          onClick={isLastStep ? onFinish : onNext}
        />
      </div>
    </div>
  );
}
