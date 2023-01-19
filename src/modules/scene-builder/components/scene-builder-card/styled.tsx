import { BoxProps, styled } from '@mui/system';

import { Box } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

export const TypeChip = styled(Box)<BoxProps>(() => ({
  textTransform: 'uppercase',
  minWidth: 79,
  minHeight: 26,
  textAlign: 'center',
  padding: 4,
  backgroundColor: 'var(--theme-grey200-color)',
  borderRadius: '6px',
  color: THEME_COLORS.grey03,
  fontSize: '12px',
  fontWeight: '600',
  lineHeight: 1.5,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
