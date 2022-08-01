import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';

import { Button, Grid, Stack } from 'design-system';
import { ReactComponent as DropdownIcon } from 'resources/svg/dropdown-icon.svg';

import { DEFAULT_TABS } from './data';
import { ExpandButton, StyledRoot, Tab } from './styled';

export const Sidebar: React.FC = () => {
  const mobile = useMediaQuery('(max-width: 400px)');
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const changeTab = (value: number) => {
    document.getElementById(`gp-id-${value}`)?.scrollIntoView({ behavior: 'smooth' });
    setTab(value);
  };

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
      <Stack spacing={2}>
        {DEFAULT_TABS.map((item) => (
          <Tab
            style={{ color: item.id === tab ? 'var(--theme-grey900-color)' : 'inherit' }}
            onClick={() => changeTab(item.id)}
            key={item.id}
          >
            {item.icon}
            {item.title}
          </Tab>
        ))}
      </Stack>
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
