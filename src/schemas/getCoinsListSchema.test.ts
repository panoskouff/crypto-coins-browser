import { getCoinsListSchema } from './getCoinsListSchema'

describe('getCoinsListSchema', () => {
  it('should validate correct page and perPage values', () => {
    const validInputs = [
      { page: 1, perPage: 1 },
      { page: 10, perPage: 100 },
      { page: Number.MAX_SAFE_INTEGER, perPage: 250 },
    ]

    validInputs.forEach((input) => {
      const result = getCoinsListSchema.safeParse(input)
      expect(result.success).toBe(true)
    })
  })

  it('should reject invalid page and perPage values', () => {
    const invalidInputs = [
      // invalid page
      { page: 0, perPage: 10 },
      { page: -1, perPage: 100 },
      { page: 1.5, perPage: 50 },
      { page: Number.MAX_SAFE_INTEGER + 1, perPage: 5 },
      // invalid perPage
      { page: 1, perPage: 0 },
      { page: 2, perPage: -100 },
      { page: 3, perPage: 251 },
      { page: 4, perPage: 25.5 },
    ]

    invalidInputs.forEach((input) => {
      const result = getCoinsListSchema.safeParse(input)
      expect(result.success).toBe(false)
    })
  })
})
