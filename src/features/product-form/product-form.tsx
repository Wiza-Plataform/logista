'use client';

import { useReducer } from 'react';

import type { ProductDetails } from '@/shared/contracts/catalog/product';
import { generalErrorOf } from '@/shared/forms/form-failure';
import { AlertMessage } from '@/shared/ui/field';

import { BasicsSection } from './basics-section';
import { combinationsOf, defaultUnitOf, initialDraft, retiredStockOf } from './draft';
import { draftReducer } from './draft-reducer';
import type { FormChoices } from './form-choices';
import { FormFooter, FormHeader } from './form-chrome';
import { OrganizationSection } from './organization-section';
import { QueuedPhotosSection, SavedPhotosSection } from './photos-section';
import { PricingSection } from './pricing-section';
import { usePhotoQueue } from './use-photo-queue';
import { useProductSubmission } from './use-product-submission';
import { VariationsSection } from './variations-section';

const FIELD_NAMES = [
  'name',
  'description',
  'slug',
  'unitUlid',
  'categoryUlids',
  'options',
  'variants',
  'price',
  'promotionalPrice',
  'stock',
] as const;

interface ProductFormProps {
  readonly product: ProductDetails | null;
  readonly choices: FormChoices;
}

export function ProductForm({ product, choices }: ProductFormProps) {
  const [draft, dispatch] = useReducer(draftReducer, null, () =>
    initialDraft(product, defaultUnitOf(choices.units)),
  );
  const queue = usePhotoQueue();
  const { submit, isPending, failure } = useProductSubmission(product, draft, queue);
  const combinations = combinationsOf(draft.options);
  const retiredStock = retiredStockOf(draft, combinations);
  const unit = choices.units.find((candidate) => candidate.unitUlid === draft.unitUlid) ?? null;
  const generalError = generalErrorOf(failure, FIELD_NAMES);

  return (
    <div className="flex flex-col">
      <FormHeader product={product} />
      {generalError === null ? null : <AlertMessage text={generalError} />}
      <div className="grid grid-cols-[1.55fr_1fr] items-start gap-4 max-[1000px]:grid-cols-1">
        <div className="flex min-w-0 flex-col gap-3.5">
          <BasicsSection
            draft={draft}
            dispatch={dispatch}
            failure={failure}
            storeAddress={choices.storeAddress}
          />
          {product === null ? (
            <QueuedPhotosSection queue={queue} isBusy={isPending} />
          ) : (
            <SavedPhotosSection product={product} />
          )}
          <VariationsSection
            draft={draft}
            dispatch={dispatch}
            failure={failure}
            combinations={combinations}
            unitSymbol={unit?.symbol ?? ''}
            retiredStock={retiredStock}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-3.5">
          <PricingSection
            draft={draft}
            dispatch={dispatch}
            failure={failure}
            unit={unit}
            hasCombinations={combinations.length > 0}
            stockSearch={product?.name ?? null}
          />
          <OrganizationSection
            draft={draft}
            dispatch={dispatch}
            failure={failure}
            choices={choices}
          />
        </div>
      </div>
      <FormFooter status={product?.status ?? null} isPending={isPending} onIntent={submit} />
    </div>
  );
}
