import type { Metadata } from 'next';

import { fetchCatalogOverview, fetchCategoryTree } from '@/features/categories/api';
import { CategoriesScreen } from '@/features/categories/categories-screen';
import { strings } from '@/shared/i18n/strings';
import { requireStoreUlid } from '@/shared/session/guards';

export const metadata: Metadata = { title: strings.categories.pageTitle };

export default async function CategoriesPage() {
  const storeUlid = await requireStoreUlid();
  const [tree, overview] = await Promise.all([
    fetchCategoryTree(storeUlid),
    fetchCatalogOverview(storeUlid),
  ]);

  return <CategoriesScreen tree={tree} overview={overview} />;
}
