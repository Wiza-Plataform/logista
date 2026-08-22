export const MAX_SUBDOMAIN_LENGTH = 24;
export const MIN_SUBDOMAIN_LENGTH = 3;

const COMBINING_MARKS = /[̀-ͯ]/g;

export function deriveSubdomain(tradeName: string): string {
  return tradeName
    .toLowerCase()
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_SUBDOMAIN_LENGTH)
    .replace(/-+$/g, '');
}
