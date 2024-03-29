export const formatValue = (
  symbol: '$' | '%',
  value?: string | number | null,
) => {
  if (!value) {
    return '-'
  }

  if (symbol === '$') {
    return `${symbol}${value}`
  } else {
    return `${value}${symbol}`
  }
}
