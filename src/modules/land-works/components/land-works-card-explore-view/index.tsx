import React from 'react';
import { bottom, end } from '@popperjs/core';
import { Card, Col, Image, Row } from 'antd';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { getLandImageUrl, getTokenIconName } from 'helpers/helpers';

import { ReactComponent as HotIcon } from '../../../../resources/svg/hot.svg';
import { AssetEntity } from '../../api';
import { LandsTooltip } from '../lands-tooltip';
import landImage from './assets/land.png';

import { ZERO_BIG_NUMBER } from '../../../../web3/utils';

import './index.scss';

interface ILandWorksCardProps {
  land: AssetEntity;
  onClick: (land: AssetEntity) => void;
}

const LandWorksCard: React.FC<ILandWorksCardProps> = ({ land, onClick }) => {
  return (
    <Col className="land-card-wrapper" xxl={6} xl={8} md={12} sm={24} xs={24}>
      <Card className="land-card" onClick={() => onClick(land)}>
        <Row>
          <Col span={24}>
            <p className="land-name">
              <span>{land.name}</span>
              <span>
                {land.isHot && (
                  <span className="label card-name-hot-label">
                    <HotIcon className="name-label" />
                    HOT
                  </span>
                )}
                {!land.decentralandData?.isLAND && <span className="label card-name-estate-label">ESTATE</span>}
              </span>
            </p>
          </Col>
        </Row>
        <Row className="image-list-wrapper">
          <Image
            placeholder={<Image className="land-image" src={landImage} preview={false} />}
            className="land-image"
            src={getLandImageUrl(land)}
            preview={false}
          />
        </Row>
        <Row>
          <Col span={10}>
            <Row className="land-info-row" align={bottom}>
              <Col span={24} className="price-eth-container">
                <Icon name={getTokenIconName(land.paymentToken.symbol)} className="eth-icon" />
                <SmallAmountTooltip className="price-eth" amount={land.pricePerMagnitude.price} />
              </Col>
              <Col span={24}>
                <span className="land-price-info">
                  <SmallAmountTooltip
                    className="price"
                    symbol="$"
                    amount={land.pricePerMagnitude.usdPrice || ZERO_BIG_NUMBER}
                  />
                  <span className="per-day">/ {land.pricePerMagnitude.magnitude}</span>
                  <LandsTooltip
                    placement="bottomLeft"
                    trigger="hover"
                    text={
                      <>
                        The price for renting this property is {land.humanPricePerSecond.toString(10)}{' '}
                        <Icon name={getTokenIconName(land.paymentToken.symbol)} className="eth-icon" /> per second.
                      </>
                    }
                  />
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={14}>
            <Row className="land-available-row" justify={end}>
              {land.isAvailable ? (
                land.availability.isCurrentlyAvailable ? (
                  <Col span={24}>
                    <p className="available-heading">Available now</p>
                  </Col>
                ) : land.availability.availabilityAfter && land?.availability?.isRentable ? (
                  <Col span={24}>
                    <p className="available-heading">{`Available after ${land.availability.availabilityAfter}`}</p>
                  </Col>
                ) : (
                  land?.availability?.maxRentPeriodTime &&
                  land?.availability?.maxRentPeriodTime > 0 && (
                    <Col span={24}>
                      <p className="available-heading">
                        Available for rent after {land?.availability?.maxRentPeriodTime}{' '}
                        {land?.availability?.maxRentPeriodType}
                      </p>
                    </Col>
                  )
                )
              ) : (
                <Col span={24}>
                  <p className="available-heading">Delisted</p>
                </Col>
              )}
              {land?.availability?.isRentable && (
                <Col span={24}>
                  <p className="available-period">{land.availability?.label}</p>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default LandWorksCard;
