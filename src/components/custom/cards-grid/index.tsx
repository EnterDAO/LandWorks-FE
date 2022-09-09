import React, { FC } from 'react';

import { Box } from 'design-system';

interface CardsGrid {
  layout?: 'normal' | 'compact';
}

const CardsGrid: FC<CardsGrid> = ({ children, layout }) => {
  return (
    <Box
      flexGrow={1}
      display="grid"
      gap={4}
      gridTemplateColumns={`repeat(auto-fill, minmax(${layout === 'compact' ? 190 : 300}px, 1fr))`}
    >
      {children}
    </Box>
  );
};

export default CardsGrid;
