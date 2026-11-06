import type { Metadata } from 'next';

import { fetchFormChoices } from '@/features/product-form/api';
import { ProductForm } from '@/features/product-form/product-form';
import { strings } from '@/shared/i18n/strings';
import { requireStoreUlid } from '@/shared/session/guards';

export const metadata: Metadata = { title: strings.productForm.pageTitleNew };

export default async function NewProductPage() {
  const storeUlid = await requireStoreUlid();
  const choices = await fetchFormChoices(storeUlid);

  return <ProductForm product={null} choices={choices} />;
}
