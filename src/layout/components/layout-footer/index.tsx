import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import ExternalLink from 'components/custom/external-link';
import Icon, { IconNames } from 'components/custom/icon';
import { Box, Typography } from 'design-system';
import { LANDING_ROUTES } from 'router/routes';

import styles from './layout-footer.module.scss';

interface Props {
  isWrapped?: boolean;
}

interface SocialLink {
  icon: IconNames;
  href: string;
}

// TODO: move in more suitable folder
export const socialsLinks: SocialLink[] = [
  {
    icon: 'github',
    href: 'https://github.com/EnterDAO',
  },
  {
    icon: 'twitter',
    href: 'https://twitter.com/EnterDao',
  },
  {
    icon: 'discord',
    href: 'https://discord.gg/7QJvEctG2G',
  },
  {
    icon: 'dune',
    href: 'https://dune.com/rakis/LandWorks',
  },
  {
    icon: 'coingecko',
    href: 'https://www.coingecko.com/en/coins/enterdao',
  },
  {
    icon: 'medium',
    href: 'https://medium.com/enterdao',
  },
];

export const FooterSocialList: FC = () => {
  return (
    <div className={styles['social-media-container']}>
      {socialsLinks.map((socialLink, i) => {
        return (
          <ExternalLink key={i} href={socialLink.href} className={styles['social-media-container--link']}>
            <Icon name={socialLink.icon} width="20" height="20" />
          </ExternalLink>
        );
      })}
    </div>
  );
};

export const FooterNav: FC = () => {
  return (
    <div className={styles['links-container']}>
      <ExternalLink href="https://enterdao.xyz/" className={styles.linkAnchor}>
        EnterDAO
      </ExternalLink>

      <Link to={LANDING_ROUTES.home} className={styles.linkAnchor}>
        LandWorks
      </Link>

      <ExternalLink href="https://metaportal.gg/" className={styles.linkAnchor}>
        MetaPortal
      </ExternalLink>

      <ExternalLink href="https://docs.landworks.xyz/" className={styles.linkAnchor}>
        Documentation
      </ExternalLink>
    </div>
  );
};

export const Copyright: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Typography fontWeight={500} variant="body2">
      landworks.xyz © {currentYear}. Open-sourced.
    </Typography>
  );
};

const LayoutFooter: React.FC<Props> = ({ isWrapped = true }) => {
  return (
    <footer className={`${styles.root} ${isWrapped ? styles['root--wrapped'] : ''}`}>
      <div className={styles.container}>
        <Box mb={{ xs: 10, md: 8 }}>
          <FooterSocialList />
        </Box>

        <Box mb={10}>
          <FooterNav />
        </Box>

        <div className={styles.bottom}>
          <Icon name="png/LandWorksLogo" width="48" height="48" />
          <Copyright />
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;
