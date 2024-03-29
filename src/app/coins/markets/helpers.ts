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
  let initialPage = defaultValue.page
  try {
    const { page: pageStr } = searchParams
    const sanitizedPage = escape(pageStr as string)
    const page = parseInt(sanitizedPage)

    const validationResult = partialSchema.safeParse({ page })

    if (validationResult.success) {
      initialPage = page
      pageParamIsValid = true
    }
  } catch (error) {
    // noop
  }

  let perPageParamIsValid = false
  let initialPerPage = defaultValue.perPage
  try {
    const { perPage: perPageStr } = searchParams
    const sanitizedPerPage = escape(perPageStr as string)
    const perPage = parseInt(sanitizedPerPage)

    const validationResult = partialSchema.safeParse({ perPage })

    if (validationResult.success) {
      initialPerPage = perPage
      perPageParamIsValid = true
    }
  } catch {
    // noop
  }

  return {
    paramsAreValid: pageParamIsValid && perPageParamIsValid,
    validatedParams: {
      page: initialPage,
      perPage: initialPerPage,
    },
  }
}
