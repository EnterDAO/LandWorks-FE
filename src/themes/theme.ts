import { alpha, createTheme } from '@mui/material/styles';

import typographyStyles from './typography-styles';

import { THEME_SPACING_BASE } from './theme-constants';

const appTheme = createTheme({
  palette: {
    primary: {
      main: '#5D8FF0',
    },
    text: {
      primary: '#f8f8ff',
      secondary: '#B9B9D3',
      disabled: '#68687B',
    },
    background: {
      paper: '#27273A',
    },
  },
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
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          borderRadius: 10,
        },
      },
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        button: {
          color: '#f8f8ff',
          '&:disabled': {
            color: alpha('#f8f8ff', 0.3),
          },
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        switchViewButton: {
          color: '#f8f8ff',
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
