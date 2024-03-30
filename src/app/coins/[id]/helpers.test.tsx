import { validateParams } from './helpers'

var mockEscape: jest.Mock
jest.mock('validator', () => {
  const actual = jest.requireActual('validator')
  mockEscape = jest.fn((str: string) => actual.escape(str))
  return { escape: mockEscape }
})

describe('validateParams', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should validate the id param and return the correct result', () => {
    const resultValid = validateParams({ id: 'bitcoin' })
    expect(resultValid.paramsAreValid).toBe(true)
    expect(resultValid.coinId).toBe('bitcoin')

    const resultInvalid = validateParams({ id: 'inv@l!d-i&' })
    expect(resultInvalid.paramsAreValid).toBe(false)
    expect(resultInvalid.coinId).toBe('')
  })

  it('should sanitize the id param', () => {
    expect(mockEscape).not.toHaveBeenCalled()

    const maliciousInput = '<script>alert("xss")</script>'
    const result = validateParams({ id: maliciousInput })

    expect(mockEscape).toHaveBeenCalledWith(maliciousInput)
    expect(mockEscape).toHaveReturnedWith(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;',
    )

    expect(result).toEqual({ paramsAreValid: false, coinId: '' })
  })
})
