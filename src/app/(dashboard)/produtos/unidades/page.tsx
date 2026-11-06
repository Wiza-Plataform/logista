import type { Metadata } from 'next';

import { fetchUnits } from '@/features/units/api';
import { UnitsScreen } from '@/features/units/units-screen';
import { strings } from '@/shared/i18n/strings';
import { requireStoreUlid } from '@/shared/session/guards';

export const metadata: Metadata = { title: strings.units.pageTitle };

export default async function UnitsPage() {
  const storeUlid = await requireStoreUlid();
  const units = await fetchUnits(storeUlid);

  return <UnitsScreen units={units} />;
}
