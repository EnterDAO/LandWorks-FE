import React from 'react';
import { SxProps } from '@mui/system';

import CircularProgress from '../CircularProgress';

const loaderSizes = {
  sm: {
    thickness: 2.5,
    size: 24,
  },
  lg: {
    thickness: 9,
    size: 88,
  },
};

interface LoaderProps {
  size?: keyof typeof loaderSizes;
  sx?: SxProps;
}

const Loader = ({ size = 'lg', sx }: LoaderProps) => {
  return <CircularProgress sx={sx} variant="indeterminate" value={10} {...loaderSizes[size]} />;
};

export default Loader;
