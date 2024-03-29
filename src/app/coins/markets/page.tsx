import { Space, Text } from '#/atoms'
import { CoinsList } from '#/components/coins-list'
import { validateSearchParams } from './helpers'
import { ServerSearchParams } from '#/types'
import { redirect } from 'next/navigation'
import { getCoinsList } from '#/server-actions'
import { SectionContainer } from '#/components/SectionContainer'

type PageParams = {
  searchParams: ServerSearchParams
}

const thisRouteUrl = '/coins/markets'

export default async function Home({ searchParams }: PageParams) {
  const { paramsAreValid: searchParamsAreValid, validatedParams } =
    validateSearchParams({
      searchParams,
      defaultValue: { page: 1, perPage: 10 },
    })

  if (!searchParamsAreValid) {
    redirect(
      `${thisRouteUrl}/?page=${validatedParams.page}&perPage=${validatedParams.perPage}`,
    )
  }

  const coinsList = await getCoinsList(validatedParams)

  return (
    <SectionContainer overflow='auto'>
      <Text textStyle='title'>Coin List</Text>
      <Space h={10} />
      <CoinsList
        coinsListResponse={coinsList}
        currentPage={validatedParams.page}
        currentPerPage={validatedParams.perPage}
        baseUrl={thisRouteUrl}
        defaultErrorMessage='Something went wrong : ('
      />
    </SectionContainer>
  )
}
