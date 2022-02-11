import { SystemStyleObject } from '@mui/system';

import { THEME_COLORS } from 'themes/theme-constants';

export const filterTagRootStyles: SystemStyleObject = {
  display: 'inline-flex',
  alignItems: 'center',
  height: '33px',
  padding: '0 10px',
  borderRadius: '5px',
  backgroundColor: THEME_COLORS.grey04,
  userSelect: 'none',
  transition: 'all 0.1s ease',
  gap: 1,
};

export const filterTagIconStyles: SystemStyleObject = {
  display: 'inline-flex',
  alignItems: 'center',
  color: THEME_COLORS.grey03,
  transition: 'all 0.2s ease',
  opacity: 0,
};

export const filterTagCheckedIconStyles: SystemStyleObject = {
  color: THEME_COLORS.light,
  opacity: 1,
};

export const filterTagLabelStyles: SystemStyleObject = {
  transition: 'all 0.2s ease',
  transform: 'translateX(-10.5px)',
  color: THEME_COLORS.grey03,
};

export const filterTagCheckedLabelStyles: SystemStyleObject = {
  transform: 'translateX(0)',
  color: THEME_COLORS.light,
};
