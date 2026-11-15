import * as z from 'zod';

import { themePaletteSchema } from './store-theme.ts';
import { ulidSchema } from './ulid.ts';

export const createStoreSchema = z.object({
  name: z.string().min(2).max(120),
});

export type CreateStoreRequest = z.infer<typeof createStoreSchema>;

export const storeSchema = z.object({
  storeUlid: ulidSchema,
  name: z.string(),
  subdomain: z.string(),
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
  tagline: z.string().max(160).optional(),
  palette: themePaletteSchema.optional(),
});

export type UpdateBrandingRequest = z.infer<typeof updateBrandingSchema>;
