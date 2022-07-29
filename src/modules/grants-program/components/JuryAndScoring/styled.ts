import { styled } from '@mui/system';

export const TeamIcon = styled('div')({
  width: 120,
  height: 120,
  borderRadius: '50%',
  background: 'linear-gradient(83.81deg, #AC2CCB -19.8%, #DD3DCB 22%, #EF9C92 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 400px)': {
    width: 80,
    minWidth: 80,
    height: 80,
  },
});

export const ImageWrapper = styled('div')({
  height: 110,
  width: 110,
  borderRadius: '50%',
  border: '7px solid #161622',
  backgroundColor: '#27273A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 400px)': {
    border: '4px solid #161622',
    width: 68,
    height: 68,
    '& svg': {
      width: 31,
      height: 31,
    },
  },
});

export const TeamDescription = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 20,
  '& h1': {
    color: 'var(--theme-grey900-color)',
    fontSize: 16,
  },
});
