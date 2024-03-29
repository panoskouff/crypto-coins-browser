type CoinInfo = {
  id: string
  symbol: string
  name: string
  description: { en: string }
  market_data: {
    price_change_24h_in_currency: {
      usd: number
    }
    price_change_percentage_7d_in_currency: {
      usd: number
    }
    price_change_percentage_14d_in_currency: {
      usd: number
    }
    price_change_percentage_30d_in_currency: {
      usd: number
    }
    price_change_percentage_200d_in_currency: {
      usd: number
    }
    price_change_percentage_1y_in_currency: {
      usd: number
    }
  }
}

type GetCoinResponseData = CoinInfo

export const getCoinAdapter = (responseData: GetCoinResponseData) => {
  const { id, symbol, name, description, market_data } = responseData

  return {
    id: id,
    symbol: symbol,
    name: name,
    description: description.en,
    priceChange24h: market_data.price_change_24h_in_currency.usd,
    priceChange7d: market_data.price_change_percentage_7d_in_currency.usd,
    priceChange14d: market_data.price_change_percentage_14d_in_currency.usd,
    priceChange30d: market_data.price_change_percentage_30d_in_currency.usd,
    priceChange200d: market_data.price_change_percentage_200d_in_currency.usd,
    priceChange1y: market_data.price_change_percentage_1y_in_currency.usd,
  }
}
