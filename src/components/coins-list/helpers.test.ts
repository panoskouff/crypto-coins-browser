import { getUrlForPage } from './helpers'

describe('getUrlForPage', () => {
  it('should return the correct URL for the correct params', () => {
    const baseUrl = 'http://example.com'
    const page = 2
    const perPage = 10

    const result = getUrlForPage(baseUrl, page, perPage)

    expect(result).toBe('http://example.com/?page=2&perPage=10')
  })
})
