import React, { FC } from 'react';
import { SxProps } from '@mui/system';

import { Box } from 'design-system';

interface CardsGrid {
  layout?: 'normal' | 'compact';
  sx?: SxProps;
}

const CardsGrid: FC<CardsGrid> = ({ children, layout, sx }) => {
  return (
    <Box
      flexGrow={1}
      display="grid"
      gap={4}
      sx={sx}
      width={1}
      gridTemplateColumns={`repeat(auto-fill, minmax(min(${layout === 'compact' ? 190 : 300}px, 100%), 1fr))`}
    >
      {children}
    </Box>
  );
};

export default CardsGrid;
