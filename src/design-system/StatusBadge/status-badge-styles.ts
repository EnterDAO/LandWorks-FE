import { SystemStyleObject } from '@mui/system';

import { THEME_COLORS } from '../../themes/theme-constants';

export const statusBadgeRootStyles: SystemStyleObject = {
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '100px',
  height: '31px',
  padding: '0 10px',
  borderRadius: '15px',
  textTransform: 'uppercase',
  '&.type-info': {
    color: THEME_COLORS.accentBlue,
    '&::before': {
      backgroundColor: THEME_COLORS.accentBlue,
    },
  },
  '&.type-success': {
    color: THEME_COLORS.green,
    '&::before': {
      backgroundColor: THEME_COLORS.green,
    },
  },
  '&.type-danger': {
    color: THEME_COLORS.red,
    '&::before': {
      backgroundColor: THEME_COLORS.red,
    },
  },
  '&::before': {
    content: '" "',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    opacity: 0.2,
  },
};
