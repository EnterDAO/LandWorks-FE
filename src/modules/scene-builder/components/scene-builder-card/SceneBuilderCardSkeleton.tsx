import { FC } from 'react';

import Divider from 'components/custom/divider';
import Skeleton from 'components/custom/skeleton';
import { Box, Stack, Typography } from 'design-system';

const SceneBuilderCardSkeleton: FC = () => {
  return (
    <Stack height={435} p={4} bgcolor="var(--theme-card-color)" borderRadius="20px">
      <Skeleton
        variant="rectangular"
        sx={{
          height: 133,
          borderRadius: '20px',
          flexShrink: 0,
        }}
      />

      <Box
        position="relative"
        width={100}
        height={100}
        overflow="hidden"
        borderRadius="100%"
        bgcolor="var(--theme-card-color)"
        mx="auto"
        mt="-57px"
        mb={3}
        flexShrink={0}
      >
        <Skeleton width="100%" height="100%" variant="rectangular" />
      </Box>

      <Typography variant="h4" mx="auto">
        <Skeleton width="140px" />
      </Typography>

      <Typography variant="body2" mb={2} mx="auto">
        <Skeleton width="160px" />
      </Typography>

      <Skeleton variant="rectangular" width="79px" height="26px" sx={{ mx: 'auto', mb: 3 }} />

      <Typography variant="caption" color="var(--theme-subtle-color)" mb="auto">
        <Skeleton width="100%" />
        <Skeleton width="100%" />
        <Skeleton width="60%" />
      </Typography>

      <Divider sx={{ my: 2, width: 1 }} />

      <Skeleton variant="rectangular" width="100px" height="18px" />
    </Stack>
  );
};

export default SceneBuilderCardSkeleton;
