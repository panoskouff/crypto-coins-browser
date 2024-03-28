'use server'

import { coinGeckoApiBaseUrl } from '#/config'
import { getCoinAdapter } from './adapter'
import { sanitizeArgs } from './helpers'
import { getCoinSchema } from './schema'

type GetCoinArgs = {
  coinId: string
}

export const getCoin = async (args: GetCoinArgs) => {
  try {
    if (typeof args.coinId !== 'string') {
      throw new Error('Invalid arguments')
    }

    const { coinId } = sanitizeArgs(args)

    const validationResult = getCoinSchema.safeParse({ coinId })

    if (!validationResult.success) {
      throw new Error(validationResult.error.message)
    }

    const url = `${coinGeckoApiBaseUrl}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`

    const response = await fetch(url)
    const data = await response.json()

    const adaptedData = getCoinAdapter(data)

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
      data: null,
    }
  }
}
