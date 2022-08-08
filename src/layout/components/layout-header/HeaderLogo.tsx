import React, { FC } from 'react';

import Icon from 'components/custom/icon';
import StyledNavLink from 'components/styled/nav-link';
import { Box } from 'design-system';
import useHasUserEnteredApp from 'hooks/useHasUserEnteredApp';
import { routes } from 'router/routes';

import { ReactComponent as TextLogo } from '../../../resources/svg/landWorks-logo.svg';

const HeaderLogo: FC = () => {
  const hasUserEnteredApp = useHasUserEnteredApp();

  return (
    <StyledNavLink
      to={hasUserEnteredApp ? routes.explore : routes.home}
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
