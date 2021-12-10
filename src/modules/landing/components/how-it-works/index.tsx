import React from 'react';
import { Col, Row } from 'antd';

import { ReactComponent as HowItWorksGraphics } from 'resources/svg/landing/how-it-works-graphics.svg';

import './index.scss';

export const HowItWorks: React.FC = () => (
  <section className="how-it-works-wrapper">
    <div className="content-container">
      <Row justify="center">
        <Col span={24} className="how-it-works-bullets">
          <Row justify="center">
            <Col sm={12} md={6} className="how-it-works-title">
              <h3>Capital efficiency for Metaverse Land</h3>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={8} className="left-bullets">
              <div>
                <h3>Affordability</h3>
                <p>Rent land that will otherwise be prohibitevely expensive</p>
              </div>
              <div>
                <h3>Accessibility</h3>
                <p>Rent land that will otherwise be unavailble</p>
              </div>
            </Col>
            <Col span={8} className="middle-graphics">
              <HowItWorksGraphics />
            </Col>
            <Col span={8} className="right-bullets">
              <div>
                <h3>Governance</h3>
                <p>Fully decentralised. $ENTR holders govern the future of the protocol</p>
              </div>
              <div>
                <h3>Pooling adjacent land</h3>
                <p>Renters can safely pool adjacent land and utilise a bigger space for experience/scene deployment</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  </section>
);
