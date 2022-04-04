import { FC } from 'react';
import { Box, BoxProps } from '@mui/material';

import { backgroundContainerDarkRootStyles, backgroundContainerLightRootStyles } from './background-container-styles';

interface BackgroundContainerProps extends BoxProps {
  variant?: 'light' | 'dark';
}

const BackgroundContainer: FC<BackgroundContainerProps> = ({ variant = 'light', children, sx = {}, ...otherProps }) => {
  return (
    <Box
      component="div"
      sx={[
        variant === 'light' && backgroundContainerLightRootStyles,
        variant === 'dark' && backgroundContainerDarkRootStyles,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...otherProps}
    >
      {children}
    </Box>
  );
};

export default BackgroundContainer;
