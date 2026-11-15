import type { ThemeAddress, ThemeDraft } from '@/shared/contracts/store-theme';
import { isCompletePhoneAO, toLocalPhoneAO } from '@/shared/i18n/format';
import { strings } from '@/shared/i18n/strings';

export type FieldMessages = Readonly<Record<string, string>>;

export function errorFor(errors: FieldMessages, field: string): string | undefined {
  return Object.entries(errors).find(([key]) => key === field)?.[1];
}

const t = strings.storeEditor.errors;

const LIMITS = {
  announcement: 120,
  bannerTitle: 80,
  bannerButton: 30,
  productsTitle: 60,
  whatsappLabel: 24,
  tagline: 160,
  street: 120,
  neighborhood: 80,
  municipality: 80,
  referencePoint: 160,
} as const;

const STORE_NAME_MIN = 2;
const STORE_NAME_MAX = 120;
const INSTAGRAM_HANDLE = /^[a-z0-9._]{1,30}$/;

function tooLong(limit: number): string {
  return `${t.tooLongStart}${String(limit)}${t.tooLongEnd}`;
}

function requiredIssue(value: string, limit: number): string | null {
  const trimmed = value.trim();
  if (trimmed === '') return t.required;
  return Array.from(trimmed).length > limit ? tooLong(limit) : null;
}

function optionalIssue(value: string | null, limit: number): string | null {
  return value !== null && Array.from(value.trim()).length > limit ? tooLong(limit) : null;
}

function storeNameIssue(value: string): string | null {
  const length = Array.from(value.trim()).length;
  return length < STORE_NAME_MIN || length > STORE_NAME_MAX ? t.storeName : null;
}

function phoneIssue(value: string | null): string | null {
  if (value === null || value.trim() === '') return null;
  return isCompletePhoneAO(value) && toLocalPhoneAO(value).startsWith('9') ? null : t.phone;
}

function instagramIssue(value: string | null): string | null {
  if (value === null || value.trim() === '') return null;
  const handle = value.trim().replace(/^@/, '').toLowerCase();
  const isValid =
    INSTAGRAM_HANDLE.test(handle) &&
    !handle.startsWith('.') &&
    !handle.endsWith('.') &&
    !handle.includes('..');
  return isValid ? null : t.instagram;
}

function addressIssues(address: ThemeAddress | null): readonly [string, string | null][] {
  if (address === null || Object.values(address).every((value) => value.trim() === '')) return [];
  return [
    ['identity.address.street', requiredIssue(address.street, LIMITS.street)],
    ['identity.address.neighborhood', requiredIssue(address.neighborhood, LIMITS.neighborhood)],
    ['identity.address.municipality', requiredIssue(address.municipality, LIMITS.municipality)],
    ['identity.address.provinceUlid', address.provinceUlid === '' ? t.required : null],
    [
      'identity.address.referencePoint',
      requiredIssue(address.referencePoint, LIMITS.referencePoint),
    ],
  ];
}

export function validateDraft(draft: ThemeDraft): FieldMessages {
  const { identity, sections } = draft;
  const issues: readonly (readonly [string, string | null])[] = [
    ['identity.storeName', storeNameIssue(identity.storeName)],
    ['identity.tagline', optionalIssue(identity.tagline, LIMITS.tagline)],
    ['identity.whatsapp', phoneIssue(identity.whatsapp)],
    ['identity.instagram', instagramIssue(identity.instagram)],
    ...addressIssues(identity.address),
    [
      'sections.announcement.message',
      requiredIssue(sections.announcement.message, LIMITS.announcement),
    ],
    ['sections.banner.title', requiredIssue(sections.banner.title, LIMITS.bannerTitle)],
    [
      'sections.banner.buttonLabel',
      requiredIssue(sections.banner.buttonLabel, LIMITS.bannerButton),
    ],
    ['sections.products.title', requiredIssue(sections.products.title, LIMITS.productsTitle)],
    [
      'sections.whatsappButton.label',
      requiredIssue(sections.whatsappButton.label, LIMITS.whatsappLabel),
    ],
  ];

  return Object.fromEntries(issues.filter(([, message]) => message !== null)) as FieldMessages;
}
