import { render } from '@testing-library/react'
import Page from './page'

var mockRedirect: jest.Mock
jest.mock('next/navigation', () => {
  mockRedirect = jest.fn()
  return { redirect: mockRedirect }
})

describe('/coins/page.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should redirect to /coins/markets route', () => {
    render(<Page />)
    expect(mockRedirect).toHaveBeenCalledWith('/coins/markets')
  })
})
