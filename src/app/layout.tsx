import type { Metadata } from 'next';
import { Saira, Sansita } from 'next/font/google';
import { cookies } from 'next/headers';

import { strings } from '@/shared/i18n/strings';
import { THEME_COOKIE, type Theme, themeFromCookie } from '@/shared/shell/theme';
import '@/styles/globals.css';

const saira = Saira({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-saira',
  display: 'swap',
});

const sansita = Sansita({
  subsets: ['latin'],
  weight: '800',
  variable: '--font-sansita',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${strings.app.name} — ${strings.app.dashboard}`,
  description: strings.app.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const theme: Theme = themeFromCookie(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <html lang="pt-AO" data-theme={theme} className={`${saira.variable} ${sansita.variable}`}>
      <body>{children}</body>
    </html>
  );
}
