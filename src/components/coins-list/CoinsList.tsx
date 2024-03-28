import React from 'react'
import { Button, Column, Text, Row, Center } from '#/atoms'
import { getCoinsList } from '#/server-actions'

type CoinsInfo = Awaited<ReturnType<typeof getCoinsList>>['data']

type CoinsListProps = {
  coins: CoinsInfo
  errorMessage: string
  currentPage: number
  nextPage: number
  previousPage: number
  moveTo: (page: number) => void
  isPreviousPageDisabled: boolean
}

export const CoinsList: React.FC<CoinsListProps> = ({
  coins,
  errorMessage,
  currentPage,
  nextPage,
  previousPage,
  isPreviousPageDisabled,
  moveTo,
}) => {
  if (errorMessage) {
    return (
      <Center h='50vh'>
        <Text color='red'>{errorMessage}</Text>
      </Center>
    )
  }

  return (
    <Column>
      {coins.map((coin) => (
        <Row key={coin.id} justifyContent='space-between'>
          <Text>
            {coin.name} ({coin.symbol}): ${coin.currentPrice}
          </Text>
        </Row>
      ))}
      <Row justifyContent='space-between'>
        <Button
          onClick={() => moveTo(previousPage)}
          disabled={isPreviousPageDisabled}
          text='<'
          maxW='60px'
        />
        <Text>Page {currentPage}</Text>
        <Button onClick={() => moveTo(nextPage)} text='>' maxW='60px' />
      </Row>
    </Column>
  )
}

export default CoinsList
