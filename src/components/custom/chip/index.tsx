import React, { FC, ReactElement } from 'react';
import { SxProps } from '@mui/system';

import { Icon, Typography } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

interface ChipProps {
  icon?: ReactElement;
  sx?: SxProps;
}

const Chip: FC<ChipProps> = ({ icon, sx, children }) => {
  return (
    <Typography
      px={4}
      py="8px"
      component="p"
      border={`1px solid ${THEME_COLORS.light}`}
      bgcolor={THEME_COLORS.grey01}
      color={THEME_COLORS.light}
      display="inline-flex"
      alignItems="center"
      minHeight={42}
      variant="body2"
      borderRadius="100vmin"
      sx={sx}
    >
      {icon && <Icon mr={2} iconElement={icon} iconSize="m" />}
      {children}
    </Typography>
  );
};

export default Chip;
