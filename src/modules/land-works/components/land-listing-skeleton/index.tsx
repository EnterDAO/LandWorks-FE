import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Grid } from 'design-system';

import { GridStyledInnerContainer } from './styled';

const highlightColor = '#68686a';
const baseColor = '#c1c1cf';

const ListingCardSkeleton: FC = () => {
  return (
    <Grid width="100%" display={'flex'} flexWrap="wrap" flexDirection="row">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <GridStyledInnerContainer
          minHeight={200}
          item
          xs={2.8}
          display="flex"
          alignContent="center"
          flexDirection="column"
          justifyContent="space-between"
          key={i}
        >
          <Box height={'70%'}>
            <Skeleton
              width={'100%'}
              height={'100%'}
              baseColor={baseColor}
              highlightColor={highlightColor}
              duration={3}
            />
          </Box>
          <Box height={'20%'} mt={3}>
            <Skeleton
              width={'100%'}
              height={'100%'}
              baseColor={baseColor}
              highlightColor={highlightColor}
              duration={3}
            />
          </Box>
        </GridStyledInnerContainer>
      ))}
    </Grid>
  );
};

export default ListingCardSkeleton;
