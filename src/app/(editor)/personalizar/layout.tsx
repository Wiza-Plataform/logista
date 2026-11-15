import { Bricolage_Grotesque, Fraunces, Manrope, Space_Grotesk } from 'next/font/google';

import { ToastProvider } from '@/shared/feedback/toaster';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export default function StoreEditorLayout({ children }: { children: React.ReactNode }) {
  const fonts = `${bricolage.variable} ${fraunces.variable} ${manrope.variable} ${spaceGrotesk.variable}`;

  return (
    <ToastProvider>
      <div className={fonts}>{children}</div>
    </ToastProvider>
  );
}
