/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@mui/material';
// import Skeleton from 'react-loading-skeleton';
import Grid from '@mui/material/Grid';
import splitbee from '@splitbee/web';
import BigNumber from 'bignumber.js';

import ExternalLink from 'components/custom/external-link';
import Icon from 'components/custom/icon';
import Image from 'components/custom/image';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
import config from 'config';
import { Box, Button, Stack, Tooltip, Typography } from 'design-system';
import { CopyIcon, MessageIcon } from 'design-system/icons';
import { getTokenIconName } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import useEnsName from 'hooks/useEnsName';
import InfoAlert from 'layout/components/info-alert';

import { ReactComponent as WarningIcon } from '../../../../resources/svg/warning.svg';
import { ReactComponent as FireIcon } from '../../../../resources/svg/white_fire.svg';
import { useWallet } from '../../../../wallets/wallet';
import { AssetEntity, RentEntity, fetchAssetRentByTimestamp, fetchUserFirstRentByTimestamp } from '../../api';
import { AssetStatus } from '../../models/AssetStatus';
import { useLandworks } from '../../providers/landworks-provider';
import LandsMapOverlay from '../lands-map-overlay';
import AdsToggle from './AdsToggle';
import CountdownBanner from './CountdownBanner';
import { StyledButton } from './styled';

import { getNowTs } from '../../../../utils';
import { DEFAULT_ADDRESS, ZERO_BIG_NUMBER, getEtherscanAddressUrl, shortenAddr } from '../../../../web3/utils';

import { THEME_COLORS } from 'themes/theme-constants';

import './index.scss';

type SingleLandProps = {
  setShowRentModal: (isShown: boolean) => void;
  isClaimButtonDisabled: boolean;
  isRentButtonDisabled: boolean;
  isUpdateOperatorButtonDisabled: boolean;
  onAdsToggle?: (value: boolean) => void;
  asset?: AssetEntity;
  onClaimSubmit: () => void;
};

