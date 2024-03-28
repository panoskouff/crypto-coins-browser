'use server'

import { coinGeckoApiBaseUrl } from '#/config'
import { getCoinsListSchema } from '#/schemas/schema'
import { getCoinsListAdapter } from './adapter'

type GetCoinsListArgs = {
  page: number
  perPage: number
}

export const getCoinsList = async ({ page, perPage }: GetCoinsListArgs) => {
  try {
    if (typeof page !== 'number' || typeof perPage !== 'number') {
      throw new Error('Invalid arguments')
    }

    const validationResult = getCoinsListSchema.safeParse({ page, perPage })

    if (!validationResult.success) {
      throw new Error(validationResult.error.message)
    }

    const url = `${coinGeckoApiBaseUrl}/coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}&price_change_percentage=24h`

    const response = await fetch(url)
    const data = await response.json()

    const adaptedData = getCoinsListAdapter(data)

    return {
      ok: true,
      errorMessage: '',
      data: adaptedData,
    }
  } catch (error) {
    let errorMessage = 'Unknown error'

    if (error instanceof Error && error.message) {
      errorMessage = error.message
    }

    return {
      ok: false,
      errorMessage,
      data: [],
    }
  }
}
