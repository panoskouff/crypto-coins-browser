import React from 'react'
import { getCoinsList } from '#/server-actions'
import { Button, Column, Text, Row, Center } from '#/atoms'
import { Grid, GridItem, GridItemHeader, GridRowLink } from './GridStyles'
import { formatValue } from '#/utils'

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
    <Column gap='20px'>
      <Grid>
        <GridItemHeader>Coin</GridItemHeader>
        <GridItemHeader>Current Price</GridItemHeader>
        <GridItemHeader>24h High</GridItemHeader>
        <GridItemHeader>24h Low</GridItemHeader>
        <GridItemHeader>24h Change</GridItemHeader>
        {coins.map((coin) => (
          <GridRowLink href={`/coin/${coin.name}`} key={coin.id}>
            <GridItem color='#343434'>
              {coin.name}{' '}
              <Text fontWeight='bold' color='inherit'>
                ({coin.symbol})
              </Text>
            </GridItem>
            <GridItem>{formatValue('$', coin.currentPrice)}</GridItem>
            <GridItem>{formatValue('$', coin.high24h)}</GridItem>
            <GridItem>{formatValue('$', coin.low24h)}</GridItem>
            <GridItem
              color={coin.priceChangePercentage24h >= 0 ? 'green' : 'red'}
            >
              {formatValue('%', coin.priceChangePercentage24h)}
            </GridItem>
          </GridRowLink>
        ))}
      </Grid>
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
