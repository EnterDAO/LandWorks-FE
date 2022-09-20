/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useRef } from 'react';
import { matchPath, useRouteMatch } from 'react-router-dom';

import { Box } from 'design-system';
import { routes } from 'router/routes';

import { ReactComponent as Rocket } from '../../../resources/svg/rocket-02.svg';
import HeaderNavLink, { HeaderNavLinkProps } from './HeaderNavLink';

const landingNav: HeaderNavLinkProps[] = [
  {
    to: routes.home,
    label: 'Home',
    exact: true,
  },
  {
    to: {
      pathname: routes.home,
      hash: '#why',
    },
    label: 'Why Rent?',
    exact: true,
  },
  {
    to: 'https://docs.landworks.xyz',
    label: 'Docs',
    external: true,
  },
  {
    to: routes.faq,
    label: 'FAQ',
  },
  {
    to: routes.sceneBuilder,
    label: 'Scene Builder',
  },
  {
    to: routes.grantsProgram,
    label: 'Grant Program',
  },
];

const appNav: HeaderNavLinkProps[] = [
  {
    to: routes.explore,
    label: 'Explore',
    Icon: Rocket,
    exact: true,
  },
  {
    to: routes.myProperties,
    label: 'My properties',
  },
  {
    to: routes.sceneBuilder,
    label: 'Scene Builder',
  },
  {
    to: routes.faq,
    label: 'FAQ',
  },
  {
    to: routes.grantsProgram,
    label: 'Grant Program',
  },
];

export const useIsAppMode = () => {
  const isExploreRoute = !!useRouteMatch({
    path: routes.explore,
  });
  const isHomeRoute = !!useRouteMatch({
    path: routes.home,
    exact: true,
  });

  const isAppModeRef = useRef(isExploreRoute);

  useEffect(() => {
    if (isExploreRoute) {
      isAppModeRef.current = true;
    } else if (isHomeRoute) {
      isAppModeRef.current = false;
    }
  }, [isExploreRoute, isHomeRoute]);

  return (isExploreRoute || isAppModeRef.current) && !isHomeRoute;
};

const HeaderNav: FC = () => {
  const isAppMode = useIsAppMode();

  const nav = isAppMode ? appNav : landingNav;

  return (
    <Box
      component="nav"
      height={{ lg: 1 }}
      display="flex"
      flexDirection={{ xs: 'column', lg: 'row' }}
      px={{ xs: 3, lg: 0 }}
      gap={{ xs: 6, xl: 8 }}
      flexGrow={{ lg: 1 }}
    >
      {nav.map((mainNavLink, i) => {
        return <HeaderNavLink key={i} {...mainNavLink} />;
      })}
    </Box>
  );
};

export default HeaderNav;
