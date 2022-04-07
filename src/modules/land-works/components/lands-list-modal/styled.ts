import { styled } from '@mui/material';

export const ShareLink = styled('a')(() => ({
  fontSize: '14px',
  fontWeight: '500',
  textTransform: 'uppercase',
  color: 'var(--theme-light-color)',
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center',
  '& span': {
    marginLeft: '10px',
  },
}));
