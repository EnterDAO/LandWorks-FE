import React, { forwardRef, useState } from 'react';

import ExternalLink from 'components/custom/external-link';
import Icon from 'components/custom/icon';
import { Box, Stack } from 'design-system';

import { ReactComponent as BurgerCloseIcon } from '../../../resources/svg/menu-close.svg';
import { ReactComponent as BurgerIcon } from '../../../resources/svg/menu.svg';
import { socialsLinks } from '../layout-footer';
import HeaderMobileNavDrawer from './HeaderMobileNavDrawer';
import HeaderNavLinks from './HeaderNavLinks';
import HeaderRight from './HeaderRight';

import { THEME_COLORS } from 'themes/theme-constants';

interface HeaderMobileNavProps {
  offsetTop: number;
}

const HeaderMobileNav = forwardRef<HTMLDivElement, HeaderMobileNavProps>(({ offsetTop }, ref) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prevOpen) => !prevOpen);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={THEME_COLORS.light}
        border="none"
        bgcolor="transparent"
        m={0}
        p={0}
        onClick={toggleOpen}
        component="button"
      >
        {open ? <BurgerCloseIcon /> : <BurgerIcon />}
      </Box>

      <HeaderMobileNavDrawer open={open} onClose={toggleOpen}>
        <Stack ref={ref} display="flex" flexDirection="column" pt={`${offsetTop + 60}px`} gap={12} px={3} pb={12}>
          <HeaderNavLinks />

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
        </Stack>
      </HeaderMobileNavDrawer>
    </Box>
  );
});

export default HeaderMobileNav;
