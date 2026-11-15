'use client';

import { strings } from '@/shared/i18n/strings';
import { Button } from '@/shared/ui/button';

interface SegmentErrorProps {
  readonly error: Error & { digest?: string };
  readonly retry: () => void;
}

export default function CustomizeStoreError({ retry }: SegmentErrorProps) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-body m-0 text-(--txt-dim)">{strings.storeEditor.loadError}</p>
      <Button variant="brand" size="form" onClick={retry}>
        {strings.storeEditor.retry}
      </Button>
    </div>
  );
}
