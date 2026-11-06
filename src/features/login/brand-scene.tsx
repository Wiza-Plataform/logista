import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import styles from './login-scene.module.css';
import { SceneChatCard, SceneDeliveryCard, ScenePaymentCard } from './scene-cards';
import { SceneRoutes } from './scene-routes';
import { SceneStoreCard } from './scene-store-card';

const [firstCustomer, secondCustomer] = strings.login.brand.scene.orbitingCustomers;

function Rings() {
  return (
    <>
      <div className={cn('absolute top-12.5 left-41.25 size-75 rounded-full', styles.halo)} />
      <div className={cn('absolute top-15 left-43.75 size-70 rounded-full', styles.ringAccent)} />
      <div className="absolute top-0 left-28.75 size-100 rounded-full border border-[var(--auth-panel-ring)]" />
      <div
        className={cn(
          'absolute -top-7.5 left-21.25 size-115 rounded-full border border-dashed border-[var(--auth-panel-ring-dashed)]',
          styles.ringWide,
        )}
      />
    </>
  );
}

function OrbitingCustomer({
  initials,
  tone,
  delay,
}: {
  initials: string;
  tone: string;
  delay: string;
}) {
  return (
    <div className={cn('absolute top-0 left-28.75 size-100', styles.orbitSlow, delay)}>
      <div
        className={cn(
          'text-caption absolute -top-4.25 left-45.75 flex size-8.5 items-center justify-center rounded-full border-2 border-[var(--auth-panel-base)] font-extrabold',
          styles.orbitSlowUpright,
          tone,
          delay,
        )}
      >
        {initials}
      </div>
    </div>
  );
}

function Orbits() {
  return (
    <>
      <div className={cn('absolute top-15 left-43.75 size-70', styles.orbitFast)}>
        <div
          className={cn(
            'absolute -top-1 left-34 size-2 rounded-full bg-[var(--lima)]',
            styles.glowAccentDot,
          )}
        />
        <div
          className={cn(
            'absolute top-68.5 left-34.25 size-1.5 rounded-full bg-[var(--auth-scene-peach)]',
            styles.glowPeachDot,
          )}
        />
      </div>
      <OrbitingCustomer
        initials={firstCustomer}
        tone="bg-[var(--auth-scene-peach)] text-[var(--auth-scene-peach-ink)]"
        delay="[--scene-delay:0s]"
      />
      <OrbitingCustomer
        initials={secondCustomer}
        tone="bg-[var(--auth-scene-sand)] text-[var(--auth-scene-sand-ink)]"
        delay="[--scene-delay:-16s]"
      />
    </>
  );
}

export function BrandScene() {
  return (
    <div className="flex min-h-0 flex-auto items-center justify-center">
      <div aria-hidden="true" className={cn('relative h-100 w-160 flex-none', styles.scene)}>
        <Rings />
        <Orbits />
        <SceneRoutes />
        <SceneStoreCard />
        <SceneChatCard />
        <ScenePaymentCard />
        <SceneDeliveryCard />
      </div>
    </div>
  );
}
