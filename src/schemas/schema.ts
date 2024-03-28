import { z } from 'zod'

export const getCoinsListSchema = z.object({
  page: z
    .number()
    .int()
    .positive()
    .refine((val) => val <= Number.MAX_SAFE_INTEGER),
  perPage: z.number().int().positive().max(250),
})
