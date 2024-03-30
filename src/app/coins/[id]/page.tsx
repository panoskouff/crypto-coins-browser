import { Center, Text } from '#/atoms'
import { getCoin } from '#/server-actions'
import { SectionContainer } from '#/components/SectionContainer'
import { validateParams } from './helpers'
import { CoinDetails } from '#/components/CoinDetails'

type PageParams = {
  params: { id: string }
}

const CoinIdNotValid = () => (
  <Center h='50vh'>
    <Text color='red'>Coin id not valid</Text>
  </Center>
)

export default async function CoinDetailsPage({ params }: PageParams) {
  const { paramsAreValid, coinId } = validateParams(params)

  if (!paramsAreValid) {
    return <CoinIdNotValid />
  }

  const coinDetails = await getCoin({ coinId })

  if (!coinDetails.ok || !coinDetails.data) {
    return <CoinIdNotValid />
  }

  return (
    <SectionContainer>
      <CoinDetails coinInfo={coinDetails.data} />
    </SectionContainer>
  )
}
