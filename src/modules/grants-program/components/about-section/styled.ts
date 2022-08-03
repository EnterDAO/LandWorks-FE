import { Box, Grid, styled } from '@mui/material';

export const TiersRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 20,
  marginBottom: 30,
  '@media (max-width: 400px)': {
    flexDirection: 'column',
    alignItems: 'start',
  },
});

export const Tier = styled('div')({
  border: '3px solid #27273A',
  padding: 15,
  borderRadius: 20,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  '& svg': {
    flexShrink: 0,
    width: 56,
    marginRight: 5,
  },
  '& path': {
    fill: '#fff',
  },
});

export const StyledBox = styled(Box)({
  marginLeft: 10,
  '& h1': {
    color: 'var(--theme-grey900-color)',
    fontSize: 18,
    lineHeight: '27px',
  },
  '@media (max-width: 400px)': {
    '& h1': {
      fontSize: 14,
      lineHeight: '27px',
      width: 245,
    },
    '& p': {
      fonstSize: 14,
      width: '245px !important',
    },
  },
});

export const StyledGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  '@media (max-width: 400px)': {
    flexDirection: 'column',
  },
});
