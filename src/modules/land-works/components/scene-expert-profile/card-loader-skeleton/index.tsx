import 'react-loading-skeleton/dist/skeleton.css';

import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Grid } from 'design-system';

import { GridStyled, GridStyledInnerContainer } from './styled';

const highlightColor = '#68686a';
const baseColor = '#c1c1cf';

const ProfileLoaderSkeleton: FC = () => {
  return (
    <GridStyled minHeight={450} container columnSpacing={2} mt={'28px'}>
      <GridStyledInnerContainer item mr={3} xs={7.8} flexDirection="column">
        <Box height={'40%'}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'30%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'20%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
      </GridStyledInnerContainer>
      <GridStyledInnerContainer item xs={3.8} flexDirection="column">
        <Box height={'25%'}>
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

export default ProfileLoaderSkeleton;
