const CENTS_PER_KWANZA = 100;
const CENT_DIGITS = 2;
const WHITESPACE = /\s/g;
const THOUSANDS_DOTS = /\./g;
const AMOUNT_PATTERN = /^\d+(,\d{1,2})?$/;
const QUANTITY_PATTERN = /^\d+([.,]\d{1,3})?$/;

function compact(raw: string): string {
  return raw.replace(WHITESPACE, '');
}

export function parseKwanzaToCents(raw: string): number | null {
  const value = compact(raw).replace(THOUSANDS_DOTS, '');
  if (!AMOUNT_PATTERN.test(value)) return null;

  const [kwanzas = '0', cents = ''] = value.split(',');
  return Number(kwanzas) * CENTS_PER_KWANZA + Number(cents.padEnd(CENT_DIGITS, '0'));
}

export function parseQuantity(raw: string): number | null {
  const value = compact(raw);
  if (!QUANTITY_PATTERN.test(value)) return null;
  return Number(value.replace(',', '.'));
}
