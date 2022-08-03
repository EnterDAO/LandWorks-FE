/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { Drawer } from '@mui/material';
import { styled } from '@mui/system';

import ExternalLink from 'components/custom/external-link';
import Icon from 'components/custom/icon';
import { Box, Button, Stack, Typography } from 'design-system';
import ConnectedWallet from 'wallets/components/connected-wallet';
import { useWallet } from 'wallets/wallet';

import { ReactComponent as TextLogo } from '../../../resources/svg/landWorks-logo.svg';
import { ReactComponent as BurgerCloseIcon } from '../../../resources/svg/menu-close.svg';
import { ReactComponent as BurgerIcon } from '../../../resources/svg/menu.svg';
import { socialsLinks } from '../layout-footer';

import { THEME_COLORS } from 'themes/theme-constants';

import styles from './layout-header.module.scss';

const mainNav: NavLinkProps[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/#why',
    label: 'Why Rent?',
  },
  {
    path: 'https://docs.landworks.xyz',
    label: 'Docs',
    isExternal: true,
  },
  {
    path: '/faq',
    label: 'FAQ',
  },
  {
    path: '/grants-program',
    label: 'Grant Program',
  },
];

const NavLinkRoot = styled(Link, { shouldForwardProp: (propName) => propName !== 'sx' })({});

interface NavLinkProps {
  path: string;
  label: string;
  isExternal?: boolean;
}

const NavLink = ({ isExternal, label, path }: NavLinkProps) => {
  const location = useLocation();

  if (isExternal) {
    return (
      <ExternalLink style={{ margin: 0 }} href={path} target="_blank" className={styles.navLink}>
        <Typography color={THEME_COLORS.grey02} variant="button">
          {label}
        </Typography>
      </ExternalLink>
    );
  }

  const isActive = `${location.pathname}${location.hash}` === path;

  return (
    <Link to={path} style={{ margin: 0 }} className={styles.navLink + ' selected'}>
      <Typography color={isActive ? THEME_COLORS.light : THEME_COLORS.grey02} variant="button">
        {label}
      </Typography>

      <Box
        display={{ xs: 'none', lg: 'block' }}
        className={isActive ? styles.activeTab : ''}
        sx={{
          bottom: '0 !important',
        }}
      />
    </Link>
  );
};

const LayoutHeader: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);
  const isExplorePage = !!useRouteMatch({
    path: '/explore',
  });
  const isWalletConnected = !!wallet.account;
  const toggleIsMobileNavOpened = () => setIsMobileNavOpened((prevState) => !prevState);

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
        <NavLinkRoot
          to="/explore"
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
        </NavLinkRoot>

        <Box display={{ lg: 'none' }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            color={THEME_COLORS.light}
            border="none"
            bgcolor="transparent"
            m={0}
            p={0}
            onClick={toggleIsMobileNavOpened}
            component="button"
          >
            {isMobileNavOpened ? <BurgerCloseIcon /> : <BurgerIcon />}
          </Box>

          <Drawer
            ModalProps={{
              sx: {
                zIndex: 998,
              },
            }}
            PaperProps={{
              sx: {
                mt: 14,
                bgcolor: THEME_COLORS.darkBlue01,
                py: 12,
                px: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              },
            }}
            BackdropProps={{
              sx: {
                bgcolor: 'rgba(2, 2, 23, 0.7)',
                backdropFilter: 'blur(5px)',
              },
            }}
            anchor="top"
            onClose={toggleIsMobileNavOpened}
            open={isMobileNavOpened}
          >
            <Stack gap={6} px={3}>
              {mainNav.map((navLink) => {
                return <NavLink key={navLink.path} {...navLink} />;
              })}
            </Stack>

            {isExplorePage ? (
              !isWalletConnected && <ConnectedWallet />
            ) : (
              <Button
                sx={{ flexShrink: 0 }}
                onClick={() => history.push('/explore')}
                btnSize="medium"
                variant="gradient"
              >
                EXPLORE
              </Button>
            )}
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
          </Drawer>
        </Box>

        <Box
          display={{ xs: 'none', lg: 'flex' }}
          flexGrow={1}
          height={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width={2} height={20} bgcolor={THEME_COLORS.grey01} borderRadius="1px" mx={8} />
          <Box component="nav" height={1} display="flex" gap={{ xs: 6, xl: 8 }} flexGrow={1}>
            {mainNav.map((mainNavLink, i) => {
              return <NavLink key={i} {...mainNavLink} />;
            })}
          </Box>

          {isExplorePage ? (
            !isWalletConnected && <ConnectedWallet />
          ) : (
            <Button
              sx={{ minWidth: { xl: '200px !important' }, height: { xl: '52px !important' } }}
              onClick={() => history.push('/explore')}
              btnSize="small"
              variant="gradient"
            >
              EXPLORE
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutHeader;
