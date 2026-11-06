import * as z from 'zod';

import { ulidSchema } from './ulid.ts';

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 128;

export const registerMerchantAccountSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.email().max(160),
  phone: z.string().min(9).max(20),
  password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
});

export type RegisterMerchantAccountRequest = z.infer<typeof registerMerchantAccountSchema>;

export const signInSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(1).max(512),
});

export type SignInRequest = z.infer<typeof signInSchema>;

export const merchantAccountSchema = z.object({
  merchantAccountUlid: ulidSchema,
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  createdAt: z.string(),
});

export const issuedSessionSchema = z.object({
  token: z.string().min(1),
  expiresAt: z.string(),
});

export type IssuedSession = z.infer<typeof issuedSessionSchema>;

export const accountSessionSchema = z.object({
  account: merchantAccountSchema,
  session: issuedSessionSchema,
});

export type AccountSession = z.infer<typeof accountSessionSchema>;

export const storeMembershipSchema = z.object({
  storeUlid: ulidSchema,
  subdomain: z.string(),
  role: z.enum(['OWNER']),
});

export const currentMerchantSchema = z.object({
  account: merchantAccountSchema,
  stores: z.array(storeMembershipSchema),
});

export type CurrentMerchant = z.infer<typeof currentMerchantSchema>;
