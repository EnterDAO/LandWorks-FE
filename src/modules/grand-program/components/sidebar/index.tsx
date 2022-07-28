import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';

import { Button, Grid } from 'design-system';
import { ReactComponent as DropdownIcon } from 'resources/svg/dropdown-icon.svg';

import { DEFAULT_TABS } from './data';
import { ExpandButton, StyledRoot, Tab } from './styled';

interface IProps {
  tab: number;
  setTab: (value: number) => void;
}

export const Sidebar: React.FC<IProps> = ({ tab, setTab }) => {
  const mobile = useMediaQuery('(max-width: 400px)');
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledRoot style={{ bottom: isOpen ? '0' : '-185px' }}>
      <Grid container flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <h1>Content</h1>
        {mobile && (
          <ExpandButton onClick={() => setIsOpen(!isOpen)}>
            <DropdownIcon />
          </ExpandButton>
        )}
      </Grid>
      <div>
        {DEFAULT_TABS.map((item) => (
          <Tab
            style={{ color: item.id === tab ? 'var(--theme-grey900-color)' : 'inherit' }}
            onClick={() => setTab(item.id)}
            key={item.id}
          >
            {item.icon}
            {item.title}
          </Tab>
        ))}
      </div>
      <Button
        variant="gradient"
        style={{ width: 110, marginTop: 50 }}
        btnSize="xsmall"
        onClick={() => window.open('https://d1zs47v7suw.typeform.com/to/hs05sYCZ')}
      >
        Apply now
      </Button>
    </StyledRoot>
  );
};
