import { Grid } from '@mui/material';
import { TypographyProps, styled } from '@mui/system';

import { Typography } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  display: 'block',
  textAlign: 'left',
  '&.MuiTypography-h1': {
    textTransform: 'uppercase',
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '30px',
    color: 'var(--theme-light-color)',
  },
  '&.MuiTypography-h2': {
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '21px',
    color: 'var(--theme-light-color)',
  },
  '&.MuiTypography-h3': {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '21px',
    color: 'var(--theme-subtle-color)',
    width: '200px',
    marginTop: '10px',
  },
  '&.MuiTypography-h4': {
    width: '100%',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '21px',
    marginTop: '10px',
    color: 'var(--theme-light-color)',
  },
}));

export const GridStyled = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'var(--theme-card-color)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
  transition: '0.3s ease-in-out',
  padding: '30px',
  borderRadius: '20px',
  margin: '40px 0',
}));

export const GridItem = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

export const GridFlexed = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

export const GridStyledInnerContainer = styled(Grid)(() => ({
  background: 'var(--theme-modal-color)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
  borderRadius: '20px',
  padding: '20px',
  height: '185px',
}));

export const StyledLink = styled('a')(() => ({
  width: '100%',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '21px',
  marginTop: '10px',
  color: THEME_COLORS.accentBlue,
}));