const SingleViewLandCard: React.FC<SingleLandProps> = ({
  setShowRentModal,
  onAdsToggle,
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
  const [openOwnerTooltip, setOpenOwnerTooltip] = useState(false);
  const [openOperatorTooltip, setOpenOperatorTooltip] = useState(false);

  const isOwnerOrConsumer =
    wallet.account &&
    (wallet.account.toLowerCase() === asset?.owner?.id.toLowerCase() ||
      wallet.account.toLowerCase() === asset?.consumer?.id.toLowerCase());

  const isNotListed = () => asset?.status !== AssetStatus.LISTED;
  const isAvailable = asset?.isAvailable && asset?.availability.isCurrentlyAvailable;

  const shouldShowUpdateOperator =
    currentRent?.renter &&
    wallet?.account &&
    asset?.operator &&
    currentRent.renter.id.toLowerCase() === wallet.account.toLowerCase() &&
    currentRent.operator.toLowerCase() !== asset?.operator?.toLowerCase();

  const shouldShowRenterCountdown =
    countDownRent?.renter?.id && countDownRent?.renter?.id.toLowerCase() === wallet.account?.toLowerCase();

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
        await landWorksContract?.updateState(
          asset!.id,
          asset?.metaverseRegistry?.id || '',
          rentArray[1],
          onClaimSubmit
        );
        showToastNotification(ToastType.Success, 'Operator updated successfully!');
      }
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while updating the operator.');
      console.log(e);
    }
  };

  const handleRent = async () => {
    splitbee.track('Rent button click', {
      assetId: asset?.id,
    });

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

  const isAssetStaked = () => {
    return asset?.owner?.id == config.contracts.yf.staking;
  };

  const ownerOrConsumer = isAssetStaked() ? asset?.consumer?.id : asset?.owner?.id;

  const hadleTooltip = (address: string, type: string) => {
    navigator.clipboard.writeText(address).then(() => {
      type === 'owner' ? setOpenOwnerTooltip(true) : setOpenOperatorTooltip(true);
      setTimeout(() => {
        setOpenOwnerTooltip(false);
        setOpenOperatorTooltip(false);
      }, 1000);
    });
  };

  const openChat = (address: string | undefined) => {
    if (!address) return;
    window.open(`https://chat.blockscan.com/index?a=${address}`, '_blank');
  };

  const { data: ensOwnerOrConsumer } = useEnsName(ownerOrConsumer ? ownerOrConsumer : null);
  const { data: ensOperator } = useEnsName(asset?.operator ? asset?.operator : null);

  useEffect(() => {
    if (asset?.id) {
      setLoading(false);
    }
  }, [asset]);

  const isOwner = wallet.account && wallet.account?.toLowerCase() === asset?.owner?.id.toLowerCase();

  const details = useMemo(() => {
    const _details = [
      {
        label: 'Owned by',
        content: (
          <Box display="flex" alignItems="center">
            <ExternalLink href={getEtherscanAddressUrl(ownerOrConsumer)} className="land-owner-address">
              {ensOwnerOrConsumer && ensOwnerOrConsumer !== ownerOrConsumer
                ? ensOwnerOrConsumer
                : shortenAddr(ownerOrConsumer, 25, 4)}
            </ExternalLink>

            <Box display="flex">
              <Tooltip
                open={openOwnerTooltip}
                PopperProps={{
                  disablePortal: true,
                }}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                placement="right"
                title={'Copied!'}
              >
                <StyledButton onClick={() => hadleTooltip(`${ensOwnerOrConsumer || ownerOrConsumer}`, 'owner')}>
                  <CopyIcon />
                </StyledButton>
              </Tooltip>
              <Tooltip disableFocusListener placement="right" title={'Contact owner via Blockscan'}>
                <div>
                  <StyledButton
                    disabled={ownerOrConsumer?.toLowerCase() == wallet.account?.toLowerCase()}
                    onClick={() => openChat(ensOwnerOrConsumer || ownerOrConsumer)}
                  >
                    <MessageIcon />
                  </StyledButton>
                </div>
              </Tooltip>
            </Box>
          </Box>
        ),
      },
      {
        label: 'Current Operator',
        tooltip: 'The operator currently set and authorised to deploy scenes and experiences in the metaverse.',
        content: (
          <Box display="flex" alignItems="center">
            <ExternalLink href={getEtherscanAddressUrl(asset?.operator)} className="land-operator-address">
              {ensOperator && ensOperator !== asset?.operator ? ensOperator : shortenAddr(asset?.operator, 25, 4)}
            </ExternalLink>
            <Box display="flex">
              <Tooltip
                open={openOperatorTooltip}
                PopperProps={{
                  disablePortal: true,
                }}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                placement="right"
                title="Copied!"
              >
                <StyledButton onClick={() => hadleTooltip(`${ensOperator || asset?.operator}`, 'operator')}>
                  <CopyIcon />
                </StyledButton>
              </Tooltip>
              <Tooltip disableFocusListener placement="right" title={'Contact operator via Blockscan'}>
                <div>
                  <StyledButton disabled={asset?.operator == DEFAULT_ADDRESS} onClick={() => openChat(asset?.operator)}>
                    <MessageIcon />
                  </StyledButton>
                </div>
              </Tooltip>
            </Box>
          </Box>
        ),
      },
    ];

    const isDecentraland = asset?.metaverse?.name === 'Decentraland';

    if (isOwnerOrConsumer && isDecentraland) {
      _details.push({
        label: 'Allow advertising',
        tooltip: 'Toggle to allow advertising on your land.',
        content: <AdsToggle onChange={onAdsToggle} asset={asset} />,
      });
    }

    return _details;
  }, [ensOwnerOrConsumer, ensOperator, ownerOrConsumer, openOperatorTooltip, wallet?.account, isOwner, asset]);

  const hashtags = [asset?.type, asset?.metaverse?.name];

  return (
    <>
      <Grid container spacing={8} className="single-land-card-container">
        {loading ? (
          <>
            <Grid item xs={12} lg={5} minHeight={400} display="flex" flexDirection="column">
              <Skeleton
                sx={{ bgcolor: 'var(--theme-card-color)', flexBasis: 0, flexGrow: 1, borderRadius: '20px' }}
                variant="rectangular"
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <Box
                minHeight={400}
                bgcolor="var(--theme-card-color)"
                p={6}
                borderRadius="20px"
                sx={{
                  '& .MuiSkeleton-root': {
                    bgcolor: 'var(--theme-modal-color) !important',
                    borderRadius: '5px',
                  },
                }}
              >
                <Skeleton height={32} variant="rectangular" sx={{ maxWidth: 350, mb: '7px' }} />
                <Skeleton height={18} variant="rectangular" sx={{ maxWidth: 200, mb: 6 }} />
                <Stack maxWidth={520} gap={4} mb="36px">
                  <Skeleton height={30} variant="rectangular" />
                  <Skeleton height={30} variant="rectangular" />
                </Stack>
                <Skeleton height={149} variant="rectangular" sx={{ borderRadius: '25px !important' }} />
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} lg={5} minHeight={400} display="flex" flexDirection="column">
              <Box flexBasis={0} flexGrow={1} className="map-image-wrapper">
                <Image alt={asset?.name} src={asset?.imageUrl} sx={{ objectFit: 'cover', width: 1, height: 1 }} />
                <LandsMapOverlay
                  title={asset?.type || ''}
                  coordinates={asset?.decentralandData?.coordinates}
                  place={asset?.place}
                />
              </Box>
            </Grid>

            <Grid item xs={12} lg={7} display="flex" flexDirection="column">
              <Box className="properties-container">
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

                <Box display="flex" gap={2} mt="7px">
                  {hashtags.map((hashtag) => {
                    return (
                      <Typography key={hashtag} variant="body2" textTransform="uppercase">
                        #{hashtag}
                      </Typography>
                    );
                  })}
                </Box>

                <Stack spacing={4} mt={6} mb="auto">
                  {details.map((detail, i) => {
                    return (
                      <Box key={i} display="flex" alignItems="center" flexWrap="wrap" minHeight={30} columnGap={6}>
                        <Typography
                          display="inline-flex"
                          fontWeight={500}
                          color={THEME_COLORS.grey03}
                          variant="body2"
                          flex="0 0 141px"
                        >
                          {detail.label}
                          {!!detail.tooltip && (
                            <Tooltip disableFocusListener placement="bottom-start" title={detail.tooltip}>
                              <span>
                                <Icon name="about" className="info-icon" />
                              </span>
                            </Tooltip>
                          )}
                        </Typography>

                        <Box>{detail.content}</Box>
                      </Box>
                    );
                  })}
                </Stack>
                {!asset?.isEmptyEstate && (
                  <Box className="rent-section">
                    <Grid container columnSpacing={5} rowSpacing={2} className="rent-price">
                      <Grid item xs={12} xl={6.5} className="price-wrapper">
                        <div className="period-wrapper">
                          <Box display="flex">
                            <span className="period-title">Rent period</span>
                            <span className="available-period">
                              {asset?.minPeriodTimedType} - {asset?.maxPeriodTimedType}
                            </span>
                          </Box>
                          <Box display="flex">
                            <span className="period-title">Max Rent Queue</span>
                            <span className="available-period">{asset?.maxFutureTimeTimedType}</span>
                          </Box>
                        </div>
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
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} xl={5.5}>
                        <Grid item className="property-button">
                          {isOwnerOrConsumer ? (
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
                          ) : (
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
                          <ExternalLink className="marketplace-link" target={'_blank'} href={asset?.externalUrl}>
                            <span>view in metaverse</span>
                          </ExternalLink>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            </Grid>

            {shouldShowRenterCountdown && (
              <Grid item xs={12} lg={7} ml="auto" display="flex" mt={-8} justifyContent="center">
                <CountdownBanner date={Number(countDownTimestamp) * 1000} label={countDownPlaceholderMessage} />
              </Grid>
            )}
          </>
        )}
      </Grid>

      {shouldShowUpdateOperator && (
        <InfoAlert
          sx={{ maxWidth: 1024, mx: 'auto', mt: 6, p: 6, borderRadius: '20px', gap: 3 }}
          icon={<WarningIcon />}
          title="Synchronise Operator"
          description="Synchronising the configured operator in LandWorks is important in order to update with the actual operator specified in the Metaverse. "
          action={
            <Button
              variant="primary"
              btnSize="medium"
              onClick={handleUpdateOperator}
              disabled={isUpdateOperatorButtonDisabled}
            >
              Synchronize
            </Button>
          }
        />
      )}
    </>
  );
};

export default SingleViewLandCard;
