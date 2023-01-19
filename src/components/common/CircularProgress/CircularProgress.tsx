import React from 'react';
import { CircularProgressProps as MuiCircularProgressProps } from '@mui/material';
import { Box } from '@mui/material';

import { CircularProgressBackground, CircularProgressForeground } from './CircularProgress.styles';

interface CircularProgressProps extends Omit<MuiCircularProgressProps, 'classes' | 'color'> {
  size?: number;
}

const CircularProgress = ({ value, thickness = 2, size = 40, sx, ...otherProps }: CircularProgressProps) => {
  const realThickness = (40 / size) * thickness; // base size / size * desired thickness = 40 / 170 * 9

  return (
    <Box sx={sx} display="inline-flex" position="relative">
      <CircularProgressBackground variant="determinate" size={size} value={100} thickness={realThickness} />
      <CircularProgressForeground size={size} value={value} thickness={realThickness} {...otherProps} />
    </Box>
  );
};

export default CircularProgress;
