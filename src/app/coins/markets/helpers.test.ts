import { validateSearchParams } from './helpers'

const originalParseInt = global.parseInt
const mockParseInt = jest.fn((value: string, radix?: number) =>
  originalParseInt(value, radix),
)
global.parseInt = mockParseInt

const defaultValue = {
  page: 1,
  perPage: 10,
}

const pageValidPerPageInvalid = {
  searchParams: { page: '5', perPage: 'a' },
  defaultValue,
}

const pageInvalidPerPageValid = {
  searchParams: { page: 'a', perPage: '100' },
  defaultValue,
}

const bothParamsInvalid = {
  searchParams: { page: 'a', perPage: 'a' },
  defaultValue,
}

const bothParamsValid = {
  searchParams: { page: '5', perPage: '100' },
  defaultValue,
}

describe('validateSearchParams', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should validate both search params separately and return the correct result', () => {
    const resultBothValid = validateSearchParams(bothParamsValid)
    expect(resultBothValid.paramsAreValid).toBe(true)
    expect(resultBothValid.validatedParams).toEqual({ page: 5, perPage: 100 })

    const resultBothInvalid = validateSearchParams(bothParamsInvalid)
    expect(resultBothInvalid.paramsAreValid).toBe(false)
    expect(resultBothInvalid.validatedParams).toEqual(defaultValue)

    const resultPageValid = validateSearchParams(pageValidPerPageInvalid)
    expect(resultPageValid.paramsAreValid).toBe(false)
    expect(resultPageValid.validatedParams).toEqual({
      page: 5,
      perPage: defaultValue.perPage,
    })

    const resultPerPageValid = validateSearchParams(pageInvalidPerPageValid)
    expect(resultPerPageValid.paramsAreValid).toBe(false)
    expect(resultPerPageValid.validatedParams).toEqual({
      page: defaultValue.page,
      perPage: 100,
    })
  })

  it('should sanitize the search params and convert them to integers', () => {
    expect(mockParseInt).not.toHaveBeenCalled()

    const result = validateSearchParams({
      searchParams: {
        page: '<script>alert("xss")</script>',
        perPage: '<img src=x onerror=alert("type")>',
      },
      defaultValue,
    })

    expect(mockParseInt).toHaveBeenCalledWith(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;',
    )
    expect(mockParseInt).toHaveBeenCalledWith(
      '&lt;img src=x onerror=alert(&quot;type&quot;)&gt;',
    )

    expect(result).toEqual({
      paramsAreValid: false,
      validatedParams: { page: 1, perPage: 10 },
    })
  })
})
