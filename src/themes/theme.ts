import { createTheme } from '@mui/material/styles';

import typographyStyles from './typography-styles';

import { THEME_COLORS, THEME_SPACING_BASE } from './theme-constants';

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
          color: THEME_COLORS.light,
        },
      },
    },
  },
});

export default appTheme;
