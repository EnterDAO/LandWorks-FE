import { styled } from '@mui/system';

import { THEME_COLORS } from 'themes/theme-constants';

export const TagRoot = styled('span')`
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 7px;
  border-radius: 5px;
  user-select: none;
  background-color: ${THEME_COLORS.grey01};
  text-transform: uppercase;
`;
