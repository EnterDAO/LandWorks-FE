import { styled } from '@mui/system';

import { Box } from 'design-system';

export const RootStyled = styled(Box)(() => ({
  display: 'block',
  width: 'auto',
}));

export const BottomBoxStyled = styled(Box)(() => ({
  display: 'block',
  fontSize: '12px',
  lineHeight: '18px',
  color: 'var(--theme-subtle-color)',
  '& > strong': {
    color: 'var(--theme-primary-color)',
  },
}));
