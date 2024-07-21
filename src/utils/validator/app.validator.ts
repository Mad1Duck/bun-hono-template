import { z } from 'zod';

export const appSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

export type appSchemaType = z.infer<typeof appSchema>;