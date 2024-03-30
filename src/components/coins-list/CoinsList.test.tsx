import { render, screen } from '@testing-library/react'
import { CoinsList } from './CoinsList'

var MockGridRowLink: jest.Mock
jest.mock('./GridStyles', () => {
  const actual = jest.requireActual('./GridStyles')
  MockGridRowLink = jest.fn(({ href, children }) => <div>{children}</div>)
  return {
    ...actual,
    GridRowLink: MockGridRowLink,
    GridItemHeader: () => <span>[grid-header-element]</span>,
  }
})

var mockFormatValue: jest.Mock
jest.mock('#/utils', () => {
  const actual = jest.requireActual('#/utils')
  mockFormatValue = jest.fn((symbol: string, text: string) => {
    return text
  })
  return {
    ...actual,
    formatValue: mockFormatValue,
  }
})

var mockMoveTo = jest.fn(() => {})

const mockProps = {
  coins: [
    {
      id: 'mock-coin-1-id',
      name: 'mock-coin-1-name',
      symbol: 'mock-coin-1-symbol',
      currentPrice: 'mock-coin-1-price-1',
      high24h: 'mock-coin-1-high-24h',
      low24h: 'mock-coin-1-low-24h',
      priceChangePercentage24h: 'mock-coin-1-price-change-percentage-24h',
    },
    {
      id: 'mock-coin-2-id',
      name: 'mock-coin-2-name',
      symbol: 'mock-coin-2-symbol',
      currentPrice: 'mock-coin-2-price-2',
      high24h: 'mock-coin-2-high-24h',
      low24h: 'mock-coin-2-low-24h',
      priceChangePercentage24h: 'mock-coin-2-price-change-percentage-24h',
    },
  ],
  errorMessage: '',
  nextPage: 2,
  currentPage: 1,
  previousPage: 0,
  isPreviousPageDisabled: true,
  moveTo: mockMoveTo,
} as any

describe('CoinsList', () => {
  it('should render correctly for the correct props', () => {
    render(<CoinsList {...mockProps} />)

    const coin1 = mockProps.coins[0]
    const coin2 = mockProps.coins[1]

    // expect a header item for each rendered coin property
    expect(screen.getAllByText('[grid-header-element]')).toHaveLength(5)

    expect(MockGridRowLink).toHaveBeenNthCalledWith(
      1,
      {
        href: `/coins/${coin1.id}`,
        children: expect.anything(),
      },
      {},
    )

    // expect all coins to be rendered
    expect(screen.getByText(coin1.name)).toBeInTheDocument()
    expect(screen.getByText(`(${coin1.symbol})`)).toBeInTheDocument()
    expect(screen.getByText(coin1.currentPrice)).toBeInTheDocument()
    expect(screen.getByText(coin1.high24h)).toBeInTheDocument()
    expect(screen.getByText(coin1.low24h)).toBeInTheDocument()
    expect(screen.getByText(coin1.priceChangePercentage24h)).toBeInTheDocument()

    expect(MockGridRowLink).toHaveBeenNthCalledWith(
      2,
      {
        href: `/coins/${coin2.id}`,
        children: expect.anything(),
      },
      {},
    )

    expect(screen.getByText(coin2.name)).toBeInTheDocument()
    expect(screen.getByText(`(${coin2.symbol})`)).toBeInTheDocument()
    expect(screen.getByText(coin2.currentPrice)).toBeInTheDocument()
    expect(screen.getByText(coin2.high24h)).toBeInTheDocument()
    expect(screen.getByText(coin2.low24h)).toBeInTheDocument()
    expect(screen.getByText(coin2.priceChangePercentage24h)).toBeInTheDocument()

    expect(
      screen.queryByText(`Page ${mockProps.currentPage}`),
    ).toBeInTheDocument()

    const buttons = screen.getAllByRole('button')
    // first button is the previous page button, 2nd one is for the next page
    expect(buttons).toHaveLength(2)

    expect(mockMoveTo).not.toHaveBeenCalled()
    buttons[0].click()
    expect(mockMoveTo).not.toHaveBeenCalled() // previous button is disabled

    buttons[1].click()
    expect(mockMoveTo).toHaveBeenCalledWith(mockProps.nextPage)

    expect(mockMoveTo).toHaveBeenCalledTimes(1)
  })

  it('should render an error message if one is provided', () => {
    const errorMessage = 'mock-error-message'
    render(<CoinsList {...mockProps} errorMessage={errorMessage} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
