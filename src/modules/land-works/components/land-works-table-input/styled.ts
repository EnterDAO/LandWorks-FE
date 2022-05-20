import { Grid, GridProps, styled } from '@mui/material';

export const StyledGrid = styled(Grid)<GridProps>(() => ({
  flexDirection: 'column',
  alignItems: 'center',
  width: '400px',
  '& label': {
    width: '100%',
    textAlign: 'initial',
    margin: '30px 0',
    '& p': {
      marginBottom: '8px',
    },
    '& > div': {
      width: '100%',
    },
  },
  '& .MuiTypography-subtitle2': {
    color: '#B9B9D3',
    marginTop: '10px',
    fontWeight: 'normal',
  },
}));
