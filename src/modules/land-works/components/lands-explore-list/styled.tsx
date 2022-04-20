import { Grid } from '@mui/material';
import { styled } from '@mui/system';

export const LandsSearchBarWrapperStyled = styled('div')(() => ({
  marginBottom: '1rem',
}));

export const StyledButton = styled('button')(() => ({
  padding: '10px',
  background: 'var(--theme-grey200-color)',
  display: 'flex',
  borderRadius: '10px',
  margin: '0 5px',
  cursor: 'pointer',
  '&:hover': {
    border: '1px solid white',
    boxShadow: '0 0 3px white',
    path: {
      fill: 'white',
    },
  },
  '&:disabled': {
    path: {
      fill: '#666672',
    },
    cursor: 'default',
    '&:hover': {
      border: '1px solid transparent',
      boxShadow: 'none',
      path: {
        fill: '#666672',
      },
    },
  },
}));

export const StyledRow = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '20px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const StyledText = styled('span')(() => ({
  color: 'white',
}));

export const StyledGrid = styled(Grid)(() => ({
  '&.MuiGrid-grid-xl-3': {
    ['@media (min-aspect-ratio: 16/9)']: {
      maxWidth: '20%',
    },
  },
}));
