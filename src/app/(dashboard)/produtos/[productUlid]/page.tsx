import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fetchFormChoices, fetchProductDetails } from '@/features/product-form/api';
import { ProductForm } from '@/features/product-form/product-form';
import { strings } from '@/shared/i18n/strings';
import { requireStoreUlid } from '@/shared/session/guards';

export const metadata: Metadata = { title: strings.productForm.pageTitleEdit };

interface EditProductPageProps {
  readonly params: Promise<{ readonly productUlid: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { productUlid } = await params;
  const storeUlid = await requireStoreUlid();
  const [product, choices] = await Promise.all([
    fetchProductDetails(storeUlid, productUlid),
    fetchFormChoices(storeUlid),
  ]);
  if (product === null) notFound();

  return <ProductForm key={product.productUlid} product={product} choices={choices} />;
}
