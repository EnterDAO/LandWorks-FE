import { SystemStyleObject } from '@mui/system';

import { THEME_COLORS } from '../../themes/theme-constants';

export const transactionCardRootStyles: SystemStyleObject = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: '0px 10px',
  width: '100%',
  height: '57px',
  background: THEME_COLORS.grey01,
  borderRadius: '10px',
  border: 'unset',
  cursor: 'pointer',
};
