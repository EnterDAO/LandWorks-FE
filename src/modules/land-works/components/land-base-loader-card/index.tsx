import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Grid } from 'design-system';

import { GridStyled, GridStyledInnerContainer } from './styled';

const highlightColor = '#68686a';
const baseColor = '#c1c1cf';

const LandCardSkeleton: FC = () => {
  return (
    <GridStyled minHeight={250} container>
      <GridStyledInnerContainer item xs={12} display="flex" flexDirection="column" alignContent="center">
        <Box height={'10%'} display="flex" justifyContent="space-between">
          <Grid item xs={10}>
            <Skeleton
              width={'100%'}
              height={'100%'}
              baseColor={baseColor}
              highlightColor={highlightColor}
              duration={3}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Skeleton
              width={'100%'}
              height={'100%'}
              baseColor={baseColor}
              highlightColor={highlightColor}
              duration={3}
            />
          </Grid>
        </Box>
        <Box height={'60%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'10%'} mt={3} display="flex" justifyContent="space-between">
          <Grid item xs={5.5}>
            <Skeleton
              width={'100%'}
              height={'100%'}
              baseColor={baseColor}
              highlightColor={highlightColor}
              duration={3}
            />
          </Grid>
          <Grid item xs={5.5}>
            <Skeleton
              width={'100%'}
              height={'100%'}
              baseColor={baseColor}
              highlightColor={highlightColor}
              duration={3}
            />
          </Grid>
        </Box>
      </GridStyledInnerContainer>
    </GridStyled>
  );
};

export default LandCardSkeleton;
