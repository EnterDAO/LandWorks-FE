import React, { ReactNode, Ref, forwardRef } from 'react';
import { SxProps } from '@mui/system';

import { Box } from 'design-system';

interface CardsGrid {
  minWidth?: string | undefined;
  sx?: SxProps;
  children?: ReactNode;
}

const CardsGrid = ({ children, minWidth = '300px', sx }: CardsGrid, ref: Ref<HTMLDivElement>) => {
  return (
    <Box
      ref={ref}
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

export default forwardRef(CardsGrid);
