import React from 'react';
import { Link } from 'react-router-dom';
import * as Antd from 'antd';
import { Col, Row } from 'antd';
import cn from 'classnames';

import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';

import s from './s.module.scss';

const LayoutFooter: React.FC = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className={s.footer}>
      <div className="container-limit">
        <Row
          className={s.footerContent}
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}>
          <Col xs={24} sm={24} md={24} lg={19} xl={19} style={{ paddingTop: '30px' }}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={14} xl={12}>
                <Row align={'middle'} gutter={20}>
                  <Col xs={6} sm={3} md={4} lg={4} xl={4} style={{ textAlign: 'center' }}>
                    <Icon name="png/LandWorksLogo" width="56" height="56" />
                  </Col>
                  <Col xs={18} sm={21} md={20} lg={18} xl={18}>
                    <p className={s.text}>
                      Rent or Lend metaverse assets through community-owned Marketplace, governed by the $ENTR token.
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: 10 }}
                xl={{ span: 10 }}
                style={{ textAlign: 'end' }}>
                <span className={s.text}>- a project by EnterDAO </span>
                <Icon name="png/enterdao" width="56" height="56" />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={5} xl={5} className={s.nav}>
            <Row justify="center">
              <Col xs={10} sm={10} md={10} lg={12} xl={12}>
                <Row justify="center">
                  <Col xs={13} sm={13} md={13} lg={24} xl={24}>
                    <Link to="/" className={s.linkTitle}>
                      Products
                    </Link>
                  </Col>
                  <Col xs={13} sm={13} md={13} lg={24} xl={24}>
                    <Link to="/" className={(s.linkAnchor, s.linkLandWorks)}>
                      LandWorks
                    </Link>
                  </Col>
                  <Col xs={13} sm={13} md={13} lg={24} xl={24}>
                    <Link to="/" className={s.linkAnchor}>
                      MetaPortal
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col xs={14} sm={10} md={10} lg={12} xl={12}>
                <Row justify="center">
                  <Col xs={13} sm={13} md={13} lg={24} xl={24}>
                    <Link to="/" className={s.linkTitle}>
                      NFT Drops
                    </Link>
                  </Col>
                  <Col xs={13} sm={13} md={13} lg={24} xl={24}>
                    <Link to="/" className={s.linkAnchor}>
                      Sharded Minds
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className={cn(s.row, s.copyrightsBlock)}>
          <div className={s.copyrightLink}>Enterdao.xyz © {getYear()}. Open-sourced.</div>
          <div className={s.sLinksWrap}>
            {/* //TODO:: Update the icon with Github */}
            <ExternalLink href="https://github.com/EnterDAO" className={s.sLink}>
              <Icon name="twitter" width="20" height="20" />
            </ExternalLink>
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
