'use client'
import { useCallback, useEffect } from 'react'
import { getCoinsList } from '#/server-actions'
import { useRouter } from 'next/navigation'
import { Text, Center } from '#/atoms'
import { CoinsList } from './CoinsList'

type CoinsListResponse = Awaited<ReturnType<typeof getCoinsList>>

type CoinsListContainerProps = {
  coinsListResponse: CoinsListResponse
  currentPage: number
  currentPerPage: number
  baseUrl: string
  defaultErrorMessage: string
}

const getUrlForPage = (baseUrl: string, page: number, perPage: number) => {
  const searchParams = new URLSearchParams()
  searchParams.set('page', page.toString())
  searchParams.set('perPage', perPage.toString())
  return `${baseUrl}/?${searchParams.toString()}`
}

export const CoinsListContainer: React.FC<CoinsListContainerProps> = ({
  coinsListResponse,
  currentPage,
  currentPerPage,
  baseUrl,
  defaultErrorMessage,
}) => {
  const router = useRouter()

  const nextPage = currentPage + 1
  const previousPage = Math.max(currentPage - 1, 1)

  useEffect(() => {
    if (currentPage > 1) {
      router.prefetch(getUrlForPage(baseUrl, previousPage, currentPerPage))
    }

    router.prefetch(getUrlForPage(baseUrl, nextPage, currentPerPage))
  }, [baseUrl, currentPage, currentPerPage, nextPage, previousPage, router])

  const moveTo = useCallback(
    (page: number) => {
      const newPageUrl = getUrlForPage(baseUrl, page, currentPerPage)
      router.push(newPageUrl)
    },
    [baseUrl, currentPerPage, router],
  )

  if (!coinsListResponse.ok) {
    return (
      <Center h='50vh'>
        {coinsListResponse.errorMessage ? (
          <Text color='red'>{coinsListResponse.errorMessage}</Text>
        ) : (
          <Text color='red'>{defaultErrorMessage}</Text>
        )}
      </Center>
    )
  }

  return (
    <CoinsList
      coins={coinsListResponse.data}
      errorMessage={coinsListResponse.errorMessage}
      currentPage={currentPage}
      nextPage={nextPage}
      previousPage={previousPage}
      moveTo={moveTo}
      isPreviousPageDisabled={currentPage === 1}
    />
  )
}
