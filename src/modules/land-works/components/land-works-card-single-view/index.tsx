import React, { useEffect, useState } from 'react';
import Countdown, { CountdownTimeDelta } from 'react-countdown';
import { Col, Row } from 'antd';
import BigNumber from 'bignumber.js';

import EstateLandOverlay from 'components/custom/estateLandsOverlay';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { getLandImageUrl, getTokenIconName, timestampSecondsToDate } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';

import { ReactComponent as HotIcon } from '../../../../resources/svg/hot.svg';
import { useWallet } from '../../../../wallets/wallet';
import { AssetEntity, RentEntity, fetchAssetRentByTimestamp, fetchUserFirstRentByTimestamp } from '../../api';
import { AssetStatus } from '../../models/AssetStatus';
import { useLandworks } from '../../providers/landworks-provider';
import { LandsTooltip } from '../lands-tooltip';
import chainPng from './assets/chain.png';

import { getNowTs } from '../../../../utils';
import {
  ZERO_BIG_NUMBER,
  getDecentralandMarketplaceUrl,
  getEtherscanAddressUrl,
  shortenAddr,
} from '../../../../web3/utils';

import './index.scss';

type SingleLandProps = {
  setShowRentModal: (isShown: boolean) => void;
  isClaimButtonDisabled: boolean;
  isRentButtonDisabled: boolean;
  isUpdateOperatorButtonDisabled: boolean;
  asset?: AssetEntity;
  onClaimSubmit: () => void;
};

