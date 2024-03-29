import { Center, Text } from '#/atoms'
import { getCoin } from '#/server-actions'
import { SectionContainer } from '#/components/SectionContainer'
import { validateParams } from './helpers'
import { CoinDetails } from '#/components/CoinDetails'

type PageParams = {
  params: { id: string }
}

export default async function CoinDetailsPage({ params }: PageParams) {
  const { paramsAreValid, coinId } = validateParams(params)

  if (!paramsAreValid) {
    return (
      <Center h='50vh'>
        <Text color='red'>Coin id not valid</Text>
      </Center>
    )
  }

  const coinDetails = await getCoin({ coinId })

  if (!coinDetails.ok || !coinDetails.data) {
    console.log(coinDetails.errorMessage)
    return (
      <Center h='50vh'>
        <Text color='red'>Coin id not valid</Text>
      </Center>
    )
  }

  return (
    <SectionContainer>
      <CoinDetails coinInfo={coinDetails.data} />
    </SectionContainer>
  )
}
