import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { BrandSymbol } from '@/shared/shell/brand-symbol';

import { BrandBackdrop } from './brand-backdrop';
import { BrandScene } from './brand-scene';
import { BrandSteps } from './brand-steps';
import styles from './login-scene.module.css';
import { RotatingHeadline } from './rotating-headline';

function BrandHeader() {
  const t = strings.login.brand;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <BrandSymbol tone="on-dark" className="size-9.5" />
        <span className="text-wordmark font-[family-name:var(--font-sansita)] tracking-[-0.02em] text-[var(--lima)]">
          {t.name}
        </span>
      </div>
      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--auth-panel-pill-border)] bg-[var(--auth-panel-pill)] px-3.5 py-2 text-sm font-bold text-[var(--auth-panel-label)] backdrop-blur-[6px]">
        <span
          aria-hidden="true"
          className={cn('size-1.75 rounded-full bg-[var(--lima)]', styles.liveDot)}
        />
        {t.pill}
      </span>
    </div>
  );
}

export function BrandPanel() {
  return (
    <aside
      aria-label={strings.login.brand.aside}
      className={cn(
        'relative isolate flex min-w-0 flex-[3_1_600px] flex-col gap-6 overflow-hidden bg-[var(--auth-panel-base)] px-14 py-11 text-[var(--auth-panel-txt)] max-[1020px]:hidden',
        styles.panel,
      )}
    >
      <BrandBackdrop />
      <BrandHeader />
      <BrandScene />
      <RotatingHeadline />
      <BrandSteps />
    </aside>
  );
}
