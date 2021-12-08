import React from 'react';
import { Col, Row } from 'antd';

import { ReactComponent as LeftBlocks } from 'resources/svg/landing/hero-left-blocks.svg';
import { ReactComponent as RightBlocks } from 'resources/svg/landing/hero-right-blocks.svg';

import './index.scss';

export const Hero: React.FC = () => (
  <section className="wrapper">
    <LeftBlocks className="left-blocks" />
    <RightBlocks className="right-blocks" />
    <div className="content-container">
      <Row>
        <Col>
          <h2>Metaverse land</h2>
          <h1>Renting marketplace</h1>
          <button type="button" className="button-primary">
            <span>Coming soon</span>
          </button>
        </Col>
      </Row>
    </div>
  </section>
);
