import { Grid } from '@mui/material';
import { styled } from '@mui/system';

export const GridStyled = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  background: 'none',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
  transition: '0.3s ease-in-out',
}));

export const GridStyledInnerContainer = styled(Grid)(() => ({
  background: 'var(--theme-modal-color)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
  boxSizing: 'border-box',
  borderRadius: '20px',
  padding: '25px',
}));
