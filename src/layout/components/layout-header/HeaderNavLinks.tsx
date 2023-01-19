import React, { FC } from 'react';

import { Box } from 'design-system';
import { APP_ROUTES, LANDING_ROUTES, getMyPropertiesPath, useIsAppRoute } from 'router/routes';

import { ReactComponent as Rocket } from '../../../resources/svg/rocket-02.svg';
import HeaderNavLink, { HeaderNavLinkProps } from './HeaderNavLink';

const landingNav: HeaderNavLinkProps[] = [
  {
    to: LANDING_ROUTES.home,
    label: 'Home',
    exact: true,
  },
  {
    to: {
      pathname: LANDING_ROUTES.home,
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
    to: LANDING_ROUTES.faq,
    label: 'FAQ',
  },
  {
    to: LANDING_ROUTES.metaCreators,
    label: 'MetaCreators',
  },
  {
    to: LANDING_ROUTES.grantsProgram,
    label: 'Grant Program',
  },
];

const appNav: HeaderNavLinkProps[] = [
  {
    to: APP_ROUTES.explore,
    label: 'Explore',
    Icon: Rocket,
    exact: true,
  },
  {
    to: getMyPropertiesPath(),
    label: 'My properties',
  },
  {
    to: APP_ROUTES.metaCreators,
    label: 'MetaCreators',
  },
  {
    to: APP_ROUTES.faq,
    label: 'FAQ',
  },
  {
    to: APP_ROUTES.grantsProgram,
    label: 'Grant Program',
  },
];

const HeaderNavLinks: FC = () => {
  const isAppRoute = useIsAppRoute();
  const nav = isAppRoute ? appNav : landingNav;

  return (
    <Box
      component="nav"
      height={{ lg: 1 }}
      display="flex"
      px={{ xs: 3, lg: 0 }}
      gap={{ xs: 5, xl: 6, xxl: 8 }}
      flexGrow={{ lg: 1 }}
      sx={(theme) => {
        return {
          flexDirection: 'column',
          [theme.breakpoints.up(1130)]: {
            flexDirection: 'row',
          },
        };
      }}
    >
      {nav.map((mainNavLink, i) => {
        return <HeaderNavLink key={i} {...mainNavLink} />;
      })}
    </Box>
  );
};

export default HeaderNavLinks;
