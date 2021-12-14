import React from 'react';
import { Col, Row } from 'antd';

import { ReactComponent as OwnersGraphics } from 'resources/svg/landing/owners-graphics.svg';
import { ReactComponent as RentersGraphics } from 'resources/svg/landing/renters-graphics.svg';

import './index.scss';

export const About: React.FC = () => (
  <section className="about-wrapper">
    <div className="content-container">
      <Row justify="center">
        <Col span={8}>
          <p className="description">
            LandWorks enables <strong>renting</strong> of land in <strong>Web3 metaverse</strong> games
          </p>
        </Col>
      </Row>
      <Row
        justify="center"
        gutter={[
          { sm: 32, md: 60, lg: 100 },
          { sm: 32, md: 60, lg: 100 },
        ]}>
        <Col sm={24} md={12} lg={8} className="about-section">
          <OwnersGraphics />
          <h2>For land owners</h2>
          <p>Еarn passive income on your land by turning it into a productive asset</p>
        </Col>
        <Col sm={24} md={12} lg={8} className="about-section">
          <RentersGraphics />
          <h2>For renters</h2>
          <p>
            Leverage the power of metaverse games by renting in-game land instead of buying and holding it long-term
          </p>
        </Col>
      </Row>
    </div>
  </section>
);
