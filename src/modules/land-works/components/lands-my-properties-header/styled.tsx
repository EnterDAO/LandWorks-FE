import TabList, { TabListProps } from '@mui/lab/TabList';
import { TypographyProps } from '@mui/material';
import Tab, { TabProps } from '@mui/material/Tab';
import { styled } from '@mui/system';

import { Box, Typography } from 'design-system';

export const RootStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: 'auto',
  alignItems: 'center',
  margin: '0 0 12px 0',
  paddingBottom: '20px',
  borderBottom: '2px solid var(--theme-modal-color)',
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
  display: 'block',
  width: '100%',
  fontSize: '30px',
  fontWeight: 700,
  span: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--theme-subtle-color)',
  },
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
