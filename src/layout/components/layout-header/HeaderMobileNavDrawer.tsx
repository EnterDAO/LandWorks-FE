/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import { Drawer } from '@mui/material';

import { Box } from 'design-system';

import { ReactComponent as BurgerCloseIcon } from '../../../resources/svg/menu-close.svg';
import { ReactComponent as BurgerIcon } from '../../../resources/svg/menu.svg';

import { THEME_COLORS } from 'themes/theme-constants';

const HeaderMobileNavDrawer: FC = ({ children }) => {
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);

  const toggleIsMobileNavOpened = () => setIsMobileNavOpened((prevState) => !prevState);

  return (
    <Box display={{ lg: 'none' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={THEME_COLORS.light}
        border="none"
        bgcolor="transparent"
        m={0}
        p={0}
        onClick={toggleIsMobileNavOpened}
        component="button"
      >
        {isMobileNavOpened ? <BurgerCloseIcon /> : <BurgerIcon />}
      </Box>

      <Drawer
        ModalProps={{
          sx: {
            zIndex: 998,
          },
        }}
        PaperProps={{
          sx: {
            mt: 14,
            bgcolor: THEME_COLORS.darkBlue01,
            py: 12,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          },
        }}
        BackdropProps={{
          sx: {
            bgcolor: 'rgba(2, 2, 23, 0.7)',
            backdropFilter: 'blur(5px)',
          },
        }}
        anchor="top"
        onClose={toggleIsMobileNavOpened}
        open={isMobileNavOpened}
      >
        {children}
      </Drawer>
    </Box>
  );
};

export default HeaderMobileNavDrawer;
