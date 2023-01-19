import React from 'react';
import { Box } from '@mui/material';

import Loader from 'components/common/Loader';
import { useStickyOffset } from 'providers/sticky-offset-provider';

const LoadingView = () => {
  const stickyOffsets = useStickyOffset();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={`calc(100vh - ${stickyOffsets.offsets.header}px)`}
    >
      <Loader />
    </Box>
  );
};

export default LoadingView;
