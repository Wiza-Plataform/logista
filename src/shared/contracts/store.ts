import * as z from 'zod';

export const ULID_PATTERN = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/;

export const ulidSchema = z.string().regex(ULID_PATTERN);

export const VAT_REGIMES = ['EXEMPT', 'STANDARD'] as const;

export const vatRegimeSchema = z.enum(VAT_REGIMES);

export type VatRegime = z.infer<typeof vatRegimeSchema>;

export const createStoreSchema = z.object({
  name: z.string().min(2).max(120),
  subdomain: z.string().min(3).max(63),
  categoryUlid: ulidSchema,
  nif: z.string().min(9).max(20),
  whatsappPhone: z.string().min(9).max(20),
  email: z.email().max(160),
});

export type CreateStoreRequest = z.infer<typeof createStoreSchema>;

export const createdStoreSchema = z.object({
  storeUlid: ulidSchema,
  subdomain: z.string(),
});

export type CreatedStore = z.infer<typeof createdStoreSchema>;

export const subdomainAvailabilitySchema = z.object({
  subdomain: z.string(),
  available: z.boolean(),
  reason: z.string().optional(),
});

export type SubdomainAvailability = z.infer<typeof subdomainAvailabilitySchema>;

export const updateFiscalIdentitySchema = z.object({
  bizTypeUlid: ulidSchema,
  vatRegime: vatRegimeSchema,
});

export type UpdateFiscalIdentityRequest = z.infer<typeof updateFiscalIdentitySchema>;

export const updateBrandingSchema = z.object({
  description: z.string().max(500).nullable(),
  primaryColor: z.string().length(7).nullable(),
});

export type UpdateBrandingRequest = z.infer<typeof updateBrandingSchema>;
