/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';

import Icon from 'components/custom/icon';
import StyledNavLink from 'components/styled/nav-link';
import { Box } from 'design-system';
import { routes } from 'router/routes';

import { ReactComponent as TextLogo } from '../../../resources/svg/landWorks-logo.svg';
import { useIsLandingMode } from './HeaderNav';

const HeaderLogo: FC = () => {
  const isUserEnteredApp = useIsLandingMode();

  return (
    <StyledNavLink
      to={isUserEnteredApp ? routes.explore : routes.home}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Box component={Icon} name="png/LandWorksLogo" width={37} height="auto" />
      <Box>
        <TextLogo />
      </Box>
    </StyledNavLink>
  );
};

export default HeaderLogo;
