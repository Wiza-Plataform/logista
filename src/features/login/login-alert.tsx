import { AlertCircle } from '@/shared/ui/icons';

export function LoginAlert({ text }: { text: string }) {
  return (
    <p
      role="alert"
      className="text-fine mb-3.75 flex items-center gap-1.75 rounded-[9px] bg-[var(--st-cancel-bg)] px-2.75 py-2.25 leading-[1.4] text-[var(--st-cancel-fg)]"
    >
      <AlertCircle className="size-3.75 shrink-0" strokeWidth={2} />
      {text}
    </p>
  );
}
