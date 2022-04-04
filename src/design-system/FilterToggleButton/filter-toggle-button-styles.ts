import { styled } from '@mui/material';
import { SystemStyleObject } from '@mui/system';

import { THEME_COLORS } from 'themes/theme-constants';

export const Badge = styled('span')`
  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: ${THEME_COLORS.accentBlue};
`;

export const ButtonInner = styled('span')`
  display: inline-block;
  position: relative;
  transition: all 0.2s ease;
`;

export const iconStyles: SystemStyleObject = {
  verticalAlign: 'text-bottom',
  mr: 2,
};

export const badgeStyles: SystemStyleObject = {
  ml: 2,
  transition: 'all 0.2s ease',
};
