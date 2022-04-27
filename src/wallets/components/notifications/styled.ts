import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material';

export const StyledRoot = styled(Grid)(() => ({
  justifyContent: 'center',
  width: '540px',
}));

export const StyledTitleRow = styled(Grid)(() => ({
  justifyContent: 'space-between',
  padding: '40px 25px 20px 25px',
  '& .Mui-disabled': {
    background: 'transparent',
    '&:before': {
      display: 'none',
    },
  },
}));

export const StyledTypography = styled(Typography)(() => ({
  color: 'var(--theme-light-color)',
}));

export const StyledGrid = styled(Grid)(() => ({
  flexDirection: 'column',
}));

export const EmptyContainer = styled(Grid)(() => ({
  minHeight: 350,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  '& svg': {
    marginBottom: 25,
  },
}));

export const MessageRoot = styled(Grid)(() => ({
  padding: '15px 25px',
  alignItems: 'center',
  '& p, span': {
    fontSize: 14,
  },
}));

export const StyledTitle = styled(Typography)(() => ({
  color: 'var(--theme-light-color)',
  fontSize: 14,
}));

export const IconWrapper = styled(Typography)(() => ({
  marginRight: 25,
  background: 'rgba(93, 143, 240, 0.2)',
  padding: 8,
  borderRadius: 10,
  height: 48,
  width: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
