import 'react-loading-skeleton/dist/skeleton.css';

import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box } from 'design-system';

import { GridStyled, GridStyledInnerContainer } from './styled';

const highlightColor = '#68686a';
const baseColor = '#c1c1cf';

const SingleLandCardSkeleton: FC = () => {
  return (
    <GridStyled mt={0} xs={12} minHeight={350} container columnSpacing={2}>
      <GridStyledInnerContainer mr={3} xs={5.8} flexDirection="column">
        <Box height={'80%'}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'10%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
      </GridStyledInnerContainer>
      <GridStyledInnerContainer xs={5.8} flexDirection="column">
        <Box height={'20%'}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'20%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'45%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
      </GridStyledInnerContainer>
    </GridStyled>
  );
};

export default SingleLandCardSkeleton;
