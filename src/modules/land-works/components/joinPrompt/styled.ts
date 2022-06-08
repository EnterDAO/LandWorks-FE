import { styled } from '@mui/material';

export const StyledRoot = styled('button')(() => ({
  border: 'none',
  minHeight: 75,
  minWidth: 75,
  background: '#5865F2',
  position: 'fixed',
  right: 0,
  top: '40%',
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  borderTopRightRadius: 20,
  cursor: 'pointer',
  transition: '0.2s linear width',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  color: 'var(--theme-light-color)',
  zIndex: 100,
  div: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '100%',
    p: {
      marginRight: 10,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontSize: 14,
      fontWeight: 500,
    },
  },
}));
