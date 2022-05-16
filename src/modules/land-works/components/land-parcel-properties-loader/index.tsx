import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box } from 'design-system';

import { GridStyledInnerContainer } from './styled';

const highlightColor = '#68686a';
const baseColor = '#c1c1cf';

const ParcelPropertiesLoader: FC = () => {
  return (
    <>
      <GridStyledInnerContainer item xs={5} flexDirection="column" justifyContent={'space-between'}>
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
      </GridStyledInnerContainer>
      <GridStyledInnerContainer item xs={3.4} flexDirection="column">
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
      </GridStyledInnerContainer>
      <GridStyledInnerContainer item xs={3.4} flexDirection="column">
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box mt={2}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
      </GridStyledInnerContainer>
    </>
  );
};

export default ParcelPropertiesLoader;
