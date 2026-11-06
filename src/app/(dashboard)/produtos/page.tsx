import type { Metadata } from 'next';
import Link from 'next/link';

import { fetchProductOverview, fetchProductPage } from '@/features/products/api';
import { apiQueryOf, listingFrom } from '@/features/products/listing';
import { ProductStats } from '@/features/products/product-stats';
import { ProductsPanel } from '@/features/products/products-panel';
import { PageHead } from '@/shared/blocks/page-head';
import { formatCount } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';
import { cn } from '@/shared/lib/utils';
import { requireStoreUlid } from '@/shared/session/guards';
import { buttonVariants } from '@/shared/ui/button';
import { Plus } from '@/shared/ui/icons';

const text = strings.products;

export const metadata: Metadata = { title: text.pageTitle };

interface ProductsPageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const storeUlid = await requireStoreUlid();
  const listing = listingFrom(await searchParams);
  const [overview, page] = await Promise.all([
    fetchProductOverview(storeUlid),
    fetchProductPage(storeUlid, apiQueryOf(listing)),
  ]);

  return (
    <>
      <PageHead
        title={text.title}
        subtitle={
          <>
            <b>{formatCount(overview.total)}</b> {text.subtitleProducts} ·{' '}
            <b>{formatCount(overview.published)}</b> {text.subtitlePublished}
          </>
        }
        actions={
          <Link
            href="/produtos/novo"
            className={cn(buttonVariants({ variant: 'brand', size: 'action' }))}
          >
            <Plus className="size-[15px]" strokeWidth={1.9} />
            {text.create}
          </Link>
        }
      />
      <ProductStats overview={overview} />
      <ProductsPanel listing={listing} overview={overview} page={page} />
    </>
  );
}
