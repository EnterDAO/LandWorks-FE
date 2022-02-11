import { MenuItem, styled } from '@mui/material';
import { SystemStyleObject } from '@mui/system';

import { THEME_COLORS } from 'themes/theme-constants';

export const menuPaperStyles: SystemStyleObject = {
  mt: 2,
  borderRadius: '12px',
  padding: 4,
  bgcolor: THEME_COLORS.grey01,
  width: 360,
};

export const MultiSelectItem = styled(MenuItem)`
  padding: 0;
`;

export const menuListStyles: SystemStyleObject = {
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 2,
};
