type GetCoinsListArgs = {
  page: number
  perPage: number
}

const getFakeResponse = (page: number, perPage: number) => {
  const startIndex = (page - 1) * perPage
  return Array.from({ length: perPage }, (_, i) => ({
    id: `id-${startIndex + i}`,
    symbol: `-s-`,
    name: `coin-name-${startIndex + i}`,
    currentPrice: 1000000000000 + startIndex + i,
    high24h: 1000 + startIndex + i,
    low24h: 1000 + startIndex + i,
    priceChangePercentage24h:
      i % 2 === 0 ? 1000 + startIndex + i : -(1000 + startIndex + i),
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
