import { Slider, styled } from '@mui/material';

import { Grid, Typography } from 'design-system';

export const StyledRoot = styled('div')(() => ({
  maxHeight: '75vh',
  overflow: 'auto',
  padding: '0 10px',
  '@media (min-height: 1200px)': {
    maxHeight: '700px',
  },
}));

export const StyledTitle = styled(Typography)(() => ({
  fontSize: 25,
  fontWeight: 'bold',
  color: 'var(--theme-light-color)',
  paddingBottom: 30,
  borderBottom: '2px solid var(--theme-modal-color)',
}));

export const StyledSubtitle = styled(Typography)(() => ({
  fontSize: 18,
  fontWeight: 'bold',
  color: 'var(--theme-light-color)',

  '& span': {
    color: 'var(--theme-subtle-color)',
    fontSize: 14,
    fontWeight: 'normal',
    marginLeft: 5,
  },
}));

export const StyledGrid = styled(Grid)(() => ({
  paddingTop: 20,
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderBottom: '2px solid var(--theme-modal-color)',
  paddingBottom: 20,
  '& button:disabled': {
    background: 'none',
    '&:before': {
      background: 'none',
    },
  },
}));

export const CheckboxContainer = styled(Grid)(() => ({
  cursor: 'pointer',
  marginTop: 20,
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'flex-start',
  '& h1': {
    fontSize: 14,
    fontWeight: 'samibold',
    color: 'var(--theme-light-color)',
  },

  '& p': {
    textAlign: 'start',
  },
}));

export const StyledSlider = styled(Slider)(() => ({
  marginTop: 20,
  width: '90%',
  color: 'var(--theme-accent-color)',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: 'var(--theme-modal-color)',
    border: '1px solid var(--theme-subtle-color)',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.06)',
    },
    '& .bar': {
      height: 9,
      width: 1,
      backgroundColor: 'var(--theme-subtle-color)',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: 'var(--theme-subtle-color)',
    height: 3,
  },
}));

export const ButtonRow = styled(Grid)(() => ({
  paddingTop: 40,
}));
