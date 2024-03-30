import { getCoinsList } from './getCoinsList'

jest.mock('#/config', () => ({
  coinGeckoApiBaseUrl: '/baseUrl',
}))

var mockSchemaSafeParse: jest.Mock
jest.mock('#/schemas', () => {
  mockSchemaSafeParse = jest.fn()
  return {
    getCoinsListSchema: { safeParse: mockSchemaSafeParse },
  }
})

var mockGetCoinsListAdapter: jest.Mock
jest.mock('./adapter', () => {
  mockGetCoinsListAdapter = jest.fn(() => 'adapted-data')
  return {
    getCoinsListAdapter: mockGetCoinsListAdapter,
  }
})

global.fetch = jest.fn()

describe('getCoinsList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle invalid arguments', async () => {
    const correctInvalidArgsResult = {
      ok: false,
      errorMessage: 'Invalid arguments',
      data: [],
    }

    const resultForInvalidPage = await getCoinsList({
      page: 'invalid page argument' as any,
      perPage: 10,
    })

    expect(resultForInvalidPage).toEqual(correctInvalidArgsResult)

    const resultForInvalidPerPage = await getCoinsList({
      page: 1,
      perPage: 'invalid perPage argument' as any,
    })

    expect(resultForInvalidPerPage).toEqual(correctInvalidArgsResult)
  })

  it('should perform validation correctly', async () => {
    const args = { page: 1, perPage: -1 }
    await getCoinsList(args)
    // should pass the arguments to the validation schema
    expect(mockSchemaSafeParse).toHaveBeenCalledWith(args)

    // should return the correct result if there was a validation error
    const error = new Error('validation error')
    mockSchemaSafeParse.mockReturnValueOnce({ success: false, error })
    const result = await getCoinsList(args)

    expect(result).toEqual({ ok: false, errorMessage: error.message, data: [] })
  })

  it('should fetch the coins list with the correct URL', async () => {
    const args = { page: 1, perPage: 10 }

    mockSchemaSafeParse.mockReturnValueOnce({ success: true })

    await getCoinsList(args)

    expect(global.fetch).toHaveBeenCalledWith(
      '/baseUrl/coins/markets?vs_currency=usd&per_page=10&page=1&price_change_percentage=24h',
    )
  })

  it('should handle correctly a successful response', async () => {
    const args = { page: 1, perPage: 10 }

    mockSchemaSafeParse.mockReturnValueOnce({ success: true })
    ;(global.fetch as jest.Mock).mockReturnValueOnce({
      json: async () => 'response-data',
    })

    const result = await getCoinsList(args)

    // should pass the data from response to the adapter
    expect(mockGetCoinsListAdapter).toHaveBeenCalledWith('response-data')

    expect(result).toEqual({ ok: true, errorMessage: '', data: 'adapted-data' })
  })

  it('should handle correctly an error response', async () => {
    const args = { page: 1, perPage: 10 }

    mockSchemaSafeParse.mockReturnValueOnce({ success: true })

    const mockResponseErrorMessage = 'mock-response-error'

    ;(global.fetch as jest.Mock).mockReturnValueOnce({
      json: async () => ({
        status: { error_message: mockResponseErrorMessage },
      }),
    })

    const result = await getCoinsList(args)

    expect(result).toEqual({
      ok: false,
      errorMessage: mockResponseErrorMessage,
      data: [],
    })
  })
})
