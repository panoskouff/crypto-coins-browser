import { render, screen } from '@testing-library/react'
import Page from './page'

var mockValidateSearchParams: jest.Mock
jest.mock('./helpers.ts', () => {
  mockValidateSearchParams = jest.fn(() => ({}))
  return { validateSearchParams: mockValidateSearchParams }
})

var mockRedirect: jest.Mock
jest.mock('next/navigation', () => {
  mockRedirect = jest.fn()
  return { redirect: mockRedirect }
})

var mockGetCoinsList: jest.Mock
jest.mock('#/server-actions', () => {
  mockGetCoinsList = jest.fn()
  return { getCoinsList: mockGetCoinsList }
})

var MockCoinsList: jest.Mock
jest.mock('#/components/coins-list', () => {
  MockCoinsList = jest.fn(() => <div>[CoinsList]</div>)
  return { CoinsList: MockCoinsList }
})

const validParams = { page: '2', perPage: '5' }
const inValidParams = { page: 'someString', perPage: '-1' }
const fallbackParams = { page: '1', perPage: '10' }

describe('/coins/markets/page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly with the correct props', async () => {
    mockValidateSearchParams.mockReturnValue({
      paramsAreValid: true,
      validatedParams: validParams,
    })

    const coinsList = { data: [] }
    mockGetCoinsList.mockResolvedValue(coinsList)

    render(await Page({ searchParams: validParams }))

    expect(mockRedirect).not.toHaveBeenCalled()

    expect(screen.getByText('Coin List')).toBeInTheDocument()
    expect(screen.getByText('[CoinsList]')).toBeInTheDocument()
    expect(MockCoinsList).toHaveBeenCalledWith(
      {
        coinsListResponse: coinsList,
        currentPage: validParams.page,
        currentPerPage: validParams.perPage,
        baseUrl: '/coins/markets',
        defaultErrorMessage: 'Something went wrong : (',
      },
      {},
    )
  })

  it('should redirect to the correct page if the search params are invalid', async () => {
    mockValidateSearchParams.mockReturnValue({
      paramsAreValid: false,
      validatedParams: fallbackParams,
    })
    render(await Page({ searchParams: inValidParams }))

    expect(mockRedirect).toHaveBeenCalledWith(
      '/coins/markets/?page=1&perPage=10',
    )
  })
})
