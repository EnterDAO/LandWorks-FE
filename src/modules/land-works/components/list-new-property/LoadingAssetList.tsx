import React from 'react';
import { Box, Grid, Skeleton, useMediaQuery } from '@mui/material';

const LoadingAssetList = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1440px)');

  return (
    <Grid container flexGrow={1} rowSpacing={3} columnSpacing={4}>
      {Array.from({ length: isLargeScreen ? 8 : 6 }, (_, i) => {
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          <Grid key={i} item xs={4} xxl={3}>
            <Box
              sx={{
                '& .MuiSkeleton-root': {
                  bgcolor: 'rgba(255, 255, 255, 0.1) !important',
                  borderRadius: '5px',
                },
              }}
              height={{
                xs: 188,
                xxl: 210,
              }}
              p={2}
              borderRadius="10px"
              bgcolor="var(--theme-grey200-color)"
            >
              <Skeleton height={110} variant="rectangular" sx={{ mb: '12px', borderRadius: '10px !important' }} />
              <Skeleton width={95} height={24} variant="rectangular" sx={{ mb: '4px' }} />
              <Skeleton width={60} height={18} variant="rectangular" />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default LoadingAssetList;
