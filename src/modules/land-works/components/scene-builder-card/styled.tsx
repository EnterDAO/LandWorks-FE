import { Divider, DividerProps, Grid } from '@mui/material';
import { BoxProps, GridProps, TypographyProps, styled } from '@mui/system';

import { Box, Typography } from 'design-system';

export const CardContainer = styled(Box)<BoxProps>(() => ({
  height: '435px',
  textAlign: 'center',
  padding: '20px',
  backgroundColor: 'var(--theme-card-color)',
  borderRadius: '20px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid var(--theme-card-color)',
  '&:hover': {
    border: '1px solid var(--theme-light-color)',
  },
}));

export const AvatarContainer = styled(Grid)<GridProps>(() => ({
  width: '100px',
  height: '100px',
  border: '2px solid white',
  backgroundColor: 'var(--theme-modal-color)',
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
    backgroundColor: 'var(--theme-modal-color)',
    width: '100%',
  },
}));

export const TypeChip = styled(Box)<BoxProps>(() => ({
  textTransform: 'uppercase',
  width: '79px',
  height: '26px',
  textAlign: 'center',
  padding: '4px 6px',
  backgroundColor: 'var(--theme-modal-color)',
  borderRadius: '6px',
  color: 'var(--theme-subtle-color)',
  fontSize: '12px',
  fontWeight: '600',
}));

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  display: 'block',
  width: '100%',
  textAlign: 'center',
  '&.MuiTypography-h4': {
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '27px',
    color: 'var(--theme-light-color)',
  },
  '&.MuiTypography-h5': {
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '18px',
    color: 'var(--theme-grey700-color)',
  },
  '&.MuiTypography-body1': {
    fontSize: '14px',
    fontWeight: '4400',
    lineHeight: '21px',
    color: 'var(--theme-subtle-color)',
  },
}));
