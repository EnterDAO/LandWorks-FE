import React, { FC } from 'react';

import { Box, Button, Typography } from 'design-system';

import { SidebarProps } from './Sidebar';
import { SidebarNav } from './SidebarNav';

export const DesktopSidebar: FC<SidebarProps> = ({ nav }) => {
  return (
    <Box
      flex="0 0 201px"
      display={{ xs: 'none', md: 'block' }}
      position="sticky"
      pr={10}
      pb="12px"
      top={170}
      alignSelf="flex-start"
      borderRight={`1px solid var(--theme-grey400-color)`}
    >
      <Typography mb={4} variant="h4">
        Content
      </Typography>

      <SidebarNav items={nav} />

      <Button
        sx={{
          width: '120px !important',
          mt: 10,
        }}
        variant="gradient"
        btnSize="xsmall"
        onClick={() => window.open('https://d1zs47v7suw.typeform.com/to/hs05sYCZ')}
      >
        Apply now
      </Button>
    </Box>
  );
};
