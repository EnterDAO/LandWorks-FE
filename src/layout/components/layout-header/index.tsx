import React, { FC, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';

import { Box } from 'design-system';

import { HeaderAgitaionBar } from './HeaderAgitationBar';
import HeaderDesktopNav from './HeaderDesktopNav';
import HeaderLogo from './HeaderLogo';
import HeaderMobileNav from './HeaderMobileNav';

import { THEME_COLORS } from 'themes/theme-constants';

const LayoutHeader: FC = () => {
  const headerContainerElRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (!headerContainerElRef.current || !window.ResizeObserver || isDesktop) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height);
    });

    resizeObserver.observe(headerContainerElRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isDesktop]);

  return (
    <Box ref={headerContainerElRef} position="sticky" top={0} left={0} width={1} zIndex={999}>
      <HeaderAgitaionBar />
      <Box bgcolor={THEME_COLORS.darkBlue01} px={{ xs: 3, lg: 15 }}>
        <Box
          display="flex"
          alignItems="center"
          height={{ xs: 70, lg: 80 }}
          justifyContent="space-between"
          boxShadow={{ lg: `0 2px 0 ${THEME_COLORS.grey01}` }}
        >
          <HeaderLogo />

          {isDesktop ? <HeaderDesktopNav /> : <HeaderMobileNav offsetTop={headerHeight} />}
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutHeader;
