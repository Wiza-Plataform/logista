const KWANZA_SUFFIX = 'Kz';
const ANGOLA_COUNTRY_CODE = '244';
const LOCAL_PHONE_LENGTH = 9;

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function groupThousands(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatKwanza(amountInCents: number): string {
  const sign = amountInCents < 0 ? '-' : '';
  const absolute = Math.abs(Math.trunc(amountInCents));
  const kwanzas = groupThousands(Math.trunc(absolute / 100));
  const cents = absolute % 100;
  const decimals = cents === 0 ? '' : `,${String(cents).padStart(2, '0')}`;

  return `${sign}${kwanzas}${decimals} ${KWANZA_SUFFIX}`;
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

export function maskDigits(value: string, maxLength: number): string {
  return onlyDigits(value).slice(0, maxLength);
}
