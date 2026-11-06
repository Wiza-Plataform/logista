import { cn } from '@/shared/lib/utils';

const SIZE_CLASS = {
  sm: 'size-[30px] rounded-[8px] text-sm',
  lg: 'size-[38px] rounded-[10px] text-note',
} as const;

interface UserAvatarProps {
  readonly initials: string;
  readonly size: keyof typeof SIZE_CLASS;
}

export function UserAvatar({ initials, size }: UserAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'bg-destructive text-destructive-foreground grid shrink-0 place-items-center font-bold',
        SIZE_CLASS[size],
      )}
    >
      {initials}
    </span>
  );
}
