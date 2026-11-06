import { strings } from '@/shared/i18n/strings';
import { requireMerchantWithStore } from '@/shared/session/guards';

export default async function Page() {
  await requireMerchantWithStore();

  return (
    <main className="flex flex-col gap-2">
      <h1 className="text-h1 font-semibold">{strings.summary.title}</h1>
      <p className="text-muted-foreground">{strings.summary.subtitle}</p>
    </main>
  );
}
