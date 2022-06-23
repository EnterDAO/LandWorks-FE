import { styled } from '@mui/material';

export const StyledRoot = styled('div')(() => ({
  marginTop: 190,
  marginBottom: 150,
  width: '100%',
  border: '5px solid #27273A',
  borderRadius: 50,
  background: '#1E1E2E',
  height: 563,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '& div': {
    paddingLeft: 100,
    display: 'flex',
    flexDirection: 'column',

    '& h1': {
      marginTop: 10,
      maxWidth: 384,
      fontSize: 40,
      color: 'var(--theme-light-color)',
      lineHeight: '60px',
    },
    '& p': {
      maxWidth: 290,
      marginBottom: 40,
    },
  },
}));
