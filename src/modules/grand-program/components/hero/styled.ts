import { styled } from '@mui/system';

export const StyledRoot = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  '@media (max-width: 400px)': {
    flexDirection: 'column-reverse',
  },
});

export const Image = styled('img')({
  width: 'auto',
  height: '540px',

  '@media (max-width: 400px)': {
    height: '280px',
  },
});

export const LeftSide = styled('div')({
  marginTop: 60,
  '& h2': {
    color: 'var(--theme-primary-color)',
    fontSize: 60,
    background: 'linear-gradient(83.81deg, #AC2CCB -19.8%, #DD3DCB 22%, #EF9C92 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 5px #dd3dca42',
    lineHeight: '85px',

    '@media (max-width: 400px)': {
      fontSize: 25,
      lineHeight: '30px',
    },
  },
  '& h1': {
    marginBottom: 10,
    fontSize: 60,
    position: 'relative',
    color: 'var(--theme-grey900-color)',

    '@media (max-width: 400px)': {
      fontSize: 25,
    },
  },
});

export const Description = styled('div')({
  marginTop: 40,
  maxWidth: 540,
  fontSize: 18,
  lineHeight: '27px',
  marginBottom: 60,

  '& p': {
    marginTop: 20,
    color: 'var(--theme-grey900-color)',
  },
  '@media (max-width: 400px)': {
    maxWidth: 343,
  },
});
