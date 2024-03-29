type CoinInfo = {
  id: string
  symbol: string
  name: string
  current_price: number
  high_24h: number
  low_24h: number
  price_change_percentage_24h: number
}

type GetCoinsListResponseData = CoinInfo[]

export const getCoinsListAdapter = (responseData: GetCoinsListResponseData) => {
  return responseData.map((coinInfo) => {
    return {
      id: coinInfo.id,
      symbol: coinInfo.symbol,
      name: coinInfo.name,
      currentPrice: coinInfo.current_price,
      high24h: coinInfo.high_24h,
      low24h: coinInfo.low_24h,
      priceChangePercentage24h: coinInfo.price_change_percentage_24h,
    }
  })
}
