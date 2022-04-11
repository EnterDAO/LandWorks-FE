/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import Countdown, { CountdownTimeDelta, zeroPad } from 'react-countdown';
import Grid from '@mui/material/Grid';
import BigNumber from 'bignumber.js';

import ExternalLink from 'components/custom/external-link';
import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import config from 'config';
import { Button, Tooltip } from 'design-system';
import { getENSName, getLandImageUrl, getTokenIconName } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';

import { ReactComponent as WarningIcon } from '../../../../resources/svg/warning.svg';
import { ReactComponent as FireIcon } from '../../../../resources/svg/white_fire.svg';
import { useWallet } from '../../../../wallets/wallet';
import { AssetEntity, RentEntity, fetchAssetRentByTimestamp, fetchUserFirstRentByTimestamp } from '../../api';
import { AssetStatus } from '../../models/AssetStatus';
import { useLandworks } from '../../providers/landworks-provider';
import SingleLandCardSkeleton from '../land-single-card-loader';
import LandsMapOverlay, { CryptoVoxelsPlace } from '../lands-map-overlay';

import { getNowTs } from '../../../../utils';
import {
  ZERO_BIG_NUMBER,
  getCryptoVexelsPlayUrl,
  getDecentralandPlayUrl,
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
  const [countDownPlaceholderMessage, setCountDownPlaceholderMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const isOwnerOrConsumer = () => {
    return (
      wallet.account &&
      (wallet.account.toLowerCase() === asset?.owner?.id.toLowerCase() ||
        wallet.account.toLowerCase() === asset?.consumer?.id.toLowerCase())
    );
  };

  const isNotListed = () => asset?.status !== AssetStatus.LISTED;
  const isAvailable = asset?.isAvailable && asset?.availability.isCurrentlyAvailable;

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
          setCountDownPlaceholderMessage('rent ends in');
          setCountDownRent(rent);
        } else {
          const rent = await fetchUserFirstRentByTimestamp(asset.id, wallet.account.toLowerCase(), getNowTs());
          setCountDownTimestamp(rent.start);
          setCountDownPlaceholderMessage('rent starts in');
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
    const hours = props.hours >= 0 ? `${zeroPad(props.hours)} : ` : '';
    const minutes = props.minutes >= 0 ? `${zeroPad(props.minutes)} : ` : '';
    const seconds = props.seconds >= 0 ? `${zeroPad(props.seconds)} ` : '';
    const expired = days || hours || minutes || seconds;
    const placeholder = expired ? `${days}${hours}${minutes}${seconds} ` : '';
    return <p className="remaining-time">{placeholder}</p>;
  };

  const isAssetStaked = () => {
    return asset?.owner?.id == config.contracts.yf.staking;
  };

  const ownerOrConsumer = isAssetStaked() ? asset?.consumer?.id : asset?.owner?.id;
  const isDecentraland = Boolean(asset?.decentralandData);

  const [ens, setEns] = useState<string>();
  const [ensOperator, setEnsOperator] = useState<string>();

  useEffect(() => {
    if (asset?.name) {
      setLoading(false);
    }
  }, [asset]);

  useEffect(() => {
    if (ownerOrConsumer) {
      getENSName(ownerOrConsumer).then((ensName) => {
        setEns(ensName);
      });
    }
    if (asset?.operator)
      getENSName(asset?.operator).then((ensName) => {
        setEnsOperator(ensName);
      });
  }, [asset]);

  const cryptoVoxelsPlace = (): CryptoVoxelsPlace => {
    if (!asset?.attributes) return undefined;
    return { island: asset?.attributes?.island, suburb: asset?.attributes?.suburb };
  };

  return (
    <Grid container justifyContent="space-between" className="single-land-card-container">
      {loading ? (
        <SingleLandCardSkeleton />
      ) : (
        <>
          <Grid xs={12} md={6} item>
            <div className="map-image-wrapper">
              <img alt="vector Icon" className="card-image" src={asset?.imageUrl || getLandImageUrl(asset)} />
              <LandsMapOverlay
                title={asset?.attributes?.title || (asset?.decentralandData?.isLAND ? 'Land' : 'Estate')}
                coordinates={asset?.decentralandData?.coordinates}
                place={cryptoVoxelsPlace()}
              />
            </div>
          </Grid>

          <Grid xs={12} md={6} item className="properties-container">
            <Grid container className="head-container">
              <Grid item className="title-container">
                <span className="title-container__text" title={asset?.name?.toLowerCase()}>
                  {asset?.name?.toLowerCase()}
                </span>
                <span className={`title-container__pill button-section `}>
                  <button
                    className={`${
                      isNotListed() ? 'button-delisted' : isAvailable ? 'button-available' : 'button-rented'
                    }`}
                  >
                    <div
                      className={`button-label ${
                        isNotListed()
                          ? 'button-delisted-dot'
                          : isAvailable
                          ? 'button-available-dot'
                          : 'button-rented-dot'
                      }`}
                    />
                    {isNotListed() ? 'Delisted' : isAvailable ? 'Available' : 'Rented'}
                  </button>
                </span>
                {asset?.isHot && (
                  <span className="title-container__hot label card-hot-label">
                    <FireIcon className="name-label" />
                  </span>
                )}
              </Grid>
            </Grid>
            <Grid container className="hashtag-row">
              {isDecentraland ? (
                <Grid item>{asset?.decentralandData?.isLAND ? <p>#LAND</p> : <p>#ESTATE</p>}</Grid>
              ) : (
                <Grid item>
                  <p>#{asset?.attributes?.title.toUpperCase()}</p>
                </Grid>
              )}
              <Grid item>{asset?.metaverse?.name && <p>#{asset?.metaverse?.name}</p>}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={24} className="properties-row">
                <Grid container>
                  <Grid item xs={4} className="land-owner">
                    Owned by
                  </Grid>
                  <Grid item>
                    <ExternalLink href={getEtherscanAddressUrl(ownerOrConsumer)} className="land-owner-address">
                      {ens && ens !== ownerOrConsumer ? ens : shortenAddr(ownerOrConsumer, 25, 4)}
                    </ExternalLink>
                  </Grid>
                </Grid>
                <Grid container className="operator-container">
                  <Grid item xs={4} className="current-address">
                    Current Operator
                    <Tooltip
                      disableFocusListener
                      placement="bottom-start"
                      title={
                        'The operator currently set and authorised to deploy scenes and experiences in the metaverse.'
                      }
                    >
                      <div>
                        <Icon name="about" className="info-icon" />
                      </div>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <ExternalLink href={getEtherscanAddressUrl(asset?.operator)} className="land-operator-address">
                      {ensOperator && ensOperator !== asset?.operator
                        ? ensOperator
                        : shortenAddr(asset?.operator, 25, 4)}
                    </ExternalLink>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container className="rent-section">
                <Grid container columnSpacing={5} rowSpacing={2} className="rent-price">
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
                        <span className="price-eth">
                          {(asset?.pricePerMagnitude ? asset?.pricePerMagnitude?.price : new BigNumber('0')).toNumber()}
                        </span>
                        <p>{asset?.paymentToken?.symbol}</p>

                        <div className="usd-price-container">
                          <SmallAmountTooltip
                            className="price"
                            symbol="$"
                            amount={asset?.pricePerMagnitude?.usdPrice || ZERO_BIG_NUMBER}
                          />
                          <span className="per-day">/{asset?.pricePerMagnitude?.magnitude}</span>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} xl={5.5}>
                    <Grid item className="property-button">
                      {isOwnerOrConsumer() && (
                        <Button
                          variant="gradient"
                          btnSize="small"
                          type="button"
                          className={'button-primary'}
                          onClick={handleClaim}
                          disabled={isClaimButtonDisabled}
                        >
                          <span>CLAIM RENT</span>
                        </Button>
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
                        href={
                          getCryptoVexelsPlayUrl(asset?.metaverseAssetId) ||
                          getDecentralandPlayUrl(asset?.decentralandData?.coordinates)
                        }
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
                <p className="rented-on">{countDownPlaceholderMessage}</p>
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
        </>
      )}
    </Grid>
  );
};

export default SingleViewLandCard;
