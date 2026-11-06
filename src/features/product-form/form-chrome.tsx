import Link from 'next/link';

import { StatusBadge } from '@/shared/blocks/status-badge';
import type { StatusTone } from '@/shared/blocks/status-badge';
import type { ProductDetails, ProductStatus } from '@/shared/contracts/catalog/product';
import { strings } from '@/shared/i18n/strings';
import { Button } from '@/shared/ui/button';
import { ArrowLeft } from '@/shared/ui/icons';

import { footerIntentsFor, labelOf } from './form-intent';
import type { FormIntent } from './form-intent';

const text = strings.productForm;

function statusOf(status: ProductStatus): { readonly tone: StatusTone; readonly label: string } {
  switch (status) {
    case 'DRAFT':
      return { tone: 'done', label: text.status.draft };
    case 'PUBLISHED':
      return { tone: 'paid', label: text.status.published };
    case 'ARCHIVED':
      return { tone: 'cancel', label: text.status.archived };
  }
}

export function FormHeader({ product }: { readonly product: ProductDetails | null }) {
  const status = product === null ? null : statusOf(product.status);

  return (
    <header className="mb-5">
      <Link
        href="/produtos"
        className="text-note text-muted-foreground hover:text-foreground mb-2 inline-flex items-center gap-2"
      >
        <ArrowLeft className="size-[15px]" strokeWidth={2} />
        {text.back}
      </Link>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-h1 leading-[1.05] font-bold tracking-[-0.4px] max-[560px]:text-[22px]">
          {product === null ? text.titleNew : product.name}
        </h1>
        {status === null ? null : <StatusBadge tone={status.tone}>{status.label}</StatusBadge>}
      </div>
    </header>
  );
}

interface FormFooterProps {
  readonly status: ProductStatus | null;
  readonly isPending: boolean;
  readonly onIntent: (intent: FormIntent) => void;
}

export function FormFooter({ status, isPending, onIntent }: FormFooterProps) {
  const { secondary, primary, hint } = footerIntentsFor(status);

  return (
    <div className="bg-card border-border sticky bottom-0 z-10 -mx-[26px] mt-5 -mb-[50px] flex flex-wrap items-center justify-end gap-[9px] border-t px-[26px] py-3.5 max-[860px]:-mx-4 max-[860px]:-mb-9 max-[860px]:px-4">
      <span className="text-fine mr-auto text-(--txt-faint) max-[560px]:w-full">{hint}</span>
      {secondary === null ? null : (
        <Button
          type="button"
          variant="brand-outline"
          size="action"
          disabled={isPending}
          onClick={() => {
            onIntent(secondary);
          }}
        >
          {labelOf(secondary)}
        </Button>
      )}
      <Button
        type="button"
        variant="brand"
        size="action"
        disabled={isPending}
        onClick={() => {
          onIntent(primary);
        }}
      >
        {isPending ? text.saving : labelOf(primary)}
      </Button>
    </div>
  );
}
