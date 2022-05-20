import { Grid, Typography, styled } from '@mui/material';
import { Box } from '@mui/system';

export const StyledGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxHeight: '35vh',
  overflow: 'auto',
}));

export const WarningContainer = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundColor: 'rgba(92, 141, 240, 0.2)',
  padding: '5px 16px',
  borderRadius: '10px',
  marginBottom: '20px',

  '& svg': {
    color: 'var(--theme-accent-color)',
    height: '24px',
    width: '24px',
  },
}));

export const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 30,
  '& img': {
    marginRight: 5,
  },
}));

export const StyledTitle = styled('p')(() => ({
  color: '#F8F8FF',
  fontSize: '25px',
  textAlign: 'center',
  position: 'relative',
}));

export const StyledWarning = styled(Typography)(() => ({
  marginLeft: '17px',
  '& h3': {
    textAlign: 'left',
    color: 'var(--theme-grey900-color)',
    fontSize: '12px',
    fontWeight: 'bold',
  },

  '& p': {
    fontSize: '12px',
    color: 'var(--theme-subtle-color)',
    fontWeight: 'normal',
    wordWrap: 'break-word',
  },
}));

export const StyledClose = styled('div')(() => ({
  marginLeft: 'auto',
  height: '20px',
  width: '20px',
  borderRadius: '50%',
  backgroundColor: '#F8F8FF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '& svg': {
    color: 'var(--theme-modal-color) !important',
    height: '18px',
    width: '18px',
  },
  '&:hover': {
    background: 'var(--theme-grey900-color)',
  },
  '&:active': {
    background: 'lightgray',
  },
}));
