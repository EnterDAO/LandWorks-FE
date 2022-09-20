import React, { FC } from 'react';
import { useMediaQuery } from '@mui/material';

import { Box } from 'design-system';
import { useStickyOffset } from 'providers/sticky-offset-provider';

import { HeaderAgitaionBar } from './HeaderAgitationBar';
import HeaderDesktopNav from './HeaderDesktopNav';
import HeaderLogo from './HeaderLogo';
import HeaderMobileNav from './HeaderMobileNav';

import { THEME_COLORS } from 'themes/theme-constants';

const LayoutHeader: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const stickyOffset = useStickyOffset();

  return (
    <Box
      component="header"
      ref={stickyOffset.register('header')}
      position="sticky"
      top={0}
      left={0}
      width={1}
      zIndex={999}
    >
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
