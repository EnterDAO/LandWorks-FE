/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import Countdown, { CountdownTimeDelta, zeroPad } from 'react-countdown';
import Grid from '@mui/material/Grid';
import BigNumber from 'bignumber.js';

import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { getENSName, getLandImageUrl, getTokenIconName } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';

import { ReactComponent as WarningIcon } from '../../../../resources/svg/warning.svg';
import { ReactComponent as FireIcon } from '../../../../resources/svg/white_fire.svg';
import { useWallet } from '../../../../wallets/wallet';
import { AssetEntity, RentEntity, fetchAssetRentByTimestamp, fetchUserFirstRentByTimestamp } from '../../api';
import { AssetStatus } from '../../models/AssetStatus';
import { useLandworks } from '../../providers/landworks-provider';
import LandsMapOverlay from '../lands-map-overlay';
import { LandsTooltip } from '../lands-tooltip';

import { getNowTs } from '../../../../utils';
import { ZERO_BIG_NUMBER, getDecentralandPlayUrl, getEtherscanAddressUrl, shortenAddr } from '../../../../web3/utils';

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

  const isOwnerOrConsumer = () => {
    return (
      wallet.account &&
      (wallet.account.toLowerCase() === asset?.owner?.id.toLowerCase() ||
        wallet.account.toLowerCase() === asset?.consumer?.id.toLowerCase())
    );
  };

  const isNotListed = () => asset?.status !== AssetStatus.LISTED;
  const isAvailable = asset?.isAvailable && asset?.availability.isCurrentlyAvailable;

  const shouldShowClaimButton = () => isOwnerOrConsumer() && asset?.unclaimedRentFee.gt(0);

  const shouldShowUpdateOperator = () => {
    const validOperator =
      currentRent?.renter?.id.toLowerCase() === wallet.account?.toLowerCase() &&
      currentRent?.operator?.toLowerCase() !== asset?.operator?.toLowerCase();

    return wallet.account && validOperator;
  };

  const shouldShowRenterCountdown = () => {
    return countDownRent?.renter?.id && countDownRent?.renter?.id.toLowerCase() === wallet.account?.toLowerCase();
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
      await landWorksContract?.claimMultipleRentFees([asset?.id || ''], onClaimSubmit);
      showToastNotification(ToastType.Success, 'Rent claimed successfully!');
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while claiming the rent.');
      console.log(e);
    }
  };

  useEffect(() => {
    getCurrentAndCountdownRents();
  }, [asset, wallet.account]);

  useEffect(() => {
    return () => {
      setCurrentRent({} as RentEntity);
      setCountDownRent({} as RentEntity);
      setCountDownTimestamp('0');
    };
  }, []);

  const renderCountdown = (props: CountdownTimeDelta) => {
    if (props.completed) {
      setCountDownRent({} as RentEntity);
      setCountDownTimestamp('0');
    }
    const days = props.days > 0 ? `${props.days} : ` : '';
    const hours = props.hours > 0 ? `${zeroPad(props.hours)} : ` : '';
    const minutes = props.minutes > 0 ? `${zeroPad(props.minutes)} : ` : '';
    const seconds = props.seconds > 0 ? `${zeroPad(props.seconds)} ` : '';
    const expired = days || hours || minutes || seconds;
    const placeholder = expired ? `${days}${hours}${minutes}${seconds} ` : '';
    return <p className="remaining-time">{placeholder}</p>;
  };

  const [ens, setEns] = useState<string>();
  const [ensOperator, setEnsOperator] = useState<string>();

  useEffect(() => {
    if (asset?.owner?.id)
      getENSName(asset?.owner?.id).then((ensName) => {
        setEns(ensName);
      });
    if (asset?.operator)
      getENSName(asset?.operator).then((ensName) => {
        setEnsOperator(ensName);
      });
  }, [asset]);

  return (
    <Grid container className="single-land-card-container">
      <Grid xs={12} md={6} item>
        <div className="map-image-wrapper">
          <img alt="vector Icon" className="card-image" src={getLandImageUrl(asset)} />
          <LandsMapOverlay
            title={asset?.decentralandData?.isLAND ? 'Land' : 'Estate'}
            coordinates={asset?.decentralandData?.coordinates}
          />
        </div>
      </Grid>
      <Grid xs={12} md={6} item className="properties-container">
        <Grid container className="head-container">
          <Grid item className="title-container">
            <span className="card-name">{asset?.name?.toLowerCase()}</span>
            <Grid className="button-section">
              <button
                className={`${isNotListed() ? 'button-delisted' : isAvailable ? 'button-available' : 'button-rented'}`}
              >
                <div
                  className={`button-label ${
                    isNotListed() ? 'button-delisted-dot' : isAvailable ? 'button-available-dot' : 'button-rented-dot'
                  }`}
                />
                {isNotListed() ? 'Delisted' : isAvailable ? 'Available' : 'Rented'}
              </button>
            </Grid>
          </Grid>
          <Grid item className="single-land-label-row">
            {asset?.isHot && (
              <span className="label card-hot-label">
                <FireIcon className="name-label" />
              </span>
            )}
          </Grid>
        </Grid>
        <Grid container className="hashtag-row">
          <Grid item>{asset?.decentralandData?.isLAND ? <p>#LAND</p> : <p>#ESTATE</p>}</Grid>
          <Grid item>{asset?.metaverse?.name && <p>#{asset?.metaverse?.name}</p>}</Grid>
        </Grid>
        <Grid container>
          <Grid item xs={24} className="properties-row">
            <Grid container>
              <Grid item xs={4} className="land-owner">
                Owned by{' '}
              </Grid>
              <Grid item>
                <ExternalLink href={getEtherscanAddressUrl(asset?.owner?.id)} className="land-owner-address">
                  {ens && ens !== asset?.owner?.id ? ens : shortenAddr(asset?.owner?.id.toLowerCase(), 25, 4)}
                </ExternalLink>
              </Grid>
            </Grid>
            <Grid container className="operator-container">
              <Grid item xs={4} className="current-address">
                Current Operator
                <LandsTooltip
                  placement="bottomLeft"
                  trigger="hover"
                  text="The operator currently set and authorised to deploy scenes and experiences in the metaverse."
                />
              </Grid>
              <Grid item>
                <ExternalLink href={getEtherscanAddressUrl(asset?.operator)} className="land-operator-address">
                  {ensOperator && ensOperator !== asset?.operator ? ensOperator : shortenAddr(asset?.operator, 25, 4)}
                </ExternalLink>
              </Grid>
            </Grid>
          </Grid>

          <Grid container className="rent-section">
            <Grid container className="rent-price">
              <Grid item xs={12} xl={6.5} className="price-wrapper">
                {asset?.availability?.isRentable && (
                  <div className="period-wrapper">
                    <span className="period-title">Rent period</span>
                    <span className="available-period">
                      {asset.minPeriodTimedType} - {asset.maxPeriodTimedType}
                    </span>
                    <span className="period-title">Max Rent Queue</span>
                    <span className="available-period">
                      <span className="label">{asset.maxFutureTimeTimedType}</span>
                    </span>
                  </div>
                )}
                <Grid item>
                  <Grid item className="eth-price-container">
                    <Icon name={getTokenIconName(asset?.paymentToken?.symbol || '')} className="eth-icon" />
                    <SmallAmountTooltip
                      className="price-eth"
                      amount={asset?.pricePerMagnitude ? asset?.pricePerMagnitude?.price : new BigNumber('0')}
                    />
                    <p>{asset?.paymentToken?.symbol}</p>

                    <div className="usd-price-container">
                      <SmallAmountTooltip
                        className="price"
                        symbol="$"
                        amount={asset?.pricePerMagnitude?.usdPrice || ZERO_BIG_NUMBER}
                      />
                      <span className="per-day">/{asset?.pricePerMagnitude?.magnitude}</span>
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
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} xl={5.5}>
                <Grid item className="property-button">
                  {shouldShowClaimButton() && (
                    <button
                      type="button"
                      className={'button-primary'}
                      onClick={handleClaim}
                      disabled={isClaimButtonDisabled}
                    >
                      <span>CLAIM RENT</span>
                    </button>
                  )}
                  {!isOwnerOrConsumer() && (
                    <button
                      type="button"
                      className={'button-primary '}
                      disabled={isRentButtonDisabled || isNotListed() || !asset?.availability?.isRentable}
                      onClick={handleRent}
                    >
                      <span>{isAvailable ? 'RENT NOW' : 'RENT NEXT SLOT'}</span>
                    </button>
                  )}
                </Grid>
                <Grid item className="property-button">
                  <ExternalLink
                    className="marketplace-link"
                    target={'_blank'}
                    href={getDecentralandPlayUrl(asset?.decentralandData?.coordinates)}
                  >
                    <span>view in metaverse</span>
                  </ExternalLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {shouldShowRenterCountdown() && (
        <Grid className="countdown">
          <Grid item xs={10}>
            <Countdown date={Number(countDownTimestamp) * 1000} zeroPadTime={3} renderer={renderCountdown} />
          </Grid>
          <Grid item>
            <p className="rented-on">{Number(countDownTimestamp) > getNowTs() ? 'rent ends in' : 'rent starts in'}</p>
          </Grid>
        </Grid>
      )}

      {shouldShowUpdateOperator() && (
        <Grid container className="operator-update-container">
          <Grid item className="info-warning-container">
            <WarningIcon />
            <div className="info-warning-text">
              <h3>Synchronise Operator</h3>
              <p>
                Synchronising the configured operator in LandWorks is important in order to update with the actual
                operator specified in the Metaverse.
              </p>
            </div>
          </Grid>
          <Grid item>
            <button
              className="update-operator-btn"
              type="button"
              onClick={handleUpdateOperator}
              disabled={isUpdateOperatorButtonDisabled}
            >
              <span>SYNCHRONISE</span>
            </button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default SingleViewLandCard;
