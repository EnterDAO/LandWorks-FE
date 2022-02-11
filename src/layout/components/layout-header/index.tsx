/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Col, Row } from 'antd';
import cn from 'classnames';

import Button from 'components/antd/button';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import LandsNav from 'modules/land-works/components/lands-header-nav';
import { LandsTooltip } from 'modules/land-works/components/lands-tooltip';
import { useGeneral } from 'providers/general-provider';
import { useWarning } from 'providers/warning-provider';
import ConnectedWallet from 'wallets/components/connected-wallet';
import { useWallet } from 'wallets/wallet';

import { ReactComponent as ListIcon } from '../../../resources/svg/list-property.svg';
import { ReactComponent as TextLogo } from '../../../resources/svg/landWorks-logo.svg';

import s from './s.module.scss';

const modalRoot = document.getElementById('modal-root') || document.body;

const LayoutHeader: React.FC = () => {
  const history = useHistory();
  const { navOpen, setNavOpen } = useGeneral();
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const wallet = useWallet();
  const { warns } = useWarning();

  const { styles, attributes, forceUpdate, state } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    strategy: 'absolute',
  });

  const isLandingPage = useRouteMatch({
    path: ['/', '/'],
    strict: true,
    sensitive: true,
  });

  useEffect(() => {
    forceUpdate?.();
  }, [warns.length]);

  useEffect(() => {
    if (navOpen && window.innerWidth > 768) {
      setNavOpen(false);
    }
  }, [window.innerWidth]);

  return (
    <div className={`${s.component} ${navOpen ? `${s.mobileNavOpen}` : ''}`} ref={setReferenceElement}>
      <div style={{ cursor: 'pointer' }} onClick={() => history.push('/all')}>
        <Icon name="png/LandWorksLogo" width="auto" height="auto" className={s.logo} />
      </div>
      <h1 className={`${s.title} ${wallet.account ? `${s.logged}` : ''}`} onClick={() => history.push('/all')}>
        LandWorks
      </h1>

      {wallet.account && !isLandingPage?.isExact && <LandsNav />}

      {wallet.isActive && wallet.connector?.id === 'metamask' && !isLandingPage?.isExact && (
        <div className={s.addTokenWrapper}>
          <LandsTooltip placement="bottom" trigger="hover" text="List new property">
            <button type="button" onClick={() => history.push('/list')} className={s.addTokenButton}>
              <ListIcon />
            </button>
          </LandsTooltip>
        </div>
      )}

      {isLandingPage?.isExact && (
        <Button type="link" className={s.burger} onClick={() => setNavOpen((prevState) => !prevState)}>
          <Icon name={navOpen ? 'burger-close' : 'burger'} style={{ color: 'var(--theme-white-color)' }} />
        </Button>
      )}

      {isLandingPage?.isExact && (
        <nav className={s.nav}>
          <a
            href="#about"
            className={s.navLink}
            onClick={() => {
              const aboutSection = document.querySelector('.about-wrapper') as HTMLElement;
              if (aboutSection !== null) {
                window.scrollTo({ top: aboutSection.offsetTop, left: 0, behavior: 'smooth' });
              }
            }}
          >
            <span>About</span>
          </a>
          <a
            href="#why"
            className={s.navLink}
            onClick={() => {
              const aboutSection = document.querySelector('.how-it-works-wrapper') as HTMLElement;
              if (aboutSection !== null) {
                window.scrollTo({ top: aboutSection.offsetTop, left: 0, behavior: 'smooth' });
              }
            }}
          >
            <span>Why Rent ?</span>
          </a>
          <ExternalLink href="https://docs.landworks.xyz" target="_blank" className={s.navLink}>
            <span>Docs</span>
          </ExternalLink>
        </nav>
      )}

      {isLandingPage?.isExact ? null : <ConnectedWallet />}

      {navOpen &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            className={cn(s.mobileMenu, { [s.open]: navOpen })}
            style={
              {
                ...styles.popper,
                bottom: 0,
                right: 0,
                '--top': `${state?.modifiersData?.popperOffsets?.y || 0}px`,
              } as React.CSSProperties
            }
            {...attributes.popper}
          >
            <div className={s.mobileInner}>
              <div className={s.mobileMenuInner}>
                <Row style={{ width: '100%' }}>
                  <Col span={24}>
                    {isLandingPage?.isExact && (
                      <div className={s.mobileMenuBlock}>
                        <h3>Info</h3>
                        <a
                          href="#about"
                          className={s.dropdownLink}
                          onClick={() => {
                            const aboutSection = document.querySelector('.about-wrapper') as HTMLElement;
                            if (aboutSection !== null) {
                              window.scrollTo({ top: aboutSection.offsetTop, left: 0, behavior: 'smooth' });
                            }
                            setNavOpen(false);
                          }}
                        >
                          <Icon name="whitepaper" width={20} height={20} className={s.dropdownIcon} />
                          <span>About</span>
                        </a>
                        <a
                          href="#why"
                          className={s.dropdownLink}
                          onClick={() => {
                            const aboutSection = document.querySelector('.how-it-works-wrapper') as HTMLElement;
                            if (aboutSection !== null) {
                              window.scrollTo({ top: aboutSection.offsetTop, left: 0, behavior: 'smooth' });
                            }
                            setNavOpen(false);
                          }}
                        >
                          <Icon name="team" width={20} height={20} className={s.dropdownIcon} />
                          <span>Why Rent ?</span>
                        </a>
                        <ExternalLink
                          href="https://docs.landworks.xyz"
                          className={s.dropdownLink}
                          onClick={() => setNavOpen(false)}
                        >
                          <Icon name="docs" width={20} height={20} className={s.dropdownIcon} />
                          <span>Docs</span>
                        </ExternalLink>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </div>,
          modalRoot
        )}
    </div>
  );
};

export default LayoutHeader;
