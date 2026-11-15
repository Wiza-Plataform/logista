import type { Metadata } from 'next';

import { fetchEditorData } from '@/features/store-editor/api';
import { StoreEditor } from '@/features/store-editor/store-editor';
import { strings } from '@/shared/i18n/strings';
import { requireStoreUlid } from '@/shared/session/guards';

export const metadata: Metadata = { title: strings.storeEditor.pageTitle };

export default async function CustomizeStorePage() {
  const storeUlid = await requireStoreUlid();
  const data = await fetchEditorData(storeUlid);

  return <StoreEditor data={data} />;
}
