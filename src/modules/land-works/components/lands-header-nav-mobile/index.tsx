import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

import ExternalLink from 'components/custom/externalLink';
import Identicon from 'components/custom/identicon';
import { Text } from 'components/custom/typography';
import { useWallet } from 'wallets/wallet';

import './index.scss';

interface INavProps {
  setNavOpen: (a: boolean) => void;
}

export const LandsNavMobile: React.FC<INavProps> = ({ setNavOpen }) => {
  const wallet = useWallet();

  return (
    <Row className="lands-nav-container-mobile" gutter={[16, 16]}>
      <Col span={24}>
        <Link to="/#" className="menu-item-mobile active" onClick={() => setNavOpen(false)}>
          <span>All</span>
        </Link>
      </Col>
      <Col span={24}>
        <Link to="/#" className="menu-item-mobile" onClick={() => setNavOpen(false)}>
          <span>Renting</span>
        </Link>
      </Col>
      <Col span={24}>
        <Link to="/#" className="menu-item-mobile" onClick={() => setNavOpen(false)}>
          <span>Lending</span>
        </Link>
      </Col>
      <Col span={24} className="menu-item-mobile-divider">
        <hr></hr>
      </Col>
      <Col span={24}>
        <Link to="/#" className="menu-item-mobile" onClick={() => setNavOpen(false)}>
          <span>List Property</span>
        </Link>
      </Col>
      <Col span={24} className="menu-item-mobile-divider">
        <hr></hr>
      </Col>
      <Col span={12} className="menu-user-address">
        <Identicon address={wallet.account} width={40} height={40} />
        <ExternalLink href={getEtherscanAddressUrl(wallet.account!)}>
          <Text type="p1" weight="semibold" color="blue">
            {shortenAddr(wallet.account, 8, 8)}
          </Text>
        </ExternalLink>
      </Col>
      <Col span={12}>
        <button type="button" className="button button-ghost" onClick={() => wallet.disconnect()}>
          <span>Disconnect</span>
        </button>
      </Col>
    </Row>
  );
};
