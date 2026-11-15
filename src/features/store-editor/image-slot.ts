import * as z from 'zod';

export const imageSlotSchema = z.enum(['logo', 'bannerImage']);

export type ImageSlot = z.infer<typeof imageSlotSchema>;
