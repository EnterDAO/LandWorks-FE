import { SystemStyleObject } from '@mui/system';

import { THEME_COLORS } from '../../themes/theme-constants';

export const backgroundContainerLightRootStyles: SystemStyleObject = {
  padding: '20px',
  background: THEME_COLORS.grey01,
  borderRadius: '20px',
};

export const backgroundContainerDarkRootStyles: SystemStyleObject = {
  padding: '10px 20px',
  background: THEME_COLORS.darkBlue02,
  borderRadius: '10px',
};
