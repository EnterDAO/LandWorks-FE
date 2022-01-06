import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bottom, end } from '@popperjs/core';
import { Card, Col, Image, Row } from 'antd';
import BigNumber from 'bignumber.js';

import Icon from 'components/custom/icon';
import { getTokenPrice } from 'components/providers/known-tokens-provider';
import { getLandImageUrl, getTokenIconName } from 'helpers/helpers';

import { AssetEntity } from '../../api';
import { PricePerSecondInfo } from '../price-per-second-info';
import landImage from './assets/land.png';

import './index.scss';

interface ILandWorksCardProps {
  land: AssetEntity;
}

const LandWorksCard: React.FC<ILandWorksCardProps> = ({ land }) => {
  const history = useHistory();
  const [showChart, setShowChart] = useState(false);
  const [usdPrice, setUsdPrice] = useState('0');

  useEffect(() => {
    flexFont();
    getUsdPrice();
  }, [land]);

  const getUsdPrice = () => {
    const ethPrice = new BigNumber(getTokenPrice(land.paymentToken.symbol) || '0');
    const ethToUsdPrice = ethPrice.multipliedBy(land.pricePerMagnitude.price);
    setUsdPrice(ethToUsdPrice.toFixed());
  };

  const flexFont = () => {
    const divs = document.getElementsByClassName('price-eth');
    for (let i = 0; i < divs.length; i++) {
      const element = divs[i] as HTMLElement;
      const relFontsize = element.offsetWidth * 0.05;
      element.style.fontSize = relFontsize + 'px';
    }
  };

  return (
    <Col className="land-card-wrapper" xl={8} md={8} sm={12} xs={24}>
      <Card className="land-card">
        <Row>
          <Col span={24}>
            <p className="land-name">
              <span>{land.name}</span>
              {land.isHot && (
                <span className="label card-name-hot-label">
                  <Icon name="png/hot" className="name-label" />
                  HOT
                </span>
              )}
              {!land.decentralandData?.isLAND && <span className="label card-name-estate-label">ESTATE</span>}
            </p>
          </Col>
        </Row>
        <Row>
          <Image
            onClick={() => history.push(`/land-works/land/${land.id}`)}
            placeholder={<Image className="land-image" src={landImage} preview={false} />}
            className="land-image"
            src={getLandImageUrl(land)}
            preview={false}
          />
        </Row>
        <Row>
          <Col span={16}>
            <Row className="land-info-row" align={bottom}>
              <Col span={24} className="price-eth-container">
                <Icon name={getTokenIconName(land.paymentToken.symbol)} className="eth-icon" />
                <span className="price-eth">{land.pricePerMagnitude.price}</span>
              </Col>
              <Col span={24}>
                <span className="land-price-info">
                  <span className="price">${usdPrice}</span>
                  <span className="per-day">/ {land.pricePerMagnitude.magnitude}</span>
                  <button onClick={() => setShowChart(!showChart)}>
                    <Icon name="info-outlined" className="info-icon" />
                  </button>
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row className="land-available-row" justify={end}>
              <Col span={24}>
                <p className="available-heading">Available now</p>
              </Col>
              <Col span={24}>
                <p className="available-period">{land.availability}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {showChart && (
          <Row className="price-chart-container">
            <Col span={24}>
              <PricePerSecondInfo pricePerSecond={land.pricePerSecond.toFixed()} />
            </Col>
          </Row>
        )}
      </Card>
    </Col>
  );
};

export default LandWorksCard;
