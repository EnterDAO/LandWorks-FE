import React from 'react';
import { Col, Row } from 'antd';

import Button from 'components/antd/button';

import { ReactComponent as Background } from '../../../../resources/svg/accent-background.svg';

import './index.scss';

interface props {
  onButtonClick: (isShown: boolean) => void;
  subHeading: string;
  mainHeading: string;
  buttonText: string;
  isClaimButtonDisabled: boolean;
}

export const LandsAction: React.FC<props> = (props: props) => {
  const { onButtonClick, buttonText, subHeading, mainHeading, isClaimButtonDisabled } = props;
  return (
    <Row className="claim-component-container">
      <Background className="background" />
      <Col span={16} className="info-container">
        <p className="total-label">{subHeading}</p>
        <p className="total-value">{mainHeading}</p>
      </Col>
      <Col span={8}>
        <Button
          className="claim-button"
          type="primary"
          disabled={isClaimButtonDisabled}
          onClick={() => {
            onButtonClick(true);
          }}
        >
          {buttonText}
        </Button>
      </Col>
    </Row>
  );
};
