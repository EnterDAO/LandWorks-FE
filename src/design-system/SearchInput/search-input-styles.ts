import { inputUnstyledClasses } from '@mui/base/InputUnstyled';

import { THEME_COLORS } from '../../themes/theme-constants';

const searchInputStyles = {
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    height: '60px',
    color: THEME_COLORS.grey03,
    background: THEME_COLORS.darkBlue02,
    transition: 'background 300ms ease-in-out',
    borderRadius: '10px',
    [`& .${inputUnstyledClasses.root}`]: {
      background: 'transparent',
    },
    [`& .${inputUnstyledClasses.input}`]: {
      paddingLeft: 0,
    },
  },
  searchIconBox: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60px',
    height: '100%',
  },
  collapseEl: {
    '.MuiInput-root': {
      width: '440px',
      border: 'none',
    },
  },
  searchBoxExpanded: {
    background: THEME_COLORS.grey01,
  },
} as const;

export { searchInputStyles };
