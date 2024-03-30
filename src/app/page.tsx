import { SectionContainer } from '#/components/SectionContainer'
import { Column, Padding, Text, TextLink } from '#/atoms'

export default async function Home() {
  return (
    <SectionContainer>
      <Text textStyle='title-secondary' fontWeight='bold'>
        Available Routes
      </Text>
      <Padding p='20px'>
        <Column gap='20px'>
          <Text>
            1. <TextLink href='/coins/markets'>/coins/markets</TextLink>
          </Text>
          <Text>
            2.{' '}
            <Text fontWeight='bold'>
              /coins/[id] eg.{' '}
              <TextLink href='/coins/bitcoin'>/coins/bitcoin</TextLink>
            </Text>
          </Text>
        </Column>
      </Padding>
    </SectionContainer>
  )
}
