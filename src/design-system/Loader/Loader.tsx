import { FC } from 'react';
import { Box, SxProps } from '@mui/material';

import { animationsCss, loaderElementStyles, loaderRootStyles } from './loader-styles';

interface LoaderProps {
  sx?: SxProps;
}

const Loader: FC<LoaderProps> = ({ sx = {} }) => {
  return (
    <Box sx={[loaderRootStyles, ...(Array.isArray(sx) ? sx : [sx])]}>
      <style>{animationsCss}</style>
      <Box sx={[loaderElementStyles]} />
    </Box>
  );
};

export default Loader;
