import { getCoinsListSchema } from '#/schemas'
import { ServerSearchParams } from '#/types'
import { escape } from 'validator'

type Args = {
  searchParams: ServerSearchParams
  defaultValue: {
    page: number
    perPage: number
  }
}

const partialSchema = getCoinsListSchema.partial()

export const validateSearchParams = ({ searchParams, defaultValue }: Args) => {
  let pageParamIsValid = false
  let resolvedPageParam = defaultValue.page
  try {
    const { page } = searchParams
    const sanitizedPage = escape(page as string)
    const pageFromSearchParams = parseInt(sanitizedPage)

    const validationResult = partialSchema.safeParse({
      page: pageFromSearchParams,
    })

    if (validationResult.success) {
      resolvedPageParam = pageFromSearchParams
      pageParamIsValid = true
    }
  } catch (error) {
    // noop
  }

  let perPageParamIsValid = false
  let resolvedPerPageParam = defaultValue.perPage
  try {
    const { perPage } = searchParams
    const sanitizedPerPage = escape(perPage as string)
    const perPageFromSearchParams = parseInt(sanitizedPerPage)

    const validationResult = partialSchema.safeParse({
      perPage: perPageFromSearchParams,
    })

    if (validationResult.success) {
      resolvedPerPageParam = perPageFromSearchParams
      perPageParamIsValid = true
    }
  } catch {
    // noop
  }

  return {
    paramsAreValid: pageParamIsValid && perPageParamIsValid,
    validatedParams: {
      page: resolvedPageParam,
      perPage: resolvedPerPageParam,
    },
  }
}
