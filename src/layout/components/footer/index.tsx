import React, { FC } from 'react';
import { useMediaQuery } from '@mui/material';

import Icon from 'components/custom/icon';
import { Box, Stack } from 'design-system';
import LayoutFooter, { Copyright, FooterNav, FooterSocialList } from 'layout/components/layout-footer';

const Footer: FC = () => {
  const isTable = useMediaQuery('(min-width: 768px)');

  return isTable ? (
    <Stack mx="auto" maxWidth={550} alignItems="center" pt={6} pb="185px">
      <Box pb={16} mb={10} borderBottom="2px solid #1e1e2e">
        <FooterSocialList />
      </Box>

      <Box mb={10}>
        <FooterNav />
      </Box>

      <Stack gap={4} alignItems="center">
        <Icon name="png/LandWorksLogo" width="48" height="48" />
        <Copyright />
      </Stack>
    </Stack>
  ) : (
    <LayoutFooter />
  );
};

export default Footer;
