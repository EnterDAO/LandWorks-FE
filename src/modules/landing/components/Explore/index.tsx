import React from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Tag } from 'assets/img/explore_tag.svg';
import { ReactComponent as LandGroup } from 'assets/img/land_group.svg';
import { Box, Button, Grid, Typography } from 'design-system';
import { StyledRoot } from 'modules/landing/components/Explore/styled';
import { routes } from 'router/routes';

export const Explore: React.FC = () => {
  const history = useHistory();
  return (
    <Box py={{ xs: 10, lg: 20 }} className="content-container">
      <Box
        display="flex"
        flexDirection={{ xs: 'column', lg: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        border="5px solid #27273A"
        bgcolor="#1E1E2E"
        borderRadius="50px"
      >
        <Box
          order={{ xs: 1, lg: 0 }}
          p={{ xs: '0 20px 40px 20px', lg: '70px', xl: '120px 0px 0px 140px' }}
          flexShrink={0}
        >
          <Box mb={2}>
            <Tag />
          </Box>
          <Typography variant="h1" component="h2" mb={2}>
            Explore <br /> Our Marketplace
          </Typography>
          <Typography maxWidth={300} mb={9}>
            Rent a land or list your property for renting - we make it easy for you.
          </Typography>
          <Button onClick={() => history.push(routes.explore)} btnSize="medium" variant="gradient">
            Explore
          </Button>
        </Box>
        <Box maxWidth={600} order={{ xs: 0, lg: 1 }} sx={{ svg: { width: 1, height: 'auto' } }}>
          <LandGroup />
        </Box>
      </Box>
    </Box>
  );
};
