import { Grid } from '@mui/material';
import { styled } from '@mui/system';

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
  boxSizing: 'border-box',
  borderRadius: '20px',
  padding: '25px',
}));
