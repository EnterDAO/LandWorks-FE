import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Antd from 'antd';
import { Col, Row } from 'antd';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';

import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import config, { ENTR_MARKET_LINK, ENTR_MARKET_LIQUIDITY_LINK } from 'config';

import s from './s.module.scss';

const LayoutFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className={s.footer}>
      <div className="container-limit">
        <Row className={s.footerContent}>
          <Col span={19} style={{ paddingTop: '30px' }}>
            <Row>
              <Col span={12}>
                <Row align={'middle'} gutter={20}>
                  <Col span={4}>
                    <Icon name="png/enterdao" width="56" height="56" />
                  </Col>
                  <Col span={18}>
                    <p className={s.text}>
                      Rent or Lend metaverse assets through community-owned Marketplace, governed by the $ENTR token.
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col span={12} push={3}>
                <span className={s.text}>a project by EnterDAO </span>
                <Icon name="png/enterdao" width="56" height="56" />
              </Col>
            </Row>
          </Col>
          <Col span={5}>
            <Row>
              <Col span={12}>
                <Row>
                  <Col>
                    <a href="#" className={s.linkTitle}>
                      Products
                    </a>
                  </Col>
                  <Col>
                    <a href="#" className={(s.linkAnchor, s.linkLandWorks)}>
                      LandWorks
                    </a>
                  </Col>
                  <Col>
                    <a href="#" className={s.linkAnchor}>
                      MetaPortal
                    </a>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col>
                    <a href="#" className={s.linkTitle}>
                      NFT Drops
                    </a>
                  </Col>
                  <Col>
                    <a href="#" className={s.linkAnchor}>
                      Sharded Minds
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className={cn(s.row, s.copyrightsBlock)}>
          <div className={s.copyrightLink}>Enterdao.xyz © {getYear()}. Open-sourced.</div>
          <div className={s.sLinksWrap}>
            <ExternalLink href="https://twitter.com/EnterDao" className={s.sLink}>
              <Icon name="twitter" width="20" height="20" />
            </ExternalLink>
            <ExternalLink href="https://discord.gg/7QJvEctG2G" className={s.sLink}>
              <Icon name="discord" width="20" height="20" />
            </ExternalLink>
            <ExternalLink href="https://www.coingecko.com/en/coins/enterdao" className={s.sLink}>
              <Icon name="coingecko" width="20" height="20" />
            </ExternalLink>
            <ExternalLink href="https://medium.com/enterdao" className={s.sLink}>
              <Icon name="medium" width="20" height="20" />
            </ExternalLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;
