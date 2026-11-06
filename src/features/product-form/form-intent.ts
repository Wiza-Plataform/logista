import type { ProductStatus } from '@/shared/contracts/catalog/product';
import { strings } from '@/shared/i18n/strings';

import type { LifecycleTransition } from './product-action-result';

const text = strings.productForm;

export type FormIntent = 'draft' | 'publish' | 'save' | 'unpublish' | 'restore';

export interface FooterIntents {
  readonly secondary: FormIntent | null;
  readonly primary: FormIntent;
  readonly hint: string;
}

export function footerIntentsFor(status: ProductStatus | null): FooterIntents {
  switch (status) {
    case null:
      return { secondary: 'draft', primary: 'publish', hint: text.hintNew };
    case 'DRAFT':
      return { secondary: 'draft', primary: 'publish', hint: text.hintDraft };
    case 'PUBLISHED':
      return { secondary: 'unpublish', primary: 'save', hint: text.hintPublished };
    case 'ARCHIVED':
      return { secondary: null, primary: 'restore', hint: text.hintArchived };
  }
}

export function labelOf(intent: FormIntent): string {
  switch (intent) {
    case 'draft':
      return text.saveDraft;
    case 'publish':
      return text.publish;
    case 'save':
      return text.saveChanges;
    case 'unpublish':
      return text.unpublish;
    case 'restore':
      return text.restore;
  }
}

export function confirmationOf(intent: FormIntent): string {
  switch (intent) {
    case 'draft':
      return text.draftSaved;
    case 'publish':
      return text.published;
    case 'save':
      return text.changesSaved;
    case 'unpublish':
      return text.unpublished;
    case 'restore':
      return text.restored;
  }
}

export function transitionOf(intent: FormIntent): LifecycleTransition | null {
  switch (intent) {
    case 'publish':
    case 'unpublish':
    case 'restore':
      return intent;
    case 'draft':
    case 'save':
      return null;
  }
}
