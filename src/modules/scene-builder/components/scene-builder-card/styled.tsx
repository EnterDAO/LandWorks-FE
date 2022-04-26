import { Divider, DividerProps, Grid } from '@mui/material';
import { BoxProps, GridProps, TypographyProps, styled } from '@mui/system';

import { Box, Typography } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

export const CardContainer = styled(Box)<BoxProps>(() => ({
  height: '435px',
  textAlign: 'center',
  padding: '20px',
  backgroundColor: `${THEME_COLORS.darkBlue02}`,
  borderRadius: '20px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid ${THEME_COLORS.darkBlue02}`,
  '&:hover': {
    border: `1px solid ${THEME_COLORS.light}`,
  },
}));

export const AvatarContainer = styled(Grid)<GridProps>(() => ({
  width: '100px',
  height: '100px',
  border: '2px solid white',
  backgroundColor: THEME_COLORS.darkBlue02,
  boxShadow: '0 0 3px 1px #757575',
  borderRadius: '50%',
  marginTop: '-70px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const DividerStyled = styled(Divider)<DividerProps>(() => ({
  '&.MuiDivider-root': {
    backgroundColor: THEME_COLORS.darkBlue03,
    width: '100%',
  },
}));

export const TypeChip = styled(Box)<BoxProps>(() => ({
  textTransform: 'uppercase',
  width: '79px',
  textAlign: 'center',
  padding: '4px 6px',
  backgroundColor: THEME_COLORS.darkBlue02,
  borderRadius: '6px',
  color: THEME_COLORS.grey03,
  fontSize: '12px',
  fontWeight: '600',
}));

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  '&.MuiTypography-h4': {
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '27px',
    color: THEME_COLORS.light,
    textAlign: 'center',
    display: 'block',
    width: '100%',
  },
  '&.MuiTypography-h5': {
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '18px',
    color: THEME_COLORS.grey02,
    textAlign: 'center',
    display: 'block',
    width: '100%',
  },
  '&.MuiTypography-body1': {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '21px',
    color: THEME_COLORS.grey03,
    textAlign: 'center',
    display: 'block',
    width: '100%',
  },
  '&.MuiTypography-body2': {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '21px',
    color: THEME_COLORS.grey03,
    textAlign: 'left',
    display: 'inline',
    width: 'auto%',
  },
}));
