import * as z from 'zod';

export const ULID_PATTERN = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/;

export const ulidSchema = z.string().regex(ULID_PATTERN);
