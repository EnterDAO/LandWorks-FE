import { TabsListUnstyled, tabsListUnstyledClasses } from '@mui/base';
import { styled } from '@mui/system';

import { THEME_COLORS } from '../../../themes/theme-constants';

const StyledTabsList = styled(TabsListUnstyled)({
  [`&.${tabsListUnstyledClasses.vertical}`]: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '222px',
    background: THEME_COLORS.darkBlue02,
    borderRadius: '15px',
    padding: '20px',
    '&>button': {
      marginBottom: '5px',
      ':last-child': {
        marginBottom: '0',
      },
    },
  },
  [`&.${tabsListUnstyledClasses.horizontal}`]: {
    '&>button': {
      marginRight: '10px',
      ':last-child': {
        marginRight: '0',
      },
    },
  },
});

export { StyledTabsList };
