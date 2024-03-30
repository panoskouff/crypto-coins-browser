import { getCoinSchema } from './getCoinSchema'

describe('getCoinSchema', () => {
  it('should validate correct coinId formats', () => {
    const validIds = ['bitcoin', 'ethereum', 'doge-coin', 'a1b2-c3d4']

    validIds.forEach((id) => {
      const result = getCoinSchema.safeParse({ coinId: id })
      expect(result.success).toBe(true)
    })
  })

  it('should reject invalid coinId formats', () => {
    const invalidIds = [
      '',
      '-',
      'btc!',
      'btc@eth',
      ' '.repeat(51),
      'btc--eth',
      '-btc',
      'btc-',
    ]

    invalidIds.forEach((id) => {
      const result = getCoinSchema.safeParse({ coinId: id })
      expect(result.success).toBe(false)
    })
  })
})
