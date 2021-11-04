import React from 'react';
import { Col, Row } from 'antd';

import Button from 'components/antd/button';
import Icon from 'components/custom/icon';

import './index.scss';

export const LandsClaim: React.FC = () => {
  return (
    <Row className="claim-component-container">
      <Col span={16} className="info-container">
        <p className="total-label">Total unclaimed rent</p>
        <p className="total-value">
          1242,22 <Icon name="token-usdc" className="coin-icon" />
        </p>
      </Col>
      <Col span={8}>
        <Button
          className="claim-button"
          type="primary"
          onClick={() => {
            console.log('show modal');
          }}>
          Claim
        </Button>
      </Col>
    </Row>
  );
};
