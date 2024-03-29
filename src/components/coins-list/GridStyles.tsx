import { Text, Center, Container, Padding } from '#/atoms'
import { styled } from '#/styled-system/jsx'
import { TextProps } from '#/atoms/Text'
import React from 'react'
import Link, { LinkProps } from 'next/link'

type ReactChildren = { children: React.ReactNode }

const StyledLink = styled(Link)

export const GridRowLink = ({
  children,
  href,
  ...rest
}: ReactChildren & LinkProps) => (
  <StyledLink
    href={href}
    display='contents'
    css={{
      '&:hover > div': {
        bgColor: '#f5f5f5',
      },
    }}
    {...rest}
  >
    {children}
  </StyledLink>
)

export const Grid = ({ children }: ReactChildren) => (
  <styled.div
    display='grid'
    gridTemplateColumns={{
      base: 'minmax(150px, auto) 1fr 1fr 1fr 1fr',
      lg: 'repeat(5, 1fr)',
    }}
    padding='20px'
    css={{ width: '100%', overflowX: 'auto' }}
  >
    {children}
  </styled.div>
)

type GridItemProps = ReactChildren & TextProps

export const GridItem: React.FC<GridItemProps> = ({ children, ...rest }) => {
  return (
    <Container borderBottom='1px solid #ededed'>
      <Center h='100%'>
        <Padding p='10px 16px'>
          <Text fontSize={16} textAlign='center' {...rest}>
            {children}
          </Text>
        </Padding>
      </Center>
    </Container>
  )
}

export const GridItemHeader: React.FC<GridItemProps> = ({
  children,
  ...rest
}) => (
  <GridItem fontWeight='bold' {...rest}>
    {children}
  </GridItem>
)
