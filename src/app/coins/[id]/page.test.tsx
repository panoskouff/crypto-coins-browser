import { render, screen } from '@testing-library/react'
import Page from './page'

var mockValidateParams: jest.Mock
jest.mock('./helpers.ts', () => {
  mockValidateParams = jest.fn(() => ({
    paramsAreValid: true,
    coinId: 'valid-id',
  }))
  return { validateParams: mockValidateParams }
})

var mockGetCoin: jest.Mock
jest.mock('#/server-actions', () => {
  mockGetCoin = jest.fn()
  return { getCoin: mockGetCoin }
})

var MockCoinDetails: jest.Mock
jest.mock('#/components/CoinDetails', () => {
  MockCoinDetails = jest.fn(() => <div>[CoinDetails]</div>)
  return { CoinDetails: MockCoinDetails }
})

const validParams = { id: 'valid-id' }
const inValidParams = { id: 'invalid-id' }

describe('coins/[id]/page.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly with the correct props', async () => {
    const coinDetailsData = { ok: true, data: 'mock-coin-details-data' }
    mockGetCoin.mockResolvedValue(coinDetailsData)

    render(await Page({ params: validParams }))

    expect(screen.getByText('[CoinDetails]')).toBeInTheDocument()
    expect(MockCoinDetails).toHaveBeenCalledWith(
      {
        coinInfo: 'mock-coin-details-data',
      },
      {},
    )
  })

  it('should render correctly when params are invalid', async () => {
    mockValidateParams.mockReturnValue({
      paramsAreValid: false,
      coinId: 'invalid-id',
    })

    render(await Page({ params: inValidParams }))

    expect(screen.getByText('Coin id not valid')).toBeInTheDocument()
    expect(mockGetCoin).not.toHaveBeenCalled()
    expect(MockCoinDetails).not.toHaveBeenCalled()
  })

  it('should render correctly when getCoin returns an error', async () => {
    mockValidateParams.mockReturnValue({
      paramsAreValid: true,
      coinId: 'valid-id',
    })

    const coinDetailsData = { ok: false, errorMessage: 'mock-error-message' }
    mockGetCoin.mockResolvedValue(coinDetailsData)

    const { rerender } = render(await Page({ params: validParams }))

    expect(screen.getByText('Coin id not valid')).toBeInTheDocument()
    expect(mockGetCoin).toHaveBeenCalledWith({ coinId: 'valid-id' })
    expect(MockCoinDetails).not.toHaveBeenCalled()

    mockGetCoin.mockResolvedValue({ ok: true, errorMessage: '', data: null })
    rerender(await Page({ params: validParams }))
    expect(screen.getByText('Coin id not valid')).toBeInTheDocument()
    expect(mockGetCoin).toHaveBeenCalledWith({ coinId: 'valid-id' })
    expect(MockCoinDetails).not.toHaveBeenCalled()
  })
})
