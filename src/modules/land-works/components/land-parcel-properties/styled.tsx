import { Grid } from '@mui/material';
import { TypographyProps, styled } from '@mui/system';

import { Typography } from 'design-system';

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  display: 'block',
  textAlign: 'left',
  marginTop: '10px',

  '&.MuiTypography-h1': {
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '21px',
    color: 'var(--theme-light-color)',
  },
  '&.MuiTypography-h2': {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '21px',
    color: 'var(--theme-subtle-color)',
    //minWidth: '150px',
  },
  '&.MuiTypography-h3': {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '21px',
    color: 'var(--theme-light-color)',
  },
}));

export const GridStyled = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  background: 'var(--theme-card-color)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
  transition: '0.3s ease-in-out',
  padding: '30px',
  borderRadius: '20px',
  margin: '40px 0',
}));

export const GridStyledInnerContainer = styled(Grid)(() => ({
  background: 'var(--theme-modal-color)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  //boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
  boxSizing: 'border-box',
  borderRadius: '20px',
  padding: '20px',
}));
