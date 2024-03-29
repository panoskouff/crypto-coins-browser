import { z } from 'zod'

export const getCoinSchema = z.object({
  coinId: z
    .string()
    // allow alphanumeric characters and hyphens
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i)
    .min(1)
    .max(50),
})
