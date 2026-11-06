import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';

import styles from './login-scene.module.css';

const cities = strings.login.brand.scene.cities;

const ROUTES = [
  'M446 206 C 476 182, 498 186, 528 190',
  'M444 236 C 468 262, 482 280, 500 282',
  'M440 262 C 468 330, 528 346, 578 346',
] as const;

const PINS = [
  {
    label: cities.luanda,
    position: 'top-46 left-130.5',
    runner: styles.runnerLuanda,
    ping: styles.pingLuanda,
    city: styles.cityLuanda,
  },
  {
    label: cities.benguela,
    position: 'top-69 left-123.5',
    runner: styles.runnerBenguela,
    ping: styles.pingBenguela,
    city: styles.cityBenguela,
  },
  {
    label: cities.lubango,
    position: 'top-85 left-143',
    runner: styles.runnerLubango,
    ping: styles.pingLubango,
    city: styles.cityLubango,
  },
] as const;

export function SceneRoutes() {
  return (
    <>
      <svg
        viewBox="0 0 640 400"
        className="absolute top-0 left-0 h-100 w-160 overflow-visible fill-none"
      >
        {ROUTES.map((route) => (
          <path key={route} d={route} className={styles.route} />
        ))}
      </svg>

      {PINS.map((pin) => (
        <div
          key={pin.label}
          className={cn(
            'absolute top-0 left-0 size-2.5 rounded-full bg-[var(--lima)]',
            styles.runner,
            pin.runner,
          )}
        />
      ))}

      {PINS.map((pin) => (
        <div key={pin.label} className={cn('absolute size-3', pin.position)}>
          <div
            className={cn('absolute inset-0 rounded-full bg-[var(--lima)]', styles.ping, pin.ping)}
          />
          <div
            className={cn(
              'absolute inset-px rounded-full bg-[var(--auth-panel-txt)]',
              styles.pinCore,
            )}
          />
          <span
            className={cn(
              'text-fine absolute -top-1 left-5 leading-5 font-bold whitespace-nowrap text-[var(--auth-scene-city)]',
              pin.city,
            )}
          >
            {pin.label}
          </span>
        </div>
      ))}
    </>
  );
}
