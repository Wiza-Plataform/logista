export const KWANZA_SYMBOL = 'Kz';
const ANGOLA_COUNTRY_CODE = '244';
const LOCAL_PHONE_LENGTH = 9;
const CENTS_PER_KWANZA = 100;
const THOUSANDTHS_PER_UNIT = 1000;
const ONE_MILLION = 1_000_000;
const MILLION_SUFFIX = 'M';
const TRAILING_ZEROS = /0+$/;

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function groupThousands(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const DATE_TIME = new Intl.DateTimeFormat('pt-AO', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Africa/Luanda',
});

export function formatDateTime(isoTimestamp: string): string {
  return DATE_TIME.format(new Date(isoTimestamp));
}

export function formatCount(value: number): string {
  return groupThousands(Math.trunc(value));
}

export function formatKwanzaAmount(amountInCents: number): string {
  const sign = amountInCents < 0 ? '-' : '';
  const absolute = Math.abs(Math.trunc(amountInCents));
  const kwanzas = groupThousands(Math.trunc(absolute / CENTS_PER_KWANZA));
  const cents = absolute % CENTS_PER_KWANZA;
  const decimals = cents === 0 ? '' : `,${String(cents).padStart(2, '0')}`;

  return `${sign}${kwanzas}${decimals}`;
}

export function formatKwanza(amountInCents: number): string {
  return `${formatKwanzaAmount(amountInCents)} ${KWANZA_SYMBOL}`;
}

export function formatCompactKwanzaAmount(amountInCents: number): string {
  const kwanzas = Math.trunc(amountInCents / CENTS_PER_KWANZA);
  if (Math.abs(kwanzas) < ONE_MILLION) return groupThousands(kwanzas);

  const hundredthsOfMillion = Math.trunc(kwanzas / (ONE_MILLION / 100));
  const whole = Math.trunc(hundredthsOfMillion / 100);
  const fraction = String(Math.abs(hundredthsOfMillion % 100))
    .padStart(2, '0')
    .replace(TRAILING_ZEROS, '');
  return `${groupThousands(whole)}${fraction === '' ? '' : `,${fraction}`}${MILLION_SUFFIX}`;
}

export function formatQuantity(value: number): string {
  const sign = value < 0 ? '-' : '';
  const thousandths = Math.round(Math.abs(value) * THOUSANDTHS_PER_UNIT);
  const whole = groupThousands(Math.trunc(thousandths / THOUSANDTHS_PER_UNIT));
  const fraction = String(thousandths % THOUSANDTHS_PER_UNIT)
    .padStart(3, '0')
    .replace(TRAILING_ZEROS, '');

  return `${sign}${whole}${fraction === '' ? '' : `,${fraction}`}`;
}

export function toLocalPhoneAO(value: string): string {
  const digits = onlyDigits(value);
  const withoutCode = digits.startsWith(ANGOLA_COUNTRY_CODE)
    ? digits.slice(ANGOLA_COUNTRY_CODE.length)
    : digits;

  return withoutCode.slice(0, LOCAL_PHONE_LENGTH);
}

export function formatPhoneAO(value: string): string {
  const local = toLocalPhoneAO(value);
  if (local.length === 0) return `+${ANGOLA_COUNTRY_CODE}`;

  return `+${ANGOLA_COUNTRY_CODE} ${(local.match(/\d{1,3}/g) ?? []).join(' ')}`;
}

export function isCompletePhoneAO(value: string): boolean {
  return toLocalPhoneAO(value).length === LOCAL_PHONE_LENGTH;
}

export function maskLocalPhoneAO(value: string): string {
  const local = toLocalPhoneAO(value);
  return (local.match(/\d{1,3}/g) ?? []).join(' ');
}
