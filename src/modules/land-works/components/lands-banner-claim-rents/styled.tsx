import { styled } from '@mui/system';

import { Box } from 'design-system';

export const RootStyled = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(93, 143, 240, 0.2)',
  padding: '18px 20px',
  borderRadius: '10px',
  marginTop: 15,
}));

export const TitleStyled = styled('div')(() => ({}));

export const BoxStyled = styled(Box)(() => ({
  marginLeft: '20px',
  '& h3': {
    color: 'var(--theme-grey900-color)',
  },
}));
