/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';

import ExternalLink from 'components/custom/external-link';
import Icon from 'components/custom/icon';
import { Button, Grid } from 'design-system';
import LandsNav from 'modules/land-works/components/lands-header-nav';
import { useGeneral } from 'providers/general-provider';
import { useWarning } from 'providers/warning-provider';
import ConnectedWallet from 'wallets/components/connected-wallet';
import { useWallet } from 'wallets/wallet';

import { ReactComponent as TextLogo } from '../../../resources/svg/landWorks-logo.svg';

import styles from './layout-header.module.scss';

const modalRoot = document.getElementById('modal-root') || document.body;

const LayoutHeader: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const history = useHistory();
  const { navOpen, setNavOpen } = useGeneral();
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const wallet = useWallet();
  const { warns } = useWarning();

  const {
    styles: stylePopper,
    attributes,
    forceUpdate,
    state,
  } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    strategy: 'absolute',
  });

  const isLandingPage = useRouteMatch({
    path: ['/', '/'],
    strict: true,
    sensitive: true,
  });

  useEffect(() => {
    if (isLandingPage) setActiveTab(0);
  }, []);

  useEffect(() => {
    forceUpdate?.();
  }, [warns.length]);

  useEffect(() => {
    if (navOpen && window.innerWidth > 768) {
      setNavOpen(false);
    }
  }, [window.innerWidth]);

  return (
    <div className={`${styles.root} ${navOpen ? `${styles.mobileNavOpen}` : ''}`} ref={setReferenceElement}>
      <Link to="/explore" style={{ display: 'flex', alignItems: 'center' }}>
        <Icon name="png/LandWorksLogo" width="auto" height="auto" className={styles.logo} />
        <div className={`${styles.title} ${wallet.account ? `${styles.logged}` : ''}`}>
          <TextLogo />
        </div>
      </Link>
      {!isLandingPage?.isExact && <LandsNav />}
      {/* {isLandingPage?.isExact && (
        <Button type="link" className={s.burger} onClick={() => setNavOpen((prevState) => !prevState)}>
          <Icon name={navOpen ? 'burger-close' : 'burger'} style={{ color: 'var(--theme-white-color)' }} />
        </Button>
      )} */}
      {isLandingPage?.isExact && (
        <nav className={styles.nav}>
          <div className={styles.divider} />
          <a
            href="#home"
            className={styles.navLink + ' selected'}
            onClick={() => {
              const aboutSection = document.querySelector('.home') as HTMLElement;
              if (aboutSection !== null) {
                window.scrollTo({ top: aboutSection.offsetTop - 100, left: 0, behavior: 'smooth' });
              }
              setActiveTab(0);
            }}
          >
            <div>Home</div>
            <div className={!activeTab ? styles.activeTab : ''}></div>
          </a>
          <a
            href="#why"
            className={styles.navLink}
            onClick={() => {
              const aboutSection = document.querySelector('.why') as HTMLElement;
              if (aboutSection !== null) {
                window.scrollTo({ top: aboutSection.offsetTop - 100, left: 0, behavior: 'smooth' });
              }
              setActiveTab(1);
            }}
          >
            <span>Why Rent ?</span>
            <div className={activeTab === 1 ? styles.activeTab : ''}></div>
          </a>
          <ExternalLink href="https://docs.landworks.xyz" target="_blank" className={styles.navLink}>
            <span>Docs</span>
          </ExternalLink>
          <Link
            to="/faq"
            className={styles.navLink + ' selected'}
            onClick={() => {
              setActiveTab(2);
            }}
          >
            <div>FAQ</div>
            <div className={activeTab === 2 ? styles.activeTab : ''}></div>
          </Link>
          <Link
            to="/grants-program"
            className={styles.navLink + ' selected'}
            onClick={() => {
              setActiveTab(3);
            }}
          >
            <div>Grant Program</div>
            <div className={activeTab === 3 ? styles.activeTab : ''}></div>
          </Link>
        </nav>
      )}
      {isLandingPage?.isExact ? (
        <Button
          onClick={() => history.push('/explore')}
          style={{ marginLeft: 'auto' }}
          btnSize="medium"
          variant="gradient"
        >
          EXPLORE
        </Button>
      ) : (
        <ConnectedWallet />
      )}
      {navOpen &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            className={cn(styles.mobileMenu, { [styles.open]: navOpen })}
            style={
              {
                ...stylePopper.popper,
                bottom: 0,
                right: 0,
                '--top': `${state?.modifiersData?.popperOffsets?.y || 0}px`,
              } as React.CSSProperties
            }
            {...attributes.popper}
          >
            <div className={styles.mobileInner}>
              <div className={styles.mobileMenuInner}>
                <Grid container>
                  <Grid item>
                    {isLandingPage?.isExact && (
                      <div className={styles.mobileMenuBlock}>
                        <h3>Info</h3>
                        <a
                          href="#about"
                          className={styles.dropdownLink}
                          onClick={() => {
                            const aboutSection = document.querySelector('.about-wrapper') as HTMLElement;
                            if (aboutSection !== null) {
                              window.scrollTo({ top: aboutSection.offsetTop, left: 0, behavior: 'smooth' });
                            }
                            setNavOpen(false);
                          }}
                        >
                          <Icon name="whitepaper" width={20} height={20} className={styles.dropdownIcon} />
                          <span>About</span>
                        </a>
                        <a
                          href="#why"
                          className={styles.dropdownLink}
                          onClick={() => {
                            const aboutSection = document.querySelector('.how-it-works-wrapper') as HTMLElement;
                            if (aboutSection !== null) {
                              window.scrollTo({ top: aboutSection.offsetTop, left: 0, behavior: 'smooth' });
                            }
                            setNavOpen(false);
                          }}
                        >
                          <Icon name="team" width={20} height={20} className={styles.dropdownIcon} />
                          <span>Why Rent ?</span>
                        </a>
                        <ExternalLink
                          href="https://docs.landworks.xyz"
                          className={styles.dropdownLink}
                          onClick={() => setNavOpen(false)}
                        >
                          <Icon name="docs" width={20} height={20} className={styles.dropdownIcon} />
                          <span>Docs</span>
                        </ExternalLink>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>,
          modalRoot
        )}
    </div>
  );
};

export default LayoutHeader;
