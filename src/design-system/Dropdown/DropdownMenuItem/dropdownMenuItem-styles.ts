import { THEME_COLORS } from 'themes/theme-constants';

const styles = {
  itemContainer: {
    width: '125px',
    height: '30px',
    marginBottom: '10px',
    ':last-child': {
      marginBottom: '0',
    },
    display: 'flex',
    alignItems: 'center',
    color: THEME_COLORS.grey03,
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: THEME_COLORS.grey01,
      color: THEME_COLORS.light,
      '.MuiTypography-button': {
        color: THEME_COLORS.light,
      },
    },
    '&:active': {
      backgroundColor: THEME_COLORS.grey02,
      color: THEME_COLORS.light,
      '.MuiTypography-button': {
        color: THEME_COLORS.light,
      },
    },
  },
} as const;

export { styles };
