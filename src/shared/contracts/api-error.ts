import * as z from 'zod';

export const apiErrorSchema = z.object({
  statusCode: z.number().optional(),
  field: z.string().optional(),
  message: z.union([z.string(), z.array(z.string())]).optional(),
});

export type ApiErrorBody = z.infer<typeof apiErrorSchema>;

export function parseApiError(body: unknown): ApiErrorBody | null {
  const parsed = apiErrorSchema.safeParse(body);
  return parsed.success ? parsed.data : null;
}
