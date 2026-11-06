'use client';

import { useState } from 'react';

import type {
  StockItem,
  StockProduct,
  StockProductVariant,
} from '@/shared/contracts/catalog/stock';

import { MovementDrawer } from './movement-drawer';
import { stockItemOf } from './stock-labels';
import { StockCards, StockTable } from './stock-rows';
import { VariantPicker } from './variant-picker';

interface PickerState {
  readonly product: StockProduct | null;
  readonly isOpen: boolean;
}

interface DrawerState {
  readonly item: StockItem | null;
  readonly isOpen: boolean;
  readonly session: number;
}

function freshProduct(
  products: readonly StockProduct[],
  product: StockProduct | null,
): StockProduct | null {
  if (product === null) return null;
  return products.find((candidate) => candidate.productUlid === product.productUlid) ?? product;
}

function freshItem(products: readonly StockProduct[], item: StockItem | null): StockItem | null {
  if (item === null) return null;
  const product = products.find((candidate) => candidate.productUlid === item.productUlid);
  const variant = product?.variants.find((candidate) => candidate.variantUlid === item.variantUlid);
  return product === undefined || variant === undefined ? item : stockItemOf(product, variant);
}

export function StockItems({ products }: { readonly products: readonly StockProduct[] }) {
  const [picker, setPicker] = useState<PickerState>({ product: null, isOpen: false });
  const [drawer, setDrawer] = useState<DrawerState>({ item: null, isOpen: false, session: 0 });
  const pickerProduct = freshProduct(products, picker.product);
  const selected = freshItem(products, drawer.item);

  function openDrawer(product: StockProduct, variant: StockProductVariant) {
    const item = stockItemOf(product, variant);
    setDrawer((current) => ({ item, isOpen: true, session: current.session + 1 }));
  }

  function move(product: StockProduct) {
    const [only, ...others] = product.variants;
    if (only !== undefined && others.length === 0) {
      openDrawer(product, only);
      return;
    }
    setPicker({ product, isOpen: true });
  }

  function pick(variant: StockProductVariant) {
    setPicker((current) => ({ ...current, isOpen: false }));
    if (pickerProduct !== null) openDrawer(pickerProduct, variant);
  }

  return (
    <>
      <StockTable products={products} onMove={move} />
      <StockCards products={products} onMove={move} />
      {pickerProduct === null ? null : (
        <VariantPicker
          product={pickerProduct}
          isOpen={picker.isOpen}
          onClose={() => {
            setPicker((current) => ({ ...current, isOpen: false }));
          }}
          onPick={pick}
        />
      )}
      {selected === null ? null : (
        <MovementDrawer
          key={drawer.session}
          item={selected}
          isOpen={drawer.isOpen}
          onClose={() => {
            setDrawer((current) => ({ ...current, isOpen: false }));
          }}
        />
      )}
    </>
  );
}
