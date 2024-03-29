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
  let paramsAreValid = true

  let initialPage = defaultValue.page
  try {
    const { page: pageStr } = searchParams
    const sanitizedPage = escape(pageStr as string)
    const page = parseInt(sanitizedPage)

    const validationResult = partialSchema.safeParse({ page })

    if (validationResult.success) {
      initialPage = page
    }
  } catch (error) {
    paramsAreValid = false
  }

  let initialPerPage = defaultValue.perPage
  try {
    const { perPage: perPageStr } = searchParams
    const sanitizedPerPage = escape(perPageStr as string)
    const perPage = parseInt(sanitizedPerPage)

    const validationResult = partialSchema.safeParse({ perPage })

    if (validationResult.success) {
      initialPerPage = perPage
    }
  } catch {
    paramsAreValid = false
  }

  return {
    paramsAreValid,
    validatedParams: {
      page: initialPage,
      perPage: initialPerPage,
    },
  }
}
