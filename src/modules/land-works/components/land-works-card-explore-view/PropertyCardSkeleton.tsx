import React from 'react';
import { Box, Stack } from '@mui/material';

import Divider from 'components/custom/divider';
import Skeleton from 'components/custom/skeleton';

interface PropertyCardSkeletonProps {
  layout?: 'compact' | 'normal';
}

const PropertyCardSkeletonCompact = () => {
  return (
    <Stack bgcolor="var(--theme-card-color)" borderRadius="10px" p={2} height={275}>
      <Skeleton variant="rectangular" height="100px" width="100%" sx={{ mb: 2, borderRadius: '10px' }} />

      <Skeleton variant="rectangular" height="36px" width="115px" sx={{ mb: 4 }} />

      <Skeleton variant="rectangular" height="21px" width="121px" />

      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto" height={42}>
        <Skeleton variant="rectangular" height="100%" width="76px" />

        <Skeleton variant="circular" height="12px" width="12px" />
      </Box>
    </Stack>
  );
};

const PropertyCardSkeleton = ({ layout }: PropertyCardSkeletonProps) => {
  if (layout === 'compact') {
    return <PropertyCardSkeletonCompact />;
  }

  return (
    <Stack bgcolor="var(--theme-card-color)" borderRadius="20px" p={3} height={363}>
      <Skeleton variant="rectangular" width="100%" height="160px" sx={{ mb: 3, borderRadius: '10px' }} />

      <Box display="flex" justifyContent="space-between" height={47}>
        <Skeleton variant="rectangular" height="100%" width="150px" />
        <Skeleton variant="rectangular" height="100%" width="70px" />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box display="flex" alignItems="center" justifyContent="space-between" height={42}>
        <Skeleton variant="rectangular" height="100%" width="100px" />
        <Skeleton variant="rectangular" height="28px" width="85px" />
      </Box>

      <Skeleton variant="rectangular" height="18px" width="180px" sx={{ mt: 'auto' }} />
    </Stack>
  );
};

export default PropertyCardSkeleton;
