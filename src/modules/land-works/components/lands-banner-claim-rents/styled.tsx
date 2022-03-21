import { styled } from '@mui/system';

import { Box } from 'design-system';

export const RootStyled = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(93, 143, 240, 0.2)',
  padding: '18px 20px',
  borderRadius: '10px',
}));

export const SpanStyled = styled('span')(() => ({
  margin: '0 18px 0 13px',
}));