const SingleViewLandCard: React.FC<SingleLandProps> = ({
  setShowRentModal,
  isClaimButtonDisabled,
  isUpdateOperatorButtonDisabled,
  isRentButtonDisabled,
  asset,
  onClaimSubmit,
}) => {
  const wallet = useWallet();
  const landWorks = useLandworks();

  const { landWorksContract } = landWorks;

  const [currentRent, setCurrentRent] = useState({} as RentEntity);
  const [countDownRent, setCountDownRent] = useState({} as RentEntity);
  const [countDownTimestamp, setCountDownTimestamp] = useState('0');

  const isOwner = () => {
    return wallet.account && wallet.account.toLowerCase() === asset?.owner?.id.toLowerCase();
  };

  const isOwnerOrConsumer = () => {
    return (
      wallet.account &&
      (wallet.account.toLowerCase() === asset?.owner?.id.toLowerCase() ||
        wallet.account.toLowerCase() === asset?.consumer?.id.toLowerCase())
    );
  };

  const isNotListed = () => asset?.status !== AssetStatus.LISTED;

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
        await landWorksContract?.updateState(asset!.id, rentArray[1], onClaimSubmit);
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
      await landWorksContract?.claimMultipleRentFees([asset!.id], onClaimSubmit);
      showToastNotification(ToastType.Success, 'Rent claimed successfully!');
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while claiming the rent.');
      console.log(e);
    }
  };

  useEffect(() => {
    getCurrentAndCountdownRents();
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
            <EstateLandOverlay coordinates={asset?.decentralandData?.coordinates} />
          </Col>
        </Row>
      </Col>
      <Col md={12} sm={24} className="properties-container">
        <Row className="head-container">
          <Col span={16} className="title-container">
            <span className="card-name">{asset?.name}</span>

            {asset?.isHot && (
              <span className="label card-name-hot-label">
                <HotIcon className="name-label" />
                HOT
              </span>
            )}
            <span className="label card-name-estate-label">{asset?.decentralandData?.isLAND ? 'LAND' : 'ESTATE'}</span>
          </Col>
          <Col span={7}>
            <ExternalLink
              className="marketplace-link"
              target={'_blank'}
              href={getDecentralandMarketplaceUrl(asset?.metaverseRegistry?.id, asset?.metaverseAssetId)}
            >
              <img style={{ marginRight: 5 }} src={chainPng} /> <span>Marketplace</span>
            </ExternalLink>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="properties-row">
            <Row>
              <Col span={10}>
                <span className="land-owner">
                  BY{' '}
                  {
                    <ExternalLink href={getEtherscanAddressUrl(asset?.owner?.id)} className="land-owner-address">
                      {shortenAddr(asset?.owner?.id.toLowerCase())}
                    </ExternalLink>
                  }
                </span>
                {isOwner() && (
                  <span className="label card-name-you-label">
                    <Icon name="png/you" className="name-label" />
                    YOU
                  </span>
                )}
              </Col>
              {isNotListed() && (
                <Col span={13} className="availability">
                  <span className="available-heading delisted-heading">Delisted</span>
                </Col>
              )}
              {!isNotListed() && (
                <Col span={13} className="availability">
                  {asset?.availability?.isCurrentlyAvailable ? (
                    <span className="available-heading">Available now</span>
                  ) : asset?.availability?.availabilityAfter && asset?.availability?.isRentable ? (
                    <span className="available-heading">{`Available after ${asset.availability?.availabilityAfter}`}</span>
                  ) : (
                    asset?.availability?.maxRentPeriodTime &&
                    asset?.availability?.maxRentPeriodTime > 0 && (
                      <span className="available-heading">
                        Available for rent after {asset?.availability?.maxRentPeriodTime}{' '}
                        {asset?.availability?.maxRentPeriodType}
                      </span>
                    )
                  )}{' '}
                </Col>
              )}
              {asset?.availability?.isRentable && (
                <Col span={24} className="period-wrapper">
                  {(asset?.availability?.availabilityTime?.minAvailabilityTime > 0 ||
                    asset?.availability?.availabilityTime?.maxAvailabilityTime > 0) && (
                    <span className="period-title">Rent period</span>
                  )}
                  <span className="available-period">
                    {asset?.availability?.availabilityTime?.minAvailabilityTime > 0 && (
                      <>
                        <span className="label">
                          <span className="preffix">min</span>
                          {asset?.availability?.availabilityTime?.minAvailabilityTime}{' '}
                          {asset?.availability?.availabilityTime?.minAvailabilityType}
                        </span>
                      </>
                    )}
                    {asset?.availability?.availabilityTime?.maxAvailabilityTime > 0 && (
                      <>
                        <span className="label">
                          <span className="suffix">max</span>
                          {asset?.availability?.availabilityTime?.maxAvailabilityTime}{' '}
                          {asset?.availability?.availabilityTime?.maxAvailabilityType}
                        </span>
                      </>
                    )}
                  </span>
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
                    <SmallAmountTooltip
                      className="price-eth"
                      amount={asset?.pricePerMagnitude ? asset?.pricePerMagnitude?.price : new BigNumber('0')}
                    />
                  </Col>
                  <Col push={2} span={22} className="usd-price-container">
                    <SmallAmountTooltip
                      className="price"
                      symbol="$"
                      amount={asset?.pricePerMagnitude?.usdPrice || ZERO_BIG_NUMBER}
                    />
                    <span className="per-day">/ {asset?.pricePerMagnitude?.magnitude}</span>
                    <LandsTooltip
                      placement="bottomLeft"
                      trigger="hover"
                      text={
                        <>
                          The price for renting this property is {asset?.humanPricePerSecond?.toString(10)}{' '}
                          <Icon name={getTokenIconName(asset?.paymentToken?.symbol || '')} className="eth-icon" /> per
                          second.
                        </>
                      }
                    />
                  </Col>
                </Row>
                {shouldShowClaimButton() && (
                  <button
                    type="button"
                    className={`button-primary `}
                    onClick={handleClaim}
                    disabled={isClaimButtonDisabled}
                  >
                    <span>CLAIM RENT</span>
                  </button>
                )}
                {!isOwnerOrConsumer() && (
                  <button
                    style={{ fontWeight: 500 }}
                    type="button"
                    className={`button-primary `}
                    disabled={isRentButtonDisabled || isNotListed() || !asset?.availability?.isRentable}
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
                    Current Operator
                    <LandsTooltip
                      placement="bottomLeft"
                      trigger="hover"
                      text="The operator currently set and authorised to deploy scenes and experiences in the metaverse."
                    />
                  </Col>
                  <Col span={24}>
                    <ExternalLink href={getEtherscanAddressUrl(asset?.operator)} className="land-operator-address">
                      {shortenAddr(asset?.operator)}
                    </ExternalLink>
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
                  <button type="button" onClick={handleUpdateOperator} disabled={isUpdateOperatorButtonDisabled}>
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
