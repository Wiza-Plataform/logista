import { cn } from '@/shared/lib/utils';

import styles from './login-scene.module.css';

export function BrandBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 overflow-hidden">
      <div className={cn('absolute -top-65 -left-55 size-180 rounded-full', styles.glowAccent)} />
      <div className={cn('absolute top-30 -right-65 size-205 rounded-full', styles.glowGreen)} />
      <div className={cn('absolute inset-0', styles.dots)} />
      <div className={cn('absolute inset-0', styles.fade)} />
    </div>
  );
}
