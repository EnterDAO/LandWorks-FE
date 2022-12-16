import { createTheme } from '@mui/material/styles';

import typographyStyles from './typography-styles';

import { THEME_SPACING_BASE } from './theme-constants';

const appTheme = createTheme({
  spacing: THEME_SPACING_BASE,
  typography: typographyStyles,
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
        },
        label: {
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '21px',
          color: 'var(--theme-grey900-color)',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1230,
      '2xl': 1440,
      xxl: 1440,
      '3xl': 1600,
    },
  },
});

export default appTheme;
