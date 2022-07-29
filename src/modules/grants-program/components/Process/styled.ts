import { styled } from '@mui/material';

import { Typography } from 'design-system';

export const StyledList = styled('ol')({
  paddingLeft: 20,
});

export const NumberedList = styled('ol')({
  marginTop: 65,
  paddingLeft: 0,
  marginBottom: 65,
  listStyle: 'none',
  counterReset: 'item',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 20,
  '& li': {
    counterIncrement: 'item',
    display: 'flex',
    position: 'relative',

    '&:before': {
      marginRight: 15,
      content: 'counter(item)',
      fontSize: 14,
      lineHeight: '35px',
      fontWeight: 'bold',
      background: 'white',
      minWidth: 34,
      height: 34,
      borderRadius: '50%',
      display: 'inline-block',
      textAlign: 'center',
      color: 'black',
      zIndex: 1,
    },
    '&:not(:last-child):after': {
      content: "' '",
      position: 'absolute',
      top: 35,
      left: 15,
      width: 5,
      height: '100%',
      background: '#27273A',
      borderRadius: 5,
    },
  },
  '@media (max-width: 400px)': {
    maxWidth: 330,
  },
});

export const StyledImage = styled('img')({
  width: '100%',
  marginBottom: 130,
  '@media (max-width: 400px)': {
    marginBottom: 60,
  },
});

export const StyledTypography = styled(Typography)({
  '@media (max-width: 400px)': {
    maxWidth: 330,
    wordBreak: 'break-word',
  },
});
