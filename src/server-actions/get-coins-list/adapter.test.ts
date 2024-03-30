import { getCoinsListAdapter } from './adapter'

describe('getCoinsListAdapter', () => {
  it('correctly transforms API response data into the desired format', () => {
    const mockApiResponse = [
      {
        id: 'coin-1',
        symbol: 'C1',
        name: 'Coin One',
        current_price: 100,
        high_24h: 120,
        low_24h: 80,
        price_change_percentage_24h: 5,
      },
      {
        id: 'coin-2',
        symbol: 'C2',
        name: 'Coin Two',
        current_price: 200,
        high_24h: 240,
        low_24h: 160,
        price_change_percentage_24h: -3,
      },
    ]

    const expectedResult = [
      {
        id: 'coin-1',
        symbol: 'C1',
        name: 'Coin One',
        currentPrice: 100,
        high24h: 120,
        low24h: 80,
        priceChangePercentage24h: 5,
      },
      {
        id: 'coin-2',
        symbol: 'C2',
        name: 'Coin Two',
        currentPrice: 200,
        high24h: 240,
        low24h: 160,
        priceChangePercentage24h: -3,
      },
    ]

    const result = getCoinsListAdapter(mockApiResponse)
    expect(result).toEqual(expectedResult)
  })
})
