import type { ReactNode } from 'react';

import { formatKwanza } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { Parcel, WhatsApp } from '@/shared/ui/icons';

import styles from './login-scene.module.css';

const scene = strings.login.brand.scene;

function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl border border-[var(--auth-scene-glass-border)] bg-[var(--auth-scene-glass)]',
        styles.glass,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SceneChatCard() {
  const chat = scene.chat;

  return (
    <div className={cn('absolute top-3 left-0 w-44.5 [--scene-delay:-2s]', styles.floatChat)}>
      <GlassCard className="gap-2 p-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-full bg-[var(--lima)] text-[var(--verde-primario)]">
            <WhatsApp className="size-3.25" strokeWidth={2.4} />
          </div>
          <span className="text-fine font-bold">{chat.channel}</span>
          <span className="text-label ml-auto font-medium text-[var(--auth-scene-muted)]">
            {chat.when}
          </span>
        </div>
        <div
          className={cn(
            'text-caption max-w-[88%] self-start rounded-[12px_12px_12px_4px] bg-[var(--auth-scene-bubble)] px-2.5 py-2 leading-[1.35] font-medium text-[var(--auth-scene-bubble-txt)]',
            styles.chatQuestion,
          )}
        >
          {chat.question}
        </div>
        <div className="grid">
          <div
            className={cn(
              'col-start-1 row-start-1 flex gap-1 self-start justify-self-end rounded-[12px_12px_4px_12px] px-3 py-2.5',
              styles.chatTyping,
            )}
          >
            <span className={cn('size-1.5 rounded-full bg-[var(--lima)]', styles.typingDot)} />
            <span
              className={cn(
                'size-1.5 rounded-full bg-[var(--lima)] [--scene-delay:-0.85s]',
                styles.typingDot,
              )}
            />
            <span
              className={cn(
                'size-1.5 rounded-full bg-[var(--lima)] [--scene-delay:-0.7s]',
                styles.typingDot,
              )}
            />
          </div>
          <div
            className={cn(
              'text-caption col-start-1 row-start-1 max-w-[88%] justify-self-end rounded-[12px_12px_4px_12px] bg-[var(--lima)] px-2.5 py-2 leading-[1.35] font-bold text-[var(--verde-primario)]',
              styles.chatAnswer,
            )}
          >
            {chat.answer}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export function ScenePaymentCard() {
  const payment = scene.payment;

  return (
    <div className={cn('absolute top-10 left-113 w-47 [--scene-delay:-4s]', styles.floatPayment)}>
      <GlassCard className={cn('gap-2.5 px-3.5 py-3', styles.paymentToast)}>
        <div className="flex items-center gap-2.5">
          <div className="flex size-7.5 flex-none items-center justify-center rounded-full bg-[var(--lima)]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              strokeWidth={2.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 fill-none stroke-[var(--verde-primario)]"
            >
              <path d="M5 12.5l4.5 4.5L19 7.5" className={styles.check} />
            </svg>
          </div>
          <div className="flex min-w-0 flex-col gap-0.75">
            <span className="text-fine leading-[1.2] font-bold">{payment.title}</span>
            <span className="text-label leading-[1.2] font-medium text-[var(--auth-scene-muted)]">
              {payment.method}
            </span>
          </div>
        </div>
        <div className="flex items-baseline justify-between gap-1.5 border-t border-[var(--auth-scene-divider)] pt-2.5">
          <span className="text-label font-medium whitespace-nowrap text-[var(--auth-scene-muted)]">
            {payment.order}
          </span>
          <span className="text-amount leading-none font-extrabold whitespace-nowrap text-[var(--lima)]">
            {formatKwanza(payment.amountInCents)}
          </span>
        </div>
      </GlassCard>
    </div>
  );
}

function DeliveryTrack() {
  return (
    <div className="relative h-4">
      <div className="absolute inset-x-1 top-1.75 h-0.5 rounded-xs bg-[var(--auth-scene-track)]" />
      <div className={cn('absolute inset-x-1 top-1.75 h-0.5 rounded-xs', styles.trip)} />
      <div className="absolute top-1 left-0 size-2 rounded-full border-2 border-[var(--auth-scene-peach)] bg-[var(--auth-panel-base)]" />
      <div className="absolute top-0.75 right-0 size-2.5 rounded-full bg-[var(--lima)]" />
      <div
        className={cn(
          'absolute top-0 -ml-2 size-4 rounded-full bg-[var(--auth-panel-txt)]',
          styles.moto,
        )}
      />
    </div>
  );
}

export function SceneDeliveryCard() {
  const delivery = scene.delivery;

  return (
    <div
      className={cn('absolute top-64.5 left-0 w-44.5 [--scene-delay:-1s]', styles.floatDelivery)}
    >
      <GlassCard className="gap-2.5 p-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-[8px] bg-[var(--auth-scene-peach-soft)] text-[var(--auth-scene-peach)]">
            <Parcel className="size-3.5" strokeWidth={2} />
          </div>
          <span className="text-fine font-bold">{delivery.title}</span>
          <span className="text-label ml-auto grid leading-none font-bold">
            <span
              className={cn(
                'col-start-1 row-start-1 justify-self-end text-[var(--auth-scene-peach)]',
                styles.statusOnTheWay,
              )}
            >
              {delivery.onTheWay}
            </span>
            <span
              className={cn(
                'col-start-1 row-start-1 justify-self-end text-[var(--lima)]',
                styles.statusDelivered,
              )}
            >
              {delivery.delivered}
            </span>
          </span>
        </div>
        <span className="text-xs leading-[1.2] font-medium text-[var(--auth-scene-soft)]">
          {delivery.route}
        </span>
        <DeliveryTrack />
      </GlassCard>
    </div>
  );
}
