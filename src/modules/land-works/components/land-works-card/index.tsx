import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bottom, end } from '@popperjs/core';
import { Card, Col, Image, Row } from 'antd';

import Icon from 'components/custom/icon';

import { LandCartChart } from '../land-cart-chart';
import landImage from './assets/land.png';

import './index.scss';

interface ILandWorksCardProps {
  land: any;
}
const LandWorksCard: React.FC<ILandWorksCardProps> = ({ land }) => {
  const history = useHistory();
  const [showChart, setShowChart] = useState(false);

  return (
    <Col className="land-card-wrapper" xl={8} md={8} sm={12} xs={24}>
      <Card className="land-card">
        <Row>
          <Col span={24}>
            <p className="land-name">
              <span>{land.name}</span>
              <span className="label card-name-hot-label">
                <Icon name="png/hot" className="name-label" />
                HOT
              </span>
            </p>
          </Col>
        </Row>
        <Row>
          <Image
            onClick={() => history.push(`/land-works/land/${land.id}`)}
            placeholder={<Image className="land-image" src={landImage} preview={false} />}
            className="land-image"
            src={landImage}
            preview={false}
          />
        </Row>
        <Row>
          <Col span={12}>
            <Row className="land-info-row" align={bottom}>
              <Col span={24} className="price-eth-container">
                <Icon name="png/eth" className="eth-icon" />
                <span className="price-eth">{land.price}</span>
              </Col>
              <Col span={24}>
                <span className="land-price-info">
                  <span className="price">$220</span>
                  <span className="per-day">/ day</span>
                  <button onClick={() => setShowChart(!showChart)}>
                    <Icon name="info-outlined" className="info-icon" />
                  </button>
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="land-available-row" justify={end}>
              <Col span={24}>
                <p className="available-heading">Available now</p>
              </Col>
              <Col span={24}>
                <p className="available-period"> 2-5 days</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {showChart && (
          <Row className="price-chart-container">
            <Col span={24}>
              <LandCartChart />
            </Col>
          </Row>
        )}
      </Card>
    </Col>
  );
};

export default LandWorksCard;
