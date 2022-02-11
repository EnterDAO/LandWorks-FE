import { FC, ReactNode } from 'react';
import { Box, SxProps, Typography } from '@mui/material';

import { statusBadgeRootStyles } from './status-badge-styles';

interface StatusBadgeProps {
  type?: 'info' | 'success' | 'danger';
  children?: ReactNode;
  sx?: SxProps;
}

const StatusBadge: FC<StatusBadgeProps> = ({ type = 'info', children, sx = {} }) => {
  return (
    <Box component="span" sx={[statusBadgeRootStyles, ...(Array.isArray(sx) ? sx : [sx])]} className={`type-${type}`}>
      <Typography position="relative" component="span" variant="body2" color="inherit">
        {children}
      </Typography>
    </Box>
  );
};

export default StatusBadge;
