'use client';

import { NoResults, Panel } from '@/shared/blocks/panel';
import { strings } from '@/shared/i18n/strings';
import { Button } from '@/shared/ui/button';

interface SegmentErrorProps {
  readonly error: Error & { digest?: string };
  readonly retry: () => void;
}

export default function ProductsError({ retry }: SegmentErrorProps) {
  return (
    <Panel>
      <NoResults>
        <p className="mb-4">{strings.segmentError.title}</p>
        <Button
          variant="brand"
          size="form"
          onClick={() => {
            retry();
          }}
        >
          {strings.segmentError.retry}
        </Button>
      </NoResults>
    </Panel>
  );
}
