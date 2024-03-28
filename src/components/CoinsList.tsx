'use client'
import { useCallback, useEffect, useState } from 'react'
import { getCoinsList } from '#/server-actions'
import { useRouter } from 'next/navigation'
import { Button, Column, Text, Row, Center } from '#/atoms'

type CoinsListResponse = Awaited<ReturnType<typeof getCoinsList>>

type CoinsListProps = {
  coinsListResponse: CoinsListResponse
  currentPage: number
  currentPerPage: number
}

const getUrlForPage = (page: number, perPage: number) => {
  const searchParams = new URLSearchParams()
  searchParams.set('page', page.toString())
  searchParams.set('perPage', perPage.toString())
  return `/?${searchParams.toString()}`
}

export const CoinsList: React.FC<CoinsListProps> = ({
  coinsListResponse,
  currentPage,
  currentPerPage,
}) => {
  const router = useRouter()

  const nextPage = currentPage + 1
  const previousPage = Math.max(currentPage - 1, 1)

  useEffect(() => {
    if (currentPage > 1) {
      router.prefetch(getUrlForPage(previousPage, currentPerPage))
    }

    router.prefetch(getUrlForPage(nextPage, currentPerPage))
  }, [currentPage, currentPerPage, nextPage, previousPage, router])

  const moveTo = useCallback(
    (page: number) => {
      const newPageUrl = getUrlForPage(page, currentPerPage)
      router.push(newPageUrl)
    },
    [currentPerPage, router],
  )

  if (!coinsListResponse.ok) {
    return (
      <Center h='50vh'>
        {coinsListResponse.errorMessage ? (
          <Text color='red'>{coinsListResponse.errorMessage}</Text>
        ) : (
          <Text color='red'>Something went wrong : (</Text>
        )}
      </Center>
    )
  }

  return (
    <Column>
      <div>{JSON.stringify(coinsListResponse.data, null, 2)}</div>
      <Row justifyContent='space-between'>
        <Button
          onClick={() => moveTo(previousPage)}
          disabled={currentPage === 1}
          text='<'
          maxW='60px'
        />
        <Text>{currentPage}</Text>
        <Button onClick={() => moveTo(nextPage)} text='>' maxW='60px' />
      </Row>
    </Column>
  )
}
