import { ReactNode } from 'react';
import MuiTab from '@mui/material/Tab';
import MuiTabList, { tabsClasses } from '@mui/material/Tabs';
import { styled } from '@mui/system';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export const TabPanel = styled(({ value, index, children }: TabPanelProps) => {
  return <>{value === index ? children : null}</>;
})({});

export const Tabs = styled(MuiTabList)(() => ({
  [`& .${tabsClasses.flexContainer}`]: {
    gap: 10,
  },
  [`& .${tabsClasses.indicator}`]: {
    display: 'none',
  },
}));

export const Tab = styled(MuiTab)(() => ({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '21px',
  flexDirection: 'row',
  minHeight: '45px',
  minWidth: '120px',
  textTransform: 'uppercase',
  borderRadius: '8px',
  padding: '12px 24px',
  color: 'var(--theme-grey700-color)',
  background: 'transparent',
  '&.MuiTabs-indicator': {
    display: 'none',
  },
  '&.Mui-selected': {
    color: '#F8F8FF',
    background: 'var(--theme-modal-color)',
  },
}));
