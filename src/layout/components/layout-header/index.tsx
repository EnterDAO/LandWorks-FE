/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';

import ExternalLink from 'components/custom/external-link';
import Icon from 'components/custom/icon';
import { Box } from 'design-system';

import { socialsLinks } from '../layout-footer';
import HeaderLogo from './HeaderLogo';
import HeaderMobileNavDrawer from './HeaderMobileNavDrawer';
import HeaderNav from './HeaderNav';
import HeaderRight from './HeaderRight';

import { THEME_COLORS } from 'themes/theme-constants';

const LayoutHeader: FC = () => {
  return (
    <Box
      position="fixed"
      px={{ xs: 3, lg: 15 }}
      top={0}
      left={0}
      width={1}
      zIndex={999}
      bgcolor={THEME_COLORS.darkBlue01}
    >
      <Box
        display="flex"
        alignItems="center"
        height={{ xs: 70, lg: 80 }}
        justifyContent="space-between"
        boxShadow={{ lg: `0 2px 0 ${THEME_COLORS.grey01}` }}
      >
        <HeaderLogo />

        <HeaderMobileNavDrawer>
          <HeaderNav />

          <HeaderRight />
          <Box display="flex" gap={2} flexWrap="wrap">
            {socialsLinks.map((socialLink, i) => {
              return (
                <Box
                  key={i}
                  component={ExternalLink}
                  href={socialLink.href}
                  width={60}
                  height={60}
                  borderRadius="10px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border={`1px solid ${THEME_COLORS.grey04}`}
                >
                  <Icon color="primary" name={socialLink.icon} width="24" height="24" />
                </Box>
              );
            })}
          </Box>
        </HeaderMobileNavDrawer>

        <Box
          display={{ xs: 'none', lg: 'flex' }}
          flexGrow={1}
          height={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width={2} height={20} bgcolor={THEME_COLORS.grey01} borderRadius="1px" mx={8} />
          <HeaderNav />

          <HeaderRight />
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutHeader;
