import { BUTTON_2_STYLES, THEME_COLORS, THEME_FONT_FAMILY } from './theme-constants';

export default {
  fontFamily: THEME_FONT_FAMILY,
  h1: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '40px',
    lineHeight: '60px',
    color: THEME_COLORS.light,
  },
  h2: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '45px',
    color: THEME_COLORS.light,
  },
  h3: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '37px',
    color: THEME_COLORS.light,
  },
  h4: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '27px',
    color: THEME_COLORS.light,
  },
  subtitle1: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '27px',
    color: THEME_COLORS.grey03,
  },
  body1: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    color: THEME_COLORS.grey03,
  },
  body2: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '18px',
    color: THEME_COLORS.grey02,
  },
  button: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'initial',
    color: THEME_COLORS.light,
  },
  caption: {
    ...BUTTON_2_STYLES,
    color: THEME_COLORS.light,
  },
} as const;
