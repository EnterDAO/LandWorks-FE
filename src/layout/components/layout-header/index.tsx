import React, { FC } from 'react';
import { useMediaQuery } from '@mui/material';

import { Box } from 'design-system';
import { useHeader } from 'providers/header-provider';

import { HeaderAgitaionBar } from './HeaderAgitationBar';
import HeaderDesktopNav from './HeaderDesktopNav';
import HeaderLogo from './HeaderLogo';
import HeaderMobileNav from './HeaderMobileNav';

import { THEME_COLORS } from 'themes/theme-constants';

const LayoutHeader: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const header = useHeader();

  return (
    <Box component="header" ref={header.ref} position="sticky" top={0} left={0} width={1} zIndex={999}>
      <HeaderAgitaionBar />
      <Box bgcolor={THEME_COLORS.darkBlue01} px={{ xs: 3, lg: 15 }}>
        <Box
          display="flex"
          alignItems="center"
          height={{ xs: 70, lg: 80 }}
          justifyContent="space-between"
          boxShadow={{ lg: `inset 0 -2px 0 ${THEME_COLORS.grey01}` }}
        >
          <HeaderLogo />

          {isDesktop ? <HeaderDesktopNav /> : <HeaderMobileNav />}
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutHeader;
