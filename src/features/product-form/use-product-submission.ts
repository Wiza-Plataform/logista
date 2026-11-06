'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import type { ProductDetails } from '@/shared/contracts/catalog/product';
import { useToast } from '@/shared/feedback/toaster';
import type { FormFailure } from '@/shared/forms/form-failure';
import { strings } from '@/shared/i18n/strings';

import {
  changeProductLifecycleAction,
  saveProductAction,
  uploadProductImageAction,
} from './actions';
import { buildProduct } from './build-product';
import type { ProductDraft } from './draft';
import { confirmationOf, transitionOf } from './form-intent';
import type { FormIntent } from './form-intent';
import { photoFormOf } from './photo-rules';
import type { PhotoQueue } from './use-photo-queue';

const text = strings.productForm;

export function useProductSubmission(
  product: ProductDetails | null,
  draft: ProductDraft,
  queue: PhotoQueue,
) {
  const router = useRouter();
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const [failure, setFailure] = useState<FormFailure | null>(null);

  function reject(problem: FormFailure) {
    setFailure(problem);
    toast(problem.message, 'error');
  }

  async function uploadQueuedPhotos(productUlid: string): Promise<string | null> {
    if (product !== null) return null;
    for (const photo of queue.photos) {
      const result = await uploadProductImageAction(productUlid, photoFormOf(photo.file));
      if (result.status === 'failed') return result.message;
    }
    return null;
  }

  async function applyTransition(productUlid: string, intent: FormIntent): Promise<string | null> {
    const transition = transitionOf(intent);
    if (transition === null) return null;
    const result = await changeProductLifecycleAction(productUlid, transition);
    return result.status === 'failed' ? result.message : null;
  }

  async function followUp(
    productUlid: string,
    stockIssue: string | null,
    intent: FormIntent,
  ): Promise<string | null> {
    if (stockIssue !== null) return stockIssue;
    const photoIssue = await uploadQueuedPhotos(productUlid);
    if (photoIssue !== null) return photoIssue;
    return applyTransition(productUlid, intent);
  }

  async function save(intent: FormIntent) {
    const built = buildProduct(draft);
    if (!built.isValid) {
      reject(built.problem);
      return;
    }

    const saved = await saveProductAction({
      productUlid: product?.productUlid ?? null,
      product: built.product.request,
      initialStock: built.product.initialStock,
    });
    if (saved.status === 'failed') {
      reject(saved);
      return;
    }

    setFailure(null);
    const issue = await followUp(saved.productUlid, saved.stockIssue, intent);
    if (issue !== null) {
      toast(`${text.savedWithIssue} ${issue}`, 'error');
      router.push(`/produtos/${saved.productUlid}`);
      return;
    }
    toast(confirmationOf(intent));
    router.push('/produtos');
  }

  async function restore(productUlid: string) {
    const result = await changeProductLifecycleAction(productUlid, 'restore');
    if (result.status === 'failed') {
      toast(result.message, 'error');
      return;
    }
    toast(confirmationOf('restore'));
    router.refresh();
  }

  function submit(intent: FormIntent) {
    startTransition(async () => {
      if (intent === 'restore' && product !== null) await restore(product.productUlid);
      else await save(intent);
    });
  }

  return { submit, isPending, failure };
}
