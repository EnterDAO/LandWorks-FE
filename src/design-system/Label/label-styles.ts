import { styled } from '@mui/material';

import { THEME_COLORS } from 'themes/theme-constants';

export const LabelRoot = styled('p')<{ rounded?: boolean }>(({ rounded }) => ({
  height: 37,
  borderRadius: rounded ? 19 : '0 19px 19px 0',
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 16px',
  background: THEME_COLORS.light,
  boxShadow: '0px 3px 20px rgba(63, 63, 63, 0.6)',
  color: THEME_COLORS.darkBlue01,
  gap: 5,
  margin: 0,
}));

export const LabelActiveIndicator = styled('div')({
  width: 8,
  height: 8,
  backgroundColor: THEME_COLORS.red,
  borderRadius: '50%',
});
