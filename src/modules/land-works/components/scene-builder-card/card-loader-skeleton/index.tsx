import 'react-loading-skeleton/dist/skeleton.css';

import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box } from 'design-system';

import { GridStyled, GridStyledInnerContainer } from './styled';

const highlightColor = '#68686a';
const baseColor = '#c1c1cf';

const CardLoaderSkeleton: FC = () => {
  return (
    <GridStyled item minHeight={350} xs={12} container columnSpacing={2}>
      <GridStyledInnerContainer item xs={12} flexDirection="column">
        <Box height={'40%'}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'10%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'20%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'10%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
      </GridStyledInnerContainer>
    </GridStyled>
  );
};

export default CardLoaderSkeleton;
