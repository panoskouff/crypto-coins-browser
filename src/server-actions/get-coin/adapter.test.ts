import { getCoinAdapter } from './adapter'

describe('getCoinAdapter', () => {
  it('should correctly adapt the API response data', () => {
    const mockResponseData = {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      description: { en: 'Bitcoin is a cryptocurrency.' },
      market_data: {
        price_change_24h_in_currency: { usd: 500 },
        price_change_percentage_7d_in_currency: { usd: 5 },
        price_change_percentage_14d_in_currency: { usd: 10 },
        price_change_percentage_30d_in_currency: { usd: 20 },
        price_change_percentage_200d_in_currency: { usd: 25 },
        price_change_percentage_1y_in_currency: { usd: 30 },
      },
    }

    const expectedResult = {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      description: 'Bitcoin is a cryptocurrency.',
      priceChange24h: 500,
      priceChange7d: 5,
      priceChange14d: 10,
      priceChange30d: 20,
      priceChange200d: 25,
      priceChange1y: 30,
    }

    const adaptedData = getCoinAdapter(mockResponseData)

    expect(adaptedData).toEqual(expectedResult)
  })
})
