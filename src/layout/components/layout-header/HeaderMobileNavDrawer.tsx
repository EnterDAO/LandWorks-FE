import React, { FC } from 'react';
import { Drawer, DrawerProps } from '@mui/material';

import { THEME_COLORS } from 'themes/theme-constants';

const HeaderMobileNavDrawer: FC<DrawerProps> = ({ children, ...otherProps }) => {
  return (
    <Drawer
      ModalProps={{
        sx: {
          zIndex: -1,
        },
      }}
      PaperProps={{
        sx: {
          bgcolor: THEME_COLORS.darkBlue01,
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: 'rgba(2, 2, 23, 0.7)',
          backdropFilter: 'blur(5px)',
        },
      }}
      disablePortal
      anchor="top"
      {...otherProps}
    >
      {children}
    </Drawer>
  );
};

export default HeaderMobileNavDrawer;
