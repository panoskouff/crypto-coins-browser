import { render, screen } from '@testing-library/react'
import Page from './page'

describe('Home', () => {
  it('should render the available route URLs', async () => {
    render(await Page())

    const marketsLink = screen.getByRole('link', { name: '/coins/markets' })
    expect(marketsLink).toBeInTheDocument()
    expect(marketsLink).toHaveAttribute('href', '/coins/markets')

    const bitcoinLink = screen.getByRole('link', { name: '/coins/bitcoin' })
    expect(bitcoinLink).toBeInTheDocument()
    expect(bitcoinLink).toHaveAttribute('href', '/coins/bitcoin')
  })
})
