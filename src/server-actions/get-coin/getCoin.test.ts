import { getCoin } from './getCoin'

jest.mock('#/config', () => ({
  coinGeckoApiBaseUrl: '/baseUrl',
}))

var mockEscape: jest.Mock
jest.mock('validator', () => {
  const actual = jest.requireActual('validator')
  mockEscape = jest.fn((str: string) => actual.escape(str))
  return { escape: mockEscape }
})

var mockSchemaSafeParse: jest.Mock
jest.mock('#/schemas', () => {
  mockSchemaSafeParse = jest.fn()
  return {
    getCoinSchema: { safeParse: mockSchemaSafeParse },
  }
})

var mockGetCoinAdapter: jest.Mock
jest.mock('./adapter', () => {
  mockGetCoinAdapter = jest.fn(() => 'adapted-data')
  return {
    getCoinAdapter: mockGetCoinAdapter,
  }
})

global.fetch = jest.fn()

describe('getCoin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle invalid arguments', async () => {
    const result = await getCoin({ coinId: 123 as any })

    expect(result).toEqual({
      ok: false,
      errorMessage: 'Invalid arguments',
      data: null,
    })
  })

  it('should perform validation correctly', async () => {
    const args = { coinId: '<script>alert("xss")</script>' }

    mockSchemaSafeParse.mockReturnValueOnce({
      success: false,
      error: { message: 'validation error' },
    })

    const result = await getCoin(args)

    // should sanitize the coinId
    expect(mockEscape).toHaveBeenCalledWith(args.coinId)

    const escapedCoinId =
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'

    expect(mockEscape).toHaveReturnedWith(escapedCoinId)

    // should pass the sanitized coinId to the validation schema
    expect(mockSchemaSafeParse).toHaveBeenCalledWith({ coinId: escapedCoinId })

    expect(result).toEqual({
      ok: false,
      errorMessage: 'validation error',
      data: null,
    })
  })

  it('should fetch the coin with the correct URL', async () => {
    const args = { coinId: 'bitcoin' }

    mockSchemaSafeParse.mockReturnValueOnce({ success: true })

    await getCoin(args)

    expect(global.fetch).toHaveBeenCalledWith(
      '/baseUrl/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false',
    )
  })

  it('should handle correctly a successful response', async () => {
    const args = { coinId: 'bitcoin' }

    mockSchemaSafeParse.mockReturnValueOnce({ success: true })
    ;(global.fetch as jest.Mock).mockReturnValueOnce({
      json: async () => 'response-data',
    })

    const result = await getCoin(args)

    expect(mockGetCoinAdapter).toHaveBeenCalledWith('response-data')

    expect(result).toEqual({ ok: true, errorMessage: '', data: 'adapted-data' })
  })

  it('should handle correctly an error response', async () => {
    const args = { coinId: 'bitcoin' }
    mockSchemaSafeParse.mockReturnValueOnce({ success: true })

    const mockErrorResponse = 'error from fetch'

    ;(global.fetch as jest.Mock).mockReturnValueOnce({
      json: async () => ({ error: mockErrorResponse }),
    })

    const result = await getCoin(args)

    expect(result).toEqual({
      ok: false,
      errorMessage: mockErrorResponse,
      data: null,
    })
  })
})
