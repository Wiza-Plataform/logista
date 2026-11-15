'use client';

import { cn } from '@/shared/lib/utils';

import { useEditor } from '../editor-context';
import type { PreviewDevice } from '../editor-context';
import type { EditorIcon } from '../editor-icons';

export function DeviceButton({
  device,
  label,
  icon: Icon,
}: {
  readonly device: PreviewDevice;
  readonly label: string;
  readonly icon: EditorIcon;
}) {
  const { device: current, setDevice } = useEditor();
  const isActive = current === device;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isActive}
      onClick={() => {
        setDevice(device);
      }}
      className={cn(
        'flex h-8 w-10 items-center justify-center rounded-[7px] focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none max-[899px]:h-11 max-[899px]:w-11',
        isActive
          ? 'bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.16)]'
          : 'text-muted-foreground',
      )}
    >
      <Icon className="size-[17px]" strokeWidth={1.9} />
    </button>
  );
}
