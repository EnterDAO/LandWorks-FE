/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentProps, forwardRef } from 'react';
import { NavLinkProps } from 'react-router-dom';
import { styled } from '@mui/system';

import StyledNavLink from 'components/styled/nav-link';
import { Box } from 'design-system';
import typographyStyles from 'themes/typography-styles';

import { THEME_COLORS } from 'themes/theme-constants';

export interface HeaderNavLinkProps extends Pick<ComponentProps<typeof StyledNavLink>, 'to' | 'exact'> {
  label: string;
  external?: boolean;
  Icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

const HeaderNavLinkRoot = styled('a')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  ...typographyStyles.button,
  color: THEME_COLORS.grey02,
  transition: 'all 0.2s',
  ':after': {
    content: '""',
    display: 'none',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 5,
    backgroundColor: THEME_COLORS.accentBlue,
    boxShadow: `0px 0px 7px 1px ${THEME_COLORS.accentBlue}`,
    opacity: 0,
    transition: 'all 0.2s',
    borderRadius: '2px 2px 0 0',
    [theme.breakpoints.up(1130)]: {
      display: 'block',
    },
  },
  '&.active:after': {
    opacity: 1,
  },
  '&.active, :hover, :active': {
    color: THEME_COLORS.light,
  },
}));

const HeaderNavLink = forwardRef<HTMLAnchorElement, HeaderNavLinkProps>(({ Icon, label, external, exact, to }, ref) => {
  let linkProps = {};

  if (external && typeof to === 'string') {
    linkProps = {
      href: to,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  } else {
    linkProps = {
      to,
      exact,
      as: StyledNavLink,
      isActive: (match, location) => {
        if (!match) {
          return false;
        }

        if (exact) {
          return typeof to === 'string' ? to.includes(location.hash) : (to.hash || '') === location.hash;
        }

        return true;
      },
    } as Pick<NavLinkProps, 'isActive' | 'to' | 'exact'>;
  }

  return (
    <HeaderNavLinkRoot ref={ref} {...linkProps}>
      {Icon && (
        <Box width={20} height={20} mr="12px">
          <Icon />
        </Box>
      )}

      {label}
    </HeaderNavLinkRoot>
  );
});

export default HeaderNavLink;
