import { BUTTON_2_STYLES, THEME_FONT_FAMILY } from './theme-constants';

export default {
  fontFamily: THEME_FONT_FAMILY,
  h1: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '40px',
    lineHeight: '60px',
    color: 'var(--theme-grey900-color)',
  },
  h2: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '45px',
    color: 'var(--theme-grey900-color)',
  },
  h3: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '37px',
    color: 'var(--theme-grey900-color)',
  },
  h4: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '27px',
    color: 'var(--theme-grey900-color)',
  },
  subtitle1: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '27px',
    color: 'var(--theme-subtle-color)',
  },
  body1: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    color: 'var(--theme-subtle-color)',
  },
  body2: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '18px',
    color: 'var(--theme-grey700-color)',
  },
  button: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'initial',
    color: 'var(--theme-grey900-color)',
  },
  caption: {
    ...BUTTON_2_STYLES,
    color: 'var(--theme-grey900-color)',
  },
} as const;
