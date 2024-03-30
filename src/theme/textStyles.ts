import { defineTextStyles } from '@pandacss/dev'

type TextStyles = Parameters<typeof defineTextStyles>[0]

const styles: TextStyles = {
  base: {
    value: {
      fontWeight: 400,
      fontFamily: 'mulish',
    },
  },
}

export const textStyles = defineTextStyles({
  inherit: {
    description:
      'An inherit text style to be used inside text wrapper components',
    value: {
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      letterSpacing: 'inherit',
      textDecoration: 'inherit',
      textTransform: 'inherit',
    },
  },
  body: {
    description: 'The body text style',
    value: {
      ...styles.base.value,
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  title: {
    description: 'The title text style',
    value: {
      ...styles.base.value,
      lineHeight: '120%',
      fontSize: { base: '36px', sm: '56px' },
    },
  },
  'title-secondary': {
    description: 'The secondary title text style',
    value: {
      ...styles.base.value,
      lineHeight: '120%',
      fontSize: { base: '24px', sm: '36px' },
    },
  },
  button: {
    description: 'The button text style',
    value: {
      ...styles.base.value,
      fontSize: '14px',
      lineHeight: '110%',
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    },
  },
})
