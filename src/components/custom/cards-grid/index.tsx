import React, { FC } from 'react';
import { SxProps } from '@mui/system';

import { Box } from 'design-system';

interface CardsGrid {
  minWidth?: string | undefined;
  sx?: SxProps;
}

const CardsGrid: FC<CardsGrid> = ({ children, minWidth = '300px', sx }) => {
  return (
    <Box
      flexGrow={1}
      display="grid"
      gap={4}
      sx={sx}
      width={1}
      gridTemplateColumns={`repeat(auto-fill, minmax(min(${minWidth}, 100%), 1fr))`}
    >
      {children}
    </Box>
  );
};

export default CardsGrid;
