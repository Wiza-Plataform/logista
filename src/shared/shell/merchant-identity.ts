function nameParts(fullName: string): readonly string[] {
  return fullName
    .trim()
    .split(/\s+/u)
    .filter((part) => part.length > 0);
}

function firstAndLast(fullName: string): readonly string[] {
  const parts = nameParts(fullName);
  if (parts.length <= 1) return parts;
  return [parts[0] ?? '', parts[parts.length - 1] ?? ''];
}

export function shortName(fullName: string): string {
  return firstAndLast(fullName).join(' ');
}

export function initials(fullName: string): string {
  return firstAndLast(fullName)
    .map((part) => part.charAt(0))
    .join('')
    .toLocaleUpperCase('pt-AO');
}
