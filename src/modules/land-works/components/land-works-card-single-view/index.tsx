import React, { useEffect, useState } from 'react';
import Countdown, { CountdownTimeDelta } from 'react-countdown';
import { Col, Row } from 'antd';
import BigNumber from 'bignumber.js';

import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import { getTokenPrice } from 'components/providers/known-tokens-provider';
import { getLandImageUrl, getTokenIconName, timestampSecondsToDate } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';

import { useWallet } from '../../../../wallets/wallet';
import { AssetEntity, RentEntity, fetchAssetRentByTimestamp, fetchUserFirstRentByTimestamp } from '../../api';
import { AssetStatus } from '../../models/AssetStatus';
import { useLandworks } from '../../providers/landworks-provider';
import chainPng from './assets/chain.png';

import { formatBigNumber, getNowTs } from '../../../../utils';
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
  const [countDownRent, setCountDownRent] = useState({} as RentEntity);
  const [countDownTimestamp, setCountDownTimestamp] = useState('0');

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
    return countDownRent?.renter?.id.toLowerCase() === wallet.account?.toLowerCase();
  };

  const getUsdPrice = () => {
    if (asset?.paymentToken) {
      const ethPrice = new BigNumber(getTokenPrice(asset.paymentToken.symbol) || '0');
      const ethToUsdPrice = ethPrice.multipliedBy(asset.pricePerMagnitude.price);
      setUsdPrice(formatBigNumber(ethToUsdPrice));
    }
  };

  const getCurrentAndCountdownRents = async () => {
    if (asset?.id) {
      const rent = await fetchAssetRentByTimestamp(asset.id, getNowTs());
      setCurrentRent(rent);
      if (wallet.account) {
        if (wallet.account.toLowerCase() === rent.renter?.id) {
          setCountDownTimestamp(rent.end);
          setCountDownRent(rent);
        } else {
          const rent = await fetchUserFirstRentByTimestamp(asset.id, wallet.account.toLowerCase(), getNowTs());
          setCountDownTimestamp(rent.start);
          setCountDownRent(rent);
        }
      }
    }
  };

  const handleUpdateOperator = async () => {
    try {
      const rentArray = currentRent.id.split('-');
      if (rentArray.length === 2) {
        await landWorksContract?.updateState(asset!.id, rentArray[1]);
        showToastNotification(ToastType.Success, 'Operator updated successfully!');
      }
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while updating the operator.');
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
      showToastNotification(ToastType.Success, 'Rent claimed successfully!');
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while claiming the rent.');
      console.log(e);
    }
  };

  useEffect(() => {
    getUsdPrice();
    getCurrentAndCountdownRents();
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
    const minutes = props.minutes > 0 ? `${props.minutes} minutes ` : '';
    const seconds = props.seconds > 0 ? `${props.seconds} seconds` : '';
    const expired = days || hours || minutes || seconds;
    const placeholder = expired ? `${days}${hours}${minutes}${seconds} remaining` : '';
    return <p className="remaining-time">{placeholder}</p>;
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
          <Col span={16}>
            <span className="card-name">{asset?.name}</span>

            {asset?.isHot && (
              <span className="label card-name-hot-label">
                <Icon name="png/hot" className="name-label" />
                HOT
              </span>
            )}
            <span className="label card-name-estate-label">{asset?.decentralandData?.isLAND ? 'LAND' : 'ESTATE'}</span>
          </Col>
          <Col span={7}>
            <ExternalLink
              className="marketplace-link"
              target={'_blank'}
              href={`https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/${asset?.metaverseAssetId}`}
            >
              <img style={{ marginRight: 5 }} src={chainPng} /> <span>Marketplace</span>
            </ExternalLink>
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
                    <span className="price-eth">
                      {asset?.pricePerMagnitude ? formatBigNumber(asset?.pricePerMagnitude.price) : '0'}
                    </span>
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
                        {countDownRent.timestamp && (
                          <p className="rented-on">Rented on {timestampSecondsToDate(countDownRent.timestamp)}</p>
                        )}
                      </Col>
                      <Col span={24}>
                        <Countdown date={Number(countDownTimestamp) * 1000} renderer={renderCountdown} />
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
