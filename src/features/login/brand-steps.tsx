import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import styles from './login-scene.module.css';

const STEP_DELAYS = ['[--scene-delay:0s]', '[--scene-delay:-8s]', '[--scene-delay:-4s]'] as const;

function BrandStep({
  position,
  title,
  description,
  delay,
}: {
  position: number;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <li
      className={cn(
        'relative flex flex-col gap-2 overflow-hidden rounded-lg border border-[var(--auth-panel-card-border)] bg-[var(--auth-panel-card)] p-4',
        styles.stepCard,
        delay,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'text-fine flex size-6.5 flex-none items-center justify-center rounded-full border border-[var(--auth-panel-badge-border)] font-extrabold',
            styles.stepNumber,
            delay,
          )}
        >
          {position}
        </span>
        <span className="text-step leading-[1.3] font-bold">{title}</span>
      </div>
      <span className="text-sm leading-[1.45] font-medium text-[var(--auth-panel-txt-faint)]">
        {description}
      </span>
      <span
        aria-hidden="true"
        className={cn('absolute inset-x-0 bottom-0 h-0.5 bg-[var(--lima)]', styles.stepBar, delay)}
      />
    </li>
  );
}

export function BrandSteps() {
  return (
    <ol className="grid grid-cols-3 gap-3">
      {strings.login.brand.steps.map((step, index) => (
        <BrandStep
          key={step.title}
          position={index + 1}
          title={step.title}
          description={step.description}
          delay={STEP_DELAYS[index] ?? STEP_DELAYS[0]}
        />
      ))}
    </ol>
  );
}
