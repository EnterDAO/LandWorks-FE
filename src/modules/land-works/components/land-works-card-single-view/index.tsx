import React, { useEffect, useState } from 'react';
import Countdown, { CountdownTimeDelta } from 'react-countdown';
import { Col, Image, Row, Steps } from 'antd';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';

import Icon from 'components/custom/icon';
import { getTokenPrice } from 'components/providers/known-tokens-provider';
import { getLandImageUrl, getTokenIconName, timestampSecondsToDate } from 'helpers/helpers';

import { useWallet } from '../../../../wallets/wallet';
import { AssetEntity, RentEntity, fetchAssetRentByTimestamp } from '../../api';
import { AssetStatus } from '../../models/AssetStatus';
import { useLandworks } from '../../providers/landworks-provider';

import { getFormattedTime, getNowTs } from '../../../../utils';
import { shortenAddr } from '../../../../web3/utils';

import './index.scss';

type SingleLandProps = {
  setShowRentModal: (isShown: boolean) => void;
  asset?: AssetEntity;
};

const SingleViewLandCard: React.FC<SingleLandProps> = ({ setShowRentModal, asset }) => {
  const wallet = useWallet();
  const landWorks = useLandworks();

  const { landWorksContract } = landWorks;

  const [currentRent, setCurrentRent] = useState({} as RentEntity);
  const [usdPrice, setUsdPrice] = useState('0');

  const isOwnerOrConsumer = () => {
    return (
      wallet.account &&
      (wallet.account.toLowerCase() === asset?.owner?.id.toLowerCase() ||
        wallet.account.toLowerCase() === asset?.consumer?.id.toLowerCase())
    );
  };

  const isListed = () => asset?.status === AssetStatus.LISTED;

  const shouldShowClaimButton = () => isOwnerOrConsumer() && asset?.unclaimedRentFee.gt(0);

  const shouldShowUpdateOperator = () => {
    const validOperator =
      currentRent?.renter?.id.toLowerCase() === wallet.account?.toLowerCase() &&
      currentRent?.operator?.toLowerCase() !== asset?.operator?.toLowerCase();

    return wallet.account && validOperator;
  };

  const shouldShowRenterCountdown = () => {
    return currentRent?.renter?.id.toLowerCase() === wallet.account?.toLowerCase();
  };

  const getUsdPrice = () => {
    if (asset?.paymentToken) {
      const ethPrice = new BigNumber(getTokenPrice(asset.paymentToken.symbol) || '0');
      const ethToUsdPrice = ethPrice.multipliedBy(asset.pricePerMagnitude.price);
      setUsdPrice(ethToUsdPrice.toFixed(2).replace(/\.00$/, ''));
    }
  };

  const getCurrentRent = async () => {
    if (asset?.id) {
      const rent = await fetchAssetRentByTimestamp(asset.id, getNowTs());
      setCurrentRent(rent);
    }
  };

  const handleUpdateOperator = async () => {
    try {
      const rentArray = currentRent.id.split('-');
      if (rentArray.length === 2) {
        await landWorksContract?.updateState(asset!.id, rentArray[1]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRent = async () => {
    if (!wallet.isActive) {
      wallet.showWalletsModal();
    } else {
      setShowRentModal(true);
    }
  };

  const handleClaim = async () => {
    if (!wallet.account) {
      return;
    }

    try {
      await landWorksContract?.claimMultipleRentFees([asset!.id]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsdPrice();
    getCurrentRent();
    flexFont();
  }, [asset, wallet.account]);

  const flexFont = () => {
    const divs = document.getElementsByClassName('price-eth');
    for (let i = 0; i < divs.length; i++) {
      const element = divs[i] as HTMLElement;
      const relFontsize = element.offsetWidth * 0.05;
      element.style.fontSize = relFontsize + 'px';
    }
  };

  const renderCountdown = (props: CountdownTimeDelta) => {
    const days = props.days > 0 ? `${props.days} days ` : '';
    const hours = props.hours > 0 ? `${props.hours} hours ` : '';
    const minutes = props.hours > 0 ? `${props.minutes} minutes` : '';
    const remaining = days || hours || minutes ? ' remaining' : '';
    return <p className="remaining-time">{days + hours + minutes + remaining}</p>;
  };

  return (
    <Row gutter={40} className="single-land-card-container">
      <Col md={12} sm={24}>
        <Row>
          <Col span={24} className="image-wrapper">
            <img alt="vector Icon" className="card-image" src={getLandImageUrl(asset)}></img>
          </Col>
        </Row>
      </Col>
      <Col md={12} sm={24} className="properties-container">
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
              <Col span={10}>
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
                <Col span={13} className="availability">
                  <span className="available-heading delisted-heading">Delisted</span>
                </Col>
              )}
              {isListed() && (
                <Col span={13} className="availability">
                  {asset?.availability.isCurrentlyAvailable && <span className="available-heading">Available now</span>}
                  {asset?.availability.availabilityAfter && (
                    <span className="available-heading">{`Available after ${asset.availability.availabilityAfter}`}</span>
                  )}{' '}
                  <span className="available-period">{asset?.availability?.label}</span>
                </Col>
              )}
            </Row>
          </Col>
          <Col span={24} className="rent-section">
            <Row>
              <Col span={24} className="rent-price">
                <Row className="price-wrapper">
                  <Col span={24} className="eth-price-container">
                    <Icon name={getTokenIconName(asset?.paymentToken?.symbol || '')} className="eth-icon" />
                    <span className="price-eth">{asset?.pricePerMagnitude?.price}</span>
                  </Col>
                  <Col push={2} span={22} className="usd-price-container">
                    <span className="price">${usdPrice}</span>
                    <span className="per-day">/ {asset?.pricePerMagnitude?.magnitude}</span>
                    <Icon name="info-outlined" className="info-icon" />
                  </Col>
                </Row>
                {shouldShowClaimButton() && (
                  <button type="button" className={`button-primary `} onClick={handleClaim}>
                    <span>CLAIM RENT</span>
                  </button>
                )}
                {!isOwnerOrConsumer() && (
                  <button
                    style={{ fontWeight: 500 }}
                    type="button"
                    className={`button-primary `}
                    disabled={!isListed()}
                    onClick={handleRent}
                  >
                    <span>RENT NOW</span>
                  </button>
                )}
              </Col>
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
                  {shouldShowRenterCountdown() && (
                    <>
                      <Col span={24}>
                        {currentRent.start && (
                          <p className="rented-on">Rented on {timestampSecondsToDate(currentRent.start)}</p>
                        )}
                      </Col>
                      <Col span={24}>
                        <Countdown date={Number(currentRent.end) * 1000} renderer={renderCountdown} />
                      </Col>
                    </>
                  )}
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
                  <button type="button" onClick={handleUpdateOperator}>
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
