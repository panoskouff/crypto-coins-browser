import { Column, Container, Flex, Padding, Space, Text } from '#/atoms'
import { formatValue } from '#/utils'

type CoinInfo = {
  id: string
  symbol: string
  name: string
  description?: string
  priceChange24h?: number
  priceChange7d?: number
  priceChange14d?: number
  priceChange30d?: number
  priceChange200d?: number
  priceChange1y?: number
}

export const CoinDetails: React.FC<{ coinInfo: CoinInfo }> = ({ coinInfo }) => {
  return (
    <Column gap='20px'>
      <Text textStyle='title'>{coinInfo.name}</Text>
      {coinInfo.description && (
        <Padding p='20px'>
          <Text dangerouslySetInnerHTML={{ __html: coinInfo.description }} />
        </Padding>
      )}
      <Text textStyle='title-secondary'>Price changes ($):</Text>
      <Container bg='#f5f5f5' borderRadius='4px'>
        <Padding p='20px'>
          <Flex gap='10px' flexDirection={{ base: 'column', md: 'row' }}>
            <Text>
              Last 24 hours:{' '}
              <Text fontWeight='bold'>
                {formatValue('%', coinInfo.priceChange24h)}
              </Text>
            </Text>
            <Text>
              Last 7 days:{' '}
              <Text fontWeight='bold'>
                {formatValue('%', coinInfo.priceChange7d)}
              </Text>
            </Text>
            <Text>
              Last 14 days:{' '}
              <Text fontWeight='bold'>
                {formatValue('%', coinInfo.priceChange14d)}
              </Text>
            </Text>
            <Text>
              Last 30 days:{' '}
              <Text fontWeight='bold'>
                {formatValue('%', coinInfo.priceChange30d)}
              </Text>
            </Text>
            <Text>
              Last 200 days:{' '}
              <Text fontWeight='bold'>
                {formatValue('%', coinInfo.priceChange200d)}
              </Text>
            </Text>
            <Text>
              Last year:{' '}
              <Text fontWeight='bold'>
                {formatValue('%', coinInfo.priceChange1y)}
              </Text>
            </Text>
          </Flex>
        </Padding>
      </Container>
      <Space h={0} />
    </Column>
  )
}
