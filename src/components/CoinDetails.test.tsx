import { render, screen } from '@testing-library/react'
import { CoinDetails } from './CoinDetails'

var mockFormatValue: jest.Mock
jest.mock('#/utils', () => {
  const actual = jest.requireActual('#/utils')
  mockFormatValue = jest.fn((symbol: string, value: number) => value)
  return {
    ...actual,
    formatValue: mockFormatValue,
  }
})

const mockCoinInfo = {
  id: 'mock-id',
  symbol: 'mock-symbol',
  name: 'mock-name',
  description: '<p>This description is <strong>mocked</strong></p>',
  priceChange24h: 1,
  priceChange7d: 2,
  priceChange14d: 3,
  priceChange30d: 4,
  priceChange200d: 5,
  priceChange1y: 6,
}

describe('CoinDetails', () => {
  it('renders correctly for the correct props', () => {
    render(<CoinDetails coinInfo={mockCoinInfo} />)

    expect(screen.getByText('mock-name')).toBeInTheDocument()

    // should render the description html string correctly
    expect(screen.getByText('This description is')).toBeInTheDocument()
    expect(screen.getByText('mocked').tagName).toBe('STRONG')

    expect(mockFormatValue).toHaveBeenCalledTimes(6)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
  })
})
