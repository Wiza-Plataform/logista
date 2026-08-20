import { strings } from '@/shared/i18n/strings';

export default function Page() {
  return (
    <main className="flex flex-col gap-2">
      <h1 className="text-h1 font-semibold">{strings.summary.title}</h1>
      <p className="text-muted-foreground">{strings.summary.subtitle}</p>
    </main>
  );
}
