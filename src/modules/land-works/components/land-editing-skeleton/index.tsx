import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box } from 'design-system';

import { GridStyled, GridStyledInnerContainer } from './styled';

const highlightColor = '#68686a';
const baseColor = '#c1c1cf';

const EditFormCardSkeleton: FC = () => {
  return (
    <GridStyled minHeight={400} container columnSpacing={2}>
      <GridStyledInnerContainer item xs={5.8} display="flex" flexDirection="column" justifyContent="space-between">
        <Box height={'20%'}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'20%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'20%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'20%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
      </GridStyledInnerContainer>
      <GridStyledInnerContainer
        item
        mr={3}
        xs={5.8}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box height={'70%'}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
        <Box height={'20%'} mt={3}>
          <Skeleton width={'100%'} height={'100%'} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
        </Box>
      </GridStyledInnerContainer>
    </GridStyled>
  );
};

export default EditFormCardSkeleton;
