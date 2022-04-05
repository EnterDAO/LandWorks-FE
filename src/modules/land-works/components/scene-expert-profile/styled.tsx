import { Divider, DividerProps, Grid } from '@mui/material';
import { BoxProps, GridProps, TypographyProps, styled } from '@mui/system';

import { Box, Typography } from 'design-system';

export const CardContainer = styled(Box)<BoxProps>(() => ({
  textAlign: 'center',
  padding: '15px',
  backgroundColor: 'var(--theme-card-color)',
  borderRadius: '20px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-evenly',
}));

export const AvatarContainer = styled(Grid)<GridProps>(() => ({
  width: '100px',
  height: '100px',
  border: '2px solid white',
  backgroundColor: 'var(--theme-modal-color)',
  boxShadow: '0 0 3px 2px #757575',
  borderRadius: '50%',
  margin: '-80px 0 0 35px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const DividerStyled = styled(Divider)<DividerProps>(() => ({
  '&.MuiDivider-root': {
    backgroundColor: 'var(--theme-modal-color)',
    width: '100%',
    margin: '26px 0',
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
  textAlign: 'left',
  '&.MuiTypography-h5': {
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '21px',
    color: 'var(--theme-grey700-color)',
    marginBottom: '20px',
  },
  '&.MuiTypography-h4': {
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '21px',
    color: 'var(--theme-light-color)',
  },
  '&.MuiTypography-h3': {
    fontSize: '30px',
    fontWeight: '700',
    lineHeight: '45px',
    color: 'var(--theme-light-color)',
  },
  '&.MuiTypography-body1': {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '21px',
    color: 'var(--theme-subtle-color)',
  },
}));

export const PriceContainer = styled(Box)<BoxProps>(() => ({
  width: '100px',
  height: '40px',
  padding: '0 20px',
  backgroundColor: 'var(--theme-modal-color)',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginBottom: '20px',
}));

export const BlueBoxContainer = styled(Box)<BoxProps>(() => ({
  padding: '10px 16px',
  backgroundColor: '#5D8FF033',
  borderRadius: '10px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledBox = styled(Grid)<GridProps>(() => ({
  display: 'flex',
  textAlign: 'left',
  marginBottom: '15px',
}));
