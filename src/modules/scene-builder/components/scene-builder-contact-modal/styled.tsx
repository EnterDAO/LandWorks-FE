import { TypographyProps, styled } from '@mui/system';

import { Typography } from 'design-system';

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  display: 'block',
  width: '400px',
  textAlign: 'center',
  '&.MuiTypography-h1': {
    fontSize: '25px',
    fontWeight: '700',
    lineHeight: '37.5px',
    color: 'var(--theme-light-color)',
    marginBottom: '20px',
  },
  '&.MuiTypography-h2': {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    color: 'var(--theme-subtle-color)',
  },
}));
