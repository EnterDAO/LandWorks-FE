import { TypographyProps, styled } from '@mui/system';

import { Typography } from 'design-system';

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  display: 'block',
  width: '100%',
  textAlign: 'center',
  color: 'var(--theme-light-color)',
  '&.MuiTypography-h1': {
    fontSize: '40px',
    fontWeight: '700',
    lineHeight: '60px',
  },
  '&.MuiTypography-h4': {
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '27px',
  },
}));
