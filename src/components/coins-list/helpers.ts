export const getUrlForPage = (
  baseUrl: string,
  page: number,
  perPage: number,
) => {
  const searchParams = new URLSearchParams()
  searchParams.set('page', page.toString())
  searchParams.set('perPage', perPage.toString())
  return `${baseUrl}/?${searchParams.toString()}`
}
