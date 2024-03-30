import { render, screen } from '@testing-library/react'
import { CoinsListContainer } from './CoinsListContainer'

var mockRouterPush: jest.Mock
var mockRouterPrefetch: jest.Mock
jest.mock('next/navigation', () => {
  mockRouterPush = jest.fn()
  mockRouterPrefetch = jest.fn()
  return {
    useRouter: () => ({
      push: mockRouterPush,
      prefetch: mockRouterPrefetch,
    }),
  }
})

var MockCoinsList: jest.Mock
jest.mock('./CoinsList', () => {
  MockCoinsList = jest.fn(() => <div>[CoinsList]</div>)
  return { CoinsList: MockCoinsList }
})

var mockGetUrlForPage: jest.Mock
jest.mock('./helpers', () => {
  mockGetUrlForPage = jest.fn(
    (baseUrl: string, page: number, perPage: number) => {
      return `${baseUrl}?page=${page}&perPage=${perPage}`
    },
  )
  return { getUrlForPage: mockGetUrlForPage }
})

const mockProps = {
  coinsListResponse: {
    ok: true,
    errorMessage: 'mock-coins-list-error-message',
    data: [{ id: 'bitcoin' }],
  } as any,
  currentPage: 1,
  currentPerPage: 10,
  baseUrl: '/coins',
  defaultErrorMessage: 'mock-default-error-message',
}

describe('CoinsListContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly for the correct props', () => {
    render(<CoinsListContainer {...mockProps} />)

    expect(screen.queryByText(mockProps.defaultErrorMessage)).toBeNull()
    expect(
      screen.queryByText(mockProps.coinsListResponse.errorMessage),
    ).toBeNull()

    expect(MockCoinsList).toHaveBeenCalledWith(
      {
        coins: mockProps.coinsListResponse.data,
        errorMessage: mockProps.coinsListResponse.errorMessage,
        currentPage: mockProps.currentPage,
        nextPage: mockProps.currentPage + 1,
        previousPage: Math.max(mockProps.currentPage - 1, 1),
        moveTo: expect.any(Function),
        isPreviousPageDisabled: true,
      },
      {},
    )
  })

  it('should prefetch the correct pages', () => {
    const { rerender } = render(<CoinsListContainer {...mockProps} />)
    expect(mockRouterPrefetch).toHaveBeenCalledWith('/coins?page=2&perPage=10')
    expect(mockRouterPrefetch).toHaveBeenCalledTimes(1)

    mockRouterPrefetch.mockClear()

    rerender(
      <CoinsListContainer
        coinsListResponse={{ ok: true, errorMessage: '', data: [] }}
        currentPage={2}
        currentPerPage={10}
        baseUrl='/coins'
        defaultErrorMessage='mock-default-error-message'
      />,
    )

    expect(mockRouterPrefetch).toHaveBeenCalledWith('/coins?page=1&perPage=10')
    expect(mockRouterPrefetch).toHaveBeenCalledWith('/coins?page=3&perPage=10')
    expect(mockRouterPrefetch).toHaveBeenCalledTimes(2)
  })

  it('should push the new page url when moveTo is called', () => {
    render(<CoinsListContainer {...mockProps} />)

    const moveTo = MockCoinsList.mock.calls[0][0].moveTo
    moveTo(5)

    expect(mockRouterPush).toHaveBeenCalledWith('/coins?page=5&perPage=10')
  })

  it('should render the correct error message', () => {
    const { rerender } = render(
      <CoinsListContainer
        {...mockProps}
        coinsListResponse={{
          ok: false,
          errorMessage: 'mock-coins-list-error-message',
          data: [],
        }}
      />,
    )

    expect(
      screen.getByText('mock-coins-list-error-message'),
    ).toBeInTheDocument()

    expect(screen.queryByText('mock-default-error-message')).toBeNull()

    rerender(
      <CoinsListContainer
        {...mockProps}
        coinsListResponse={{ ok: false, errorMessage: '', data: [] }}
      />,
    )

    expect(screen.getByText('mock-default-error-message')).toBeInTheDocument()
    expect(screen.queryByText('mock-coins-list-error-message')).toBeNull()
  })
})
