import { styled } from '@mui/material';

export const NotificationButton = styled('div')(() => ({
  padding: '10px',
  backgroundColor: 'var(--theme-card-color)',
  marginRight: '15px',
  borderRadius: '10px',
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));
