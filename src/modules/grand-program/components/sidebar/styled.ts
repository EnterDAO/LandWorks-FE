import { styled } from '@mui/system';

export const StyledRoot = styled('div')({
  minWidth: '200px',
  height: '250px',
  position: 'sticky',
  top: 170,
  borderRight: '1px solid var(--theme-grey400-color)',

  '& h1': {
    fontSize: 18,
    color: 'var(--theme-grey900-color)',
    marginBottom: 20,
  },
  '& p': {
    fontSize: 14,
  },
  '@media (max-width: 400px)': {
    zIndex: 500,
    border: 'none',
    position: 'fixed',
    bottom: -185,
    top: 'auto',
    left: 0,
    background: '#27273A',
    width: '100%',
    padding: '20px 25px',
    '& button': {
      display: 'none',
    },
    '& p': {
      marginBottom: 20,
    },
  },
});

export const Tab = styled('p')({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',

  '& img': {
    marginRight: 10,
  },

  '& svg': {
    marginRight: 10,
  },
});

export const ExpandButton = styled('p')({
  padding: 8,
  background: '#3A3A4E',
  borderRadius: 8,
  '@media (max-width: 400px)': {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
