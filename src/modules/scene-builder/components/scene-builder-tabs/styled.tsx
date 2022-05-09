import TabList, { TabListProps } from '@mui/lab/TabList';
import { TypographyProps } from '@mui/material';
import Tab, { TabProps } from '@mui/material/Tab';
import { styled } from '@mui/system';

import { Box, Typography } from 'design-system';

export const RootStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: 'auto',
  alignItems: 'center',
  margin: '0',
  paddingBottom: '50px',
  flexDirection: 'column',
  '& > .MuiBox-root': {
    marginBottom: '20px',
  },
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    '& > .MuiBox-root': {
      marginBottom: '0',
    },
  },
}));

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  margin: '100px 0 30px',
  display: 'block',
  width: '100%',
  textAlign: 'center',
  color: 'var(--theme-light-color)',
  fontSize: '30px',
  fontWeight: '700',
}));

export const TabListStyled = styled(TabList)<TabListProps>(() => ({
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));

export const TabStyled = styled(Tab)<TabProps>(() => ({
  fontSize: '14px',
  fontWEight: '600',
  lineHeight: '21px',
  minHeight: '45px',
  minWidth: '120px',
  textTransform: 'uppercase',
  borderRadius: '8px',
  padding: '12px 24px',
  marginRight: '10px',
  color: 'var(--theme-grey700-color)',
  background: 'transparent',
  '&.MuiTabs-indicator': {
    display: 'none',
  },
  '&.Mui-selected': {
    color: '#F8F8FF',
    background: 'var(--theme-modal-color)',
  },
  span: {
    color: 'var(--theme-grey700-color)',
    marginLeft: '4px',
  },
}));
