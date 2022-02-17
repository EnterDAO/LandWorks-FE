import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Col, Image, Row } from 'antd';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { getLandImageUrl, getTokenIconName } from 'helpers/helpers';

import { ReactComponent as FireIcon } from '../../../../resources/svg/white_fire.svg';
import { AssetEntity } from '../../api';
import { PricePerSecondInfo } from '../price-per-second-info';
import landImage from './assets/land.png';

import { ZERO_BIG_NUMBER, shortenAddr } from '../../../../web3/utils';

import './index.scss';

interface ILandWorksCardProps {
  land: AssetEntity;
}

const LandWorksCard: React.FC<ILandWorksCardProps> = ({ land }) => {
  const history = useHistory();
  const [showChart] = useState(false);

  return (
    <Col className="land-card-wrapper" xl={6} md={12} sm={24} xs={24}>
      <Card className="land-card" onClick={() => history.push(`/property/${land.id}`)}>
        <Row className="label-row" justify="space-between">
          {land.isHot && (
            <span className="label card-hot-label">
              <FireIcon />
            </span>
          )}
        </Row>
        <Row className="image-list-wrapper">
          <Image
            placeholder={<Image className="land-image" src={landImage} preview={false} />}
            className="land-image"
            src={getLandImageUrl(land)}
            preview={false}
          />
        </Row>
        <Row justify="space-between">
          <Col span={13}>
            <Row className="land-info-row">
              <Col span={24} className="land-name">
                <span>{land.name.replace('metadata', '').toLowerCase()}</span>
              </Col>
              <Col span={24} className="land-owner-address">
                <span>BY {shortenAddr(land.owner?.id, 6, 4)}</span>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <Row className="land-info-row">
              <Col span={24} className="price-eth-container">
                <Icon name={getTokenIconName(land.paymentToken.symbol)} className="eth-icon" />
                <SmallAmountTooltip className="price-eth" amount={land.pricePerMagnitude.price} />
              </Col>
              <Col span={24}>
                <Row className="land-price-info">
                  <SmallAmountTooltip
                    className="price"
                    symbol="$"
                    amount={land.pricePerMagnitude.usdPrice || ZERO_BIG_NUMBER}
                  />
                  <span className="per-day">{'/ ' + land.pricePerMagnitude.magnitude}</span>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr className="separator" />
        <Row className="land-available-row">
          {land?.availability?.isRentable && (
            <Col span={12}>
              <p className="available-heading">Rent period</p>
              <p className="available-period">{land.availability?.label}</p>
            </Col>
          )}
          {land.isAvailable && land.availability.isCurrentlyAvailable ? (
            <Col className="button-section" span={12}>
              <button className="button-available">
                <div className="button-label button-available-now" />
                Available
              </button>
            </Col>
          ) : (
            <Col className="button-section" span={12}>
              <button className="button-rented">
                <div className="button-label button-rented-now" />
                Rented
              </button>
            </Col>
          )}
        </Row>
        <Row className="hashtag-row">
          <Col>{land.decentralandData?.isLAND ? <p>#LAND</p> : <p>#ESTATE</p>}</Col>
          <Col>{land.metaverse?.name && <p>#{land.metaverse?.name}</p>}</Col>
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
