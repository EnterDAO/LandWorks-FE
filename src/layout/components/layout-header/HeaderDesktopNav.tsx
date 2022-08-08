import React, { FC } from 'react';

import { Box } from 'design-system';

import HeaderNavLinks from './HeaderNavLinks';
import HeaderRight from './HeaderRight';

import { THEME_COLORS } from 'themes/theme-constants';

const HeaderDesktopNav: FC = () => {
  return (
    <Box display="flex" flexGrow={1} height={1} alignItems="center">
      <Box width={2} height={20} bgcolor={THEME_COLORS.grey01} borderRadius="1px" mx={8} />

      <HeaderNavLinks />

      <HeaderRight />
    </Box>
  );
};

export default HeaderDesktopNav;
