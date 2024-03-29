import { getCoinSchema } from '#/schemas'
import { escape } from 'validator'

type Params = { id: string }

export const validateParams = ({ id }: Params) => {
  try {
    const sanitizedCoinId = escape(id)

    const validationResult = getCoinSchema.safeParse({
      coinId: sanitizedCoinId,
    })

    if (validationResult.success) {
      return { paramsAreValid: true, coinId: sanitizedCoinId }
    } else {
      throw new Error(validationResult.error.message)
    }
  } catch (error) {
    return { paramsAreValid: false, coinId: '' }
  }
}
