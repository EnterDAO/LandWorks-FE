import { styled } from '@mui/system';

import { Box } from 'design-system';

export const RootStyled = styled(Box)(() => ({
  display: 'block',
  width: 'auto',
  margin: '10px 0 12px 0',
}));

export const BottomBoxStyled = styled(Box)(() => ({
  display: 'block',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '22px 0',
  color: 'var(--theme-subtle-color)',
  '& > strong': {
    color: 'var(--theme-primary-color)',
  },
}));
