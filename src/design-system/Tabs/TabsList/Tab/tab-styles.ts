import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { styled } from '@mui/system';

import { THEME_COLORS } from '../../../../themes/theme-constants';

const StyledTab = styled(TabUnstyled)({
  minWidth: '121px',
  height: '45px',
  padding: '12px 25px',
  background: 'transparent',
  borderRadius: '8px',
  border: 'none',
  color: THEME_COLORS.grey02,
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    background: THEME_COLORS.grey01,
  },
  [`&.${tabUnstyledClasses.selected}`]: {
    background: THEME_COLORS.grey01,
    'span.MuiTypography-button': {
      color: THEME_COLORS.light,
    },
  },
});

const notificationsCountStyles = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '18px',
  height: '18px',
  background: THEME_COLORS.red,
  borderRadius: '50%',
  fontSize: '10px',
  lineHeight: '15px',
  color: THEME_COLORS.light,
};

export { StyledTab, notificationsCountStyles };
