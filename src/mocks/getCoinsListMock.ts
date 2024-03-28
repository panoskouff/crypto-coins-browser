type GetCoinsListArgs = {
  page: number
  perPage: number
}

const getFakeResponse = (page: number, perPage: number) => {
  const startIndex = (page - 1) * perPage
  return Array.from({ length: perPage }, (_, i) => ({
    id: `id-${startIndex + i}`,
    symbol: `symbol-${startIndex + i}`,
    name: 'mock-name',
    currentPrice: 1000 + startIndex + i,
    high24h: 1000 + startIndex + i,
    low24h: 1000 + startIndex + i,
    priceChangePercentage24h: 1000 + startIndex + i,
    lastUpdated: '2021-10-10',
  }))
}

export const getCoinsListMock = async ({ page, perPage }: GetCoinsListArgs) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        ok: true,
        errorMessage: '',
        data: getFakeResponse(page, perPage),
      })
    }, 100),
  )
}
