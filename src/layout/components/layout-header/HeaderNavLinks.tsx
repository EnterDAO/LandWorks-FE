import React, { FC } from 'react';

import { Box } from 'design-system';
import useHasUserEnteredApp from 'hooks/useHasUserEnteredApp';
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

const HeaderNavLinks: FC = () => {
  const hasUserEnteredApp = useHasUserEnteredApp();
  const nav = hasUserEnteredApp ? appNav : landingNav;

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

export default HeaderNavLinks;
