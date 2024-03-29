import { Space, Text } from '#/atoms'
import { CoinsList } from '#/components/coins-list'
import { getCoinsListMock } from '#/mocks/getCoinsListMock'
import { validateSearchParams } from './helpers'
import { ServerSearchParams } from '#/types'
import { redirect } from 'next/navigation'
import { getCoinsList } from '#/server-actions'
import { SectionContainer } from '#/components/SectionContainer'

type PageParams = {
  searchParams: ServerSearchParams
}

export default async function Home({ searchParams }: PageParams) {
  const { paramsAreValid: searchParamsAreValid, validatedParams } =
    validateSearchParams({
      searchParams,
      defaultValue: { page: 1, perPage: 10 },
    })

  if (!searchParamsAreValid) {
    redirect(
      `/?page=${validatedParams.page}&perPage=${validatedParams.perPage}`,
    )
  }

  // const coinsList = await getCoinsList(validatedParams)
  const coinsList = await getCoinsListMock(validatedParams)

  // console.log(coinsList.data)

  return (
    <SectionContainer overflow='auto'>
      <Text textStyle='title'>Coin List</Text>
      <Space h={10} />
      <CoinsList
        coinsListResponse={coinsList as any}
        currentPage={validatedParams.page}
        currentPerPage={validatedParams.perPage}
      />
    </SectionContainer>
  )
}
