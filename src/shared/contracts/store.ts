import * as z from 'zod';

import { ulidSchema } from './ulid.ts';

export const createStoreSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(500).optional(),
  primaryColor: z.string().length(7).optional(),
});

export type CreateStoreRequest = z.infer<typeof createStoreSchema>;

export const storeSchema = z.object({
  storeUlid: ulidSchema,
  name: z.string(),
  subdomain: z.string(),
  description: z.string().nullable(),
  primaryColor: z.string().nullable(),
  createdAt: z.string(),
});

export type Store = z.infer<typeof storeSchema>;

export const subdomainAvailabilitySchema = z.object({
  subdomain: z.string().nullable(),
  available: z.boolean(),
  reason: z.string().optional(),
});

export type SubdomainAvailability = z.infer<typeof subdomainAvailabilitySchema>;

export const updateBrandingSchema = z.object({
  description: z.string().max(500).nullable(),
  primaryColor: z.string().length(7).nullable(),
});

export type UpdateBrandingRequest = z.infer<typeof updateBrandingSchema>;
