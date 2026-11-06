import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import styles from './login-scene.module.css';

export function RotatingHeadline() {
  const t = strings.login.brand;

  return (
    <div className="flex max-w-[560px] flex-col gap-4">
      <h2 className="text-hero leading-[1.02] font-extrabold tracking-[-0.035em] text-[var(--auth-panel-txt)]">
        <span className="sr-only">{t.headline}</span>
        <span aria-hidden="true" className="block">
          {t.headlineLead}
        </span>
        <span aria-hidden="true" className="block h-[1.16em] overflow-hidden text-[var(--lima)]">
          <span className={cn('flex flex-col', styles.words)}>
            {t.headlineDestinations.map((destination, index) => (
              <span
                key={`${String(index)}-${destination}`}
                className="block h-[1.16em] leading-[1.16em]"
              >
                {destination}
              </span>
            ))}
          </span>
        </span>
      </h2>
      <p className="text-lead max-w-[460px] leading-[1.6] text-[var(--auth-panel-txt-dim)]">
        {t.text}
      </p>
    </div>
  );
}
