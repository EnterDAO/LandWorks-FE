import 'react-loading-skeleton/dist/skeleton.css';

import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Grid } from 'design-system';

import './index.scss';

const highlightColor = '#68686a';
const baseColor = '#c1c1cf';

const SingleLandCardSkeleton: FC = () => {
  return (
    <Grid
      mt={0}
      mr={1}
      xs={5.5}
      minHeight={350}
      container
      flexDirection="column"
      spacing={2}
      className="nft--card--skeleton-large"
    >
      <Box height={'80%'}>
        {' '}
        <Skeleton
          className="nft--card--skeleton--body"
          width={'100%'}
          height={'100%'}
          baseColor={baseColor}
          highlightColor={highlightColor}
          duration={3}
        />
      </Box>
      <Box height={'10%'} mt={3}>
        {' '}
        <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
      </Box>
    </Grid>
  );
};

export default SingleLandCardSkeleton;
