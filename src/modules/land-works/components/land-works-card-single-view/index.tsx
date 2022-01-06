import React, { useEffect, useState } from 'react';
import { Col, Image, Row, Steps } from 'antd';
import BigNumber from 'bignumber.js';

import Icon from 'components/custom/icon';
import { getTokenPrice } from 'components/providers/known-tokens-provider';
import { getLandImageUrl, getTokenIconName } from 'helpers/helpers';

import { useWallet } from '../../../../wallets/wallet';
import { AssetEntity, RentEntity } from '../../api';
import { AssetStatus } from '../../models/AssetStatus';
import cardImage from './assets/card.png';

import { shortenAddr } from '../../../../web3/utils';

import './index.scss';

const { Step } = Steps;

type SingleLandProps = {
  setShowRentModal: (isShown: boolean) => void;
  asset?: AssetEntity;
};

const SingleViewLandCard: React.FC<SingleLandProps> = ({ setShowRentModal, asset }) => {
  const wallet = useWallet();

  const [lastRent, setLastRent] = useState({} as RentEntity);
  const [usdPrice, setUsdPrice] = useState('0');

  const isOwnerOrConsumer = () => {
    return (
      wallet.account &&
      (wallet.account.toLowerCase() === asset?.owner?.id.toLowerCase() ||
        wallet.account.toLowerCase() === asset?.consumer?.id.toLowerCase())
    );
  };

  const isListed = () => asset?.status === AssetStatus.LISTED;

  const shouldShowClaimButton = () => isOwnerOrConsumer() && asset!.unclaimedRentFee.gt(0);

  const shouldShowUpdateOperator = () => {
    if (!asset?.rents) {
      return false;
    }
    if (asset?.rents.length === 0) {
      return false;
    }

    const isLastRent = asset.rents[0].renter.id.toLowerCase() === wallet.account?.toLowerCase();
    return wallet.account && isLastRent;
  };

  const getUsdPrice = () => {
    if (asset?.paymentToken) {
      const ethPrice = new BigNumber(getTokenPrice(asset.paymentToken.symbol) || '0');
      const ethToUsdPrice = ethPrice.multipliedBy(asset.pricePerMagnitude.price);
      setUsdPrice(ethToUsdPrice.toFixed());
    }
  };

  useEffect(() => {
    getUsdPrice();
  }, [asset]);

  return (
    <Row gutter={40} className="single-land-card-container">
      <Col span={12}>
        <Row>
          <Col span={24}>
            <img alt="vector Icon" className="card-image" src={getLandImageUrl(asset)}></img>
          </Col>
        </Row>
      </Col>
      <Col span={12} className="properties-container">
        <Row>
          <Col span={24}>
            <span className="card-name">{asset?.name}</span>

            {asset?.isHot && (
              <span className="label card-name-hot-label">
                <Icon name="png/hot" className="name-label" />
                HOT
              </span>
            )}
            <span className="label card-name-estate-label">{asset?.decentralandData?.isLAND ? 'LAND' : 'ESTATE'}</span>
          </Col>
          <Col span={24} className="properties-row">
            <Row>
              <Col span={14}>
                <span className="land-owner">
                  BY <span className="land-owner-address">{shortenAddr(asset?.owner?.id.toLowerCase())}</span>
                </span>
                {isOwnerOrConsumer() && (
                  <span className="label card-name-you-label">
                    <Icon name="png/you" className="name-label" />
                    YOU
                  </span>
                )}
              </Col>
              {!isListed() && (
                <Col span={10}>
                  <span className="available-heading">Delisted</span>
                </Col>
              )}
              {isListed() && (
                <Col span={10}>
                  <span className="available-heading">Available now</span>{' '}
                  <span className="available-period">{asset?.availability}</span>
                </Col>
              )}
            </Row>
          </Col>
          <Col span={24} className="rent-section">
            <Row>
              <Col span={12}>
                <Row>
                  <Col push={5} span={19} className="eth-price-container">
                    <Icon name={getTokenIconName(asset?.paymentToken?.symbol || '')} className="eth-icon" />
                    <span className="price-eth">{asset?.pricePerMagnitude?.price}</span>
                  </Col>
                  <Col push={7} span={17} className="usd-price-container">
                    <span className="price">${usdPrice}</span>
                    <span className="per-day">/ {asset?.pricePerMagnitude?.magnitude}</span>
                    <Icon name="info-outlined" className="info-icon" />
                  </Col>
                </Row>
              </Col>
              {shouldShowClaimButton() && (
                <Col push={4} span={8} className="rent-btn-container">
                  <button type="button" className={`button-primary `} onClick={() => console.log('claim')}>
                    <span>Claim rent</span>
                  </button>
                </Col>
              )}
              {!isOwnerOrConsumer() && (
                <Col push={4} span={8} className="rent-btn-container">
                  <button
                    type="button"
                    className={`button-primary `}
                    disabled={!isListed()}
                    onClick={() => setShowRentModal(true)}
                  >
                    <span>Rent now</span>
                  </button>
                </Col>
              )}
            </Row>
          </Col>
          <Col span={24} className="properties-row operator-container">
            <Row>
              <Col span={12}>
                <Row>
                  <Col span={24} className="current-address">
                    Current operator <Icon name="info-outlined" className="info-icon" />
                  </Col>
                  <Col span={24}>
                    <p className="land-operator-address">{shortenAddr(asset?.operator)}</p>
                  </Col>
                </Row>
              </Col>
              <Col span={12} style={{ textAlign: 'end' }}>
                <Row>
                  <Col span={24}>
                    <p className="rented-on">Rented on 05.11.2021</p>
                  </Col>
                  <Col span={24}>
                    <p className="remaining-time">5 days, 11 hours, 5mins remaining</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="operator-update-container">
            {shouldShowUpdateOperator() && (
              <Row>
                <Col span={15} className="info-warning-text">
                  <p>
                    Update the operator to the one that you configured in order to be authorised to publish
                    scenes/experiences on it.
                  </p>
                </Col>
                <Col span={9} className="update-operator-btn">
                  <button type="button" onClick={() => {console.log("updating operator")}}>
                    <span>UPDATE OPERATOR</span>
                  </button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SingleViewLandCard;
