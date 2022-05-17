import { Box, BoxProps, Grid, GridProps, styled } from '@mui/material';

export const StyledGrid = styled(Grid)<GridProps>(() => ({
  display: 'flex',
  flexDirection: 'row',
  marginLeft: 10,
  margin: 2,
}));

export const StyledBox = styled(Box)<BoxProps>(() => ({
  marginLeft: 5,
  background: '#27273A',
  width: 26,
  height: 26,
  borderRadius: 5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '& svg': {
    width: 16,
    height: 16,
  },
  '& path': {
    fill: 'white',
  },
  '&:hover': {
    background: '#3C3C4E',
  },
}));
