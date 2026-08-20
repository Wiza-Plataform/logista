export type Theme = 'dark' | 'light';

export const THEME_COOKIE = 'wiza-theme';
export const THEME_MAX_AGE = 60 * 60 * 24 * 365;

export function themeFromCookie(value: string | undefined): Theme {
  return value === 'light' ? 'light' : 'dark';
}
