import Image from 'next/image';

import { cn } from '@/shared/lib/utils';

const ON_DARK_SRC = '/brand/wiza-symbol-on-dark.svg';
const ON_LIGHT_SRC = '/brand/wiza-symbol-on-light.svg';

export type BrandSymbolTone = 'theme' | 'on-dark';

export function BrandSymbol({
  tone = 'theme',
  className,
}: {
  tone?: BrandSymbolTone;
  className: string;
}) {
  const onDark = (
    <Image
      src={ON_DARK_SRC}
      alt=""
      width={206}
      height={218}
      loading="eager"
      className={cn('shrink-0 object-contain', tone === 'theme' && 'hidden dark:block', className)}
    />
  );

  if (tone === 'on-dark') return onDark;

  return (
    <>
      <Image
        src={ON_LIGHT_SRC}
        alt=""
        width={206}
        height={222}
        loading="eager"
        className={cn('shrink-0 object-contain dark:hidden', className)}
      />
      {onDark}
    </>
  );
}
