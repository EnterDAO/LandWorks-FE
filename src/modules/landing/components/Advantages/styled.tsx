import { Box, Grid, styled } from '@mui/material';

export const StyledRoot = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',

  '& h2': {
    color: 'var(--theme-grey900-color)',
    margin: '15px 0',
    fontSize: 30,
  },
}));

export const ButtonRaw = styled(Grid)(() => ({
  display: 'flex',
  gap: 10,
  marginBottom: 45,
}));

export const StyledText = styled('p')(() => ({
  maxWidth: 200,
  textDecoration: 'none',
  fontSize: 12,
  fontWeight: 'bold',
  color: 'var(--theme-accent-color)',
}));

export const StyledSubtitle = styled('p')(() => ({
  color: 'var(--theme-subtle-color)',
  margin: 0,
  fontWeight: 'normal',
  fontSize: 16,
}));

export const ImageWrapper = styled(Grid)(() => ({
  position: 'relative',
  '& img': {
    width: 900,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export const StyledBox = styled(Box)(() => ({
  height: 80,
  width: 80,
  borderRadius: 20,
  border: '3px solid #27273A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 28,

  '& svg': {
    height: 24,
    width: 24,
  },
  '& button': {
    cursor: 'default',
    pointerEvents: 'none',
  },
}));
