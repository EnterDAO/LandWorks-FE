import React from 'react';

import { Box, Button, Stack } from 'design-system';

import { sectionsConfigs, sidebarNav } from '../../config';
import { Sidebar } from '../sidebar';

const Content: React.FC = () => {
  return (
    <Box pb={{ xs: 20, md: 22 }} display="flex">
      <Sidebar nav={sidebarNav} />
      <Stack pl={{ md: 10 }} spacing={{ xs: 10, lg: 26 }}>
        {sectionsConfigs.map(({ Component, id }) => {
          return <Component key={id} id={id} />;
        })}

        <Box>
          <Button
            variant="gradient"
            btnSize="medium"
            onClick={() => window.open('https://d1zs47v7suw.typeform.com/to/hs05sYCZ')}
          >
            Apply now
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;
