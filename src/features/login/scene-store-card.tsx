import type { ReactNode } from 'react';

import { formatKwanza } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { OrderBag, WhatsApp } from '@/shared/ui/icons';

import styles from './login-scene.module.css';
import { BasketArt, DressArt, EarringsArt, SandalsArt } from './scene-product-art';

const store = strings.login.brand.scene.store;

const PRODUCTS = [
  {
    product: store.products.dress,
    art: <DressArt />,
    tile: 'bg-[var(--auth-scene-tile-dress)]',
    shineDelay: '[--scene-delay:0s]',
  },
  {
    product: store.products.sandals,
    art: <SandalsArt />,
    tile: 'bg-[var(--auth-scene-tile-sandals)]',
    shineDelay: '[--scene-delay:-1.2s]',
  },
  {
    product: store.products.basket,
    art: <BasketArt />,
    tile: 'bg-[var(--auth-scene-tile-basket)]',
    shineDelay: '[--scene-delay:-2.4s]',
  },
  {
    product: store.products.earrings,
    art: <EarringsArt />,
    tile: 'bg-[var(--auth-scene-tile-earrings)]',
    shineDelay: '[--scene-delay:-3.6s]',
  },
] as const;

function ProductTile({
  name,
  priceInCents,
  art,
  tile,
  shineDelay,
}: {
  name: string;
  priceInCents: number;
  art: ReactNode;
  tile: string;
  shineDelay: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          'relative flex h-16.5 items-center justify-center overflow-hidden rounded-md',
          tile,
        )}
      >
        {art}
        <div className={cn('absolute inset-y-0 left-0 w-2/5', styles.shine, shineDelay)} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs leading-[1.2] font-bold">{name}</span>
        <span className="text-label leading-[1.2] font-semibold text-[var(--auth-scene-ink-dim)]">
          {formatKwanza(priceInCents)}
        </span>
      </div>
    </div>
  );
}

function StoreHeader() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="text-lead flex size-8.5 items-center justify-center rounded-sm bg-[var(--auth-scene-ink)] font-extrabold text-[var(--lima)]">
        {store.initial}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-body leading-[1.2] font-extrabold">{store.name}</span>
        <span className="text-xs leading-[1.2] font-medium text-[var(--auth-scene-ink-dim)]">
          {store.address}
        </span>
      </div>
      <span className="text-label inline-flex items-center gap-1.25 rounded-full bg-[var(--auth-scene-open-bg)] px-2 py-1 leading-none font-bold text-[var(--auth-scene-open-fg)]">
        <span
          className={cn('size-1.5 rounded-full bg-[var(--auth-scene-open-dot)]', styles.openDot)}
        />
        {store.open}
      </span>
    </div>
  );
}

export function SceneStoreCard() {
  return (
    <div className="absolute top-8.75 left-48.75 w-60 -rotate-3">
      <div className={styles.floatStore}>
        <div
          className={cn(
            'relative flex flex-col gap-3 rounded-[22px] bg-[var(--auth-scene-paper)] p-3.5 text-[var(--auth-scene-ink)]',
            styles.storeCard,
          )}
        >
          <div
            className={cn(
              'absolute -top-3.5 -right-3.5 flex items-center gap-1.5 rounded-full bg-[var(--auth-scene-peach)] px-2.75 py-1.75 text-xs leading-none font-extrabold text-[var(--auth-scene-peach-ink)]',
              styles.newOrder,
            )}
          >
            <OrderBag className="size-3" strokeWidth={2.4} />
            {store.newOrder}
          </div>

          <StoreHeader />

          <div className="grid grid-cols-2 gap-2.5">
            {PRODUCTS.map(({ product, art, tile, shineDelay }) => (
              <ProductTile
                key={product.name}
                name={product.name}
                priceInCents={product.priceInCents}
                art={art}
                tile={tile}
                shineDelay={shineDelay}
              />
            ))}
          </div>

          <div className="text-fine flex h-10 items-center justify-center gap-2 rounded-md bg-[var(--auth-scene-ink)] font-bold text-[var(--auth-panel-txt)]">
            <WhatsApp className="size-3.75 text-[var(--lima)]" strokeWidth={2} />
            {store.orderOnWhatsApp}
          </div>
        </div>
      </div>
    </div>
  );
}
