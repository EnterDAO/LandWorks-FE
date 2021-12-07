import React, { useEffect, useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { Link, useRouteMatch } from 'react-router-dom';
import { Col, Row } from 'antd';
import cn from 'classnames';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import { useGeneral } from 'components/providers/general-provider';
import { EnterToken } from 'components/providers/known-tokens-provider';
import { useWarning } from 'components/providers/warning-provider';
import { LandsNav } from 'modules/land-works/components/lands-header-nav';
import { LandsNavMobile } from 'modules/land-works/components/lands-header-nav-mobile';
import ConnectedWallet from 'wallets/components/connected-wallet';
import { MetamaskConnector } from 'wallets/connectors/metamask';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

const modalRoot = document.getElementById('modal-root') || document.body;

const LayoutHeader: React.FC = () => {
  const { navOpen, setNavOpen } = useGeneral();
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const wallet = useWallet();
  const { warns } = useWarning();

  const { styles, attributes, forceUpdate, state } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    strategy: 'absolute',
  });

  useEffect(() => {
    forceUpdate?.();
  }, [warns.length]);

  useEffect(() => {
    if (navOpen && window.innerWidth > 768) {
      setNavOpen(false);
    }
  }, [window.innerWidth]);

  async function handleAddProjectToken() {
    if (wallet.connector?.id === 'metamask') {
      try {
        const connector = new MetamaskConnector({ supportedChainIds: [] });
        await connector.addToken({
          type: 'ERC20',
          options: {
            address: EnterToken.address,
            symbol: EnterToken.symbol,
            decimals: EnterToken.decimals,
            image: `${window.location.origin}/enterdao.png`,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <div className={`${s.component} ${navOpen ? `${s.mobileNavOpen}` : ''}`} ref={setReferenceElement}>
      <ExternalLink href="/" target="_self">
        <Icon name="png/LandWorksLogo" width="auto" height="auto" className={s.logo} />
      </ExternalLink>
      <h1 className={`${s.title} ${wallet.account ? `${s.logged}` : ''}`}>LandWorks</h1>

      {wallet.account && <LandsNav />}

      {wallet.isActive && wallet.connector?.id === 'metamask' && (
        <div className={s.addTokenWrapper}>
          <button type="button" onClick={handleAddProjectToken} className={s.addTokenButton}>
            <Icon name="png/ListProperty" width={32} height={32} style={{ transform: 'scale(1.5)' }} />
          </button>
        </div>
      )}

      <ConnectedWallet />
      <Button type="link" className={s.burger} onClick={() => setNavOpen(prevState => !prevState)}>
        <Icon name={navOpen ? 'burger-close' : 'burger'} style={{ color: 'var(--theme-white-color)' }} />
      </Button>
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
            {...attributes.popper}>
            <div className={s.mobileInner}>
              <div className={s.mobileMenuInner}>
                <Row style={{ width: '100%' }}>
                  <Col span={24}>
                    <LandsNavMobile setNavOpen={setNavOpen} />
                  </Col>
                </Row>
              </div>
            </div>
          </div>,
          modalRoot,
        )}
    </div>
  );
};

export default LayoutHeader;
