import React from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as LandGroup } from 'assets/img/land_group.svg';
import { ReactComponent as TrianglesIcon } from 'assets/img/triangles-icon.svg';
import AdaptiveTypography from 'components/custom/adaptive-typography';
import Chip from 'components/custom/chip';
import { Box, Button, Stack, Typography } from 'design-system';
import { APP_ROUTES } from 'router/routes';

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
        <Stack
          order={{ xs: 1, lg: 0 }}
          textAlign={{ sm: 'center', lg: 'left' }}
          alignItems={{ xs: 'flex-start', sm: 'center', lg: 'flex-start' }}
          p={{ xs: '0 20px 40px 20px', sm: '0 0 100px 0', lg: '70px', xl: '0 0 0 140px' }}
          flexShrink={0}
        >
          <Chip icon={<TrianglesIcon />}>METAVERSE LAND MARKETPLACE</Chip>
          <AdaptiveTypography variant="h1" component="h2" mt={2} mb={2}>
            Explore <br /> Our Marketplace
          </AdaptiveTypography>
          <Typography maxWidth={300} mb={9}>
            Rent a land or list your property for renting - we make it easy for you.
          </Typography>
          <Button onClick={() => history.push(APP_ROUTES.explore)} btnSize="medium" variant="gradient">
            Explore
          </Button>
        </Stack>
        <Box maxWidth={600} order={{ xs: 0, lg: 1 }} sx={{ svg: { width: 1, height: 'auto' } }}>
          <LandGroup />
        </Box>
      </Box>
    </Box>
  );
};
