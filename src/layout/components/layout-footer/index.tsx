import React from 'react';
import { Link } from 'react-router-dom';

import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';

import styles from './layout-footer.module.scss';

interface Props {
  isWrapped?: boolean;
}

const LayoutFooter: React.FC<Props> = ({ isWrapped = true }) => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className={`${styles.root} ${isWrapped ? styles['root--wrapped'] : ''}`}>
      <div className={styles.container}>
        <div className={styles['social-media-container']}>
          <ExternalLink href="https://github.com/EnterDAO" className={styles['social-media-container--link']}>
            <Icon name="png/Github" width="20" height="20" />
          </ExternalLink>
          <ExternalLink href="https://twitter.com/EnterDao" className={styles['social-media-container--link']}>
            <Icon name="twitter" width="20" height="20" />
          </ExternalLink>
          <ExternalLink href="https://discord.gg/7QJvEctG2G" className={styles['social-media-container--link']}>
            <Icon name="discord" width="20" height="20" />
          </ExternalLink>
          <ExternalLink
            href="https://www.coingecko.com/en/coins/enterdao"
            className={styles['social-media-container--link']}
          >
            <Icon name="coingecko" width="20" height="20" />
          </ExternalLink>
          <ExternalLink href="https://medium.com/enterdao" className={styles['social-media-container--link']}>
            <Icon name="medium" width="20" height="20" />
          </ExternalLink>
        </div>

        <div className={styles['links-container']}>
          <ExternalLink href="https://enterdao.xyz/" className={styles.linkAnchor}>
            EnterDAO
          </ExternalLink>

          <Link to="/" className={styles.linkAnchor}>
            LandWorks
          </Link>

          <ExternalLink href="https://metaportal.gg/" className={styles.linkAnchor}>
            MetaPortal
          </ExternalLink>

          <ExternalLink href="https://docs.landworks.xyz/" className={styles.linkAnchor}>
            Documentation
          </ExternalLink>
        </div>

        <div className={styles.bottom}>
          <Icon name="png/LandWorksLogo" width="39" height="37" />
          <div className={styles.copyrightLink}>landworks.xyz © {getYear()}. Open-sourced.</div>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;
