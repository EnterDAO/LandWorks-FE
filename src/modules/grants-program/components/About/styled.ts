import { Box, Grid, styled } from '@mui/material';

export const StyledRoot = styled('div')({
  marginBottom: 130,
  '@media (max-width: 400px)': {
    marginBottom: 60,

    '& p': {
      width: 340,
    },
  },
});

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
  '& path': {
    fill: '#fff',
  },
  '@media (max-width: 400px)': {
    padding: 10,
    width: 320,
    '& svg': {
      minWidth: 36,
    },
    '& p': {
      width: 180,
    },
  },
});

export const CategoriesGrid = styled(Grid)({
  width: '100%',
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
