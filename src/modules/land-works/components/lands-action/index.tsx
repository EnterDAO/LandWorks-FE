import React from 'react';
import { Col, Row } from 'antd';

import Button from 'components/antd/button';
import Icon from 'components/custom/icon';

import './index.scss';

interface props {
  onButtonClick: (isShown: boolean) => void;
  subHeading: string;
  mainHeading: string;
  buttonText: string;
}

export const LandsAction: React.FC<props> = (props: props) => {
  const { onButtonClick, buttonText, subHeading, mainHeading } = props;
  return (
    <Row className="claim-component-container">
      <Col span={16} className="info-container">
        <p className="total-label">{subHeading}</p>
        <p className="total-value">{mainHeading}</p>
      </Col>
      <Col span={8}>
        <Button
          className="claim-button"
          type="primary"
          onClick={() => {
            onButtonClick(true);
          }}>
          {buttonText}
        </Button>
      </Col>
    </Row>
  );
};
