import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import usePagination from '@mui/material/usePagination/usePagination';
import { Col, Row } from 'antd';

import { Button, Grid, Icon, Modal, Typography } from 'design-system';
import { ArrowLeftIcon, ArrowRightIcon, BackIcon } from 'design-system/icons';
import { timestampSecondsToDate } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';

import ExternalLink from '../../../../components/custom/externalLink';
import { useWallet } from '../../../../wallets/wallet';
import { ASSET_SUBSCRIPTION, AssetEntity, fetchAdjacentDecentralandAssets, parseAsset } from '../../api';
import LandWorkCard from '../../components/land-works-card';
import SingleViewLandHistory from '../../components/land-works-card-history';
import SingleViewLandCard from '../../components/land-works-card-single-view';
import { RentModal } from '../../components/lands-rent-modal';
import { LandsTooltip } from '../../components/lands-tooltip';
import { WarningModal } from '../../components/lands-warning-modal';
import { AssetStatus } from '../../models/AssetStatus';
import { useLandworks } from '../../providers/landworks-provider';

import { calculateNeighbours } from 'modules/land-works/utils';
import { getNowTs } from '../../../../utils';

import './index.scss';

const SingleLandView: React.FC = () => {
  const wallet = useWallet();

  const { landWorksContract } = useLandworks();

  const history = useHistory();
  const { tokenId } = useParams<{ tokenId: string }>();
  const [asset, setAsset] = useState({} as AssetEntity);

  const [adjacentLands, setAdjacentLands] = useState([] as AssetEntity[]);
  const [paginatedNearbyLands, setPaginatedNearbyLands] = useState([] as AssetEntity[]);
  const [itemsOnPage] = useState(4);

  const [showRentModal, setShowRentModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [openDelistPrompt, setOpenDelistPrompt] = useState(false);

  const [rentButtonDisabled, setRentButtonDisabled] = useState(false);
  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);
  const [delistButtonDisabled, setDelistButtonDisabled] = useState(false);
  const [withdrawButtonDisabled, setWithdrawButtonDisabled] = useState(false);
  const [editButtonDisabled, setEditButtonDisabled] = useState(false);
  const [isUpdateOperatorDisabled, setIsUpdateOperatorDisabled] = useState(false);
  const [page, setPage] = useState(1);

  useSubscription(ASSET_SUBSCRIPTION, {
    variables: { id: tokenId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }
      if (subscriptionData.data.asset === null) {
        history.push('/explore');
        return;
      }
      disableButtons(false);
      setAsset(parseAsset(subscriptionData.data.asset));
    },
  });

  const shouldShowWithdraw = () => {
    return isOwnerOrConsumer() && asset?.status === AssetStatus.DELISTED;
  };

  const shouldHaveWithdrawTooltip = () => {
    return Number(asset?.lastRentEnd) > getNowTs();
  };

  const isOwnerOrConsumer = () => {
    return (
      wallet.account &&
      (wallet.account.toLowerCase() === asset?.owner?.id.toLowerCase() ||
        wallet.account.toLowerCase() === asset?.consumer?.id.toLowerCase())
    );
  };

  const shouldShowDelist = () => {
    return isOwnerOrConsumer() && asset?.status === AssetStatus.LISTED;
  };

  const shouldShowStake = () => {
    return isOwner() && asset?.status === AssetStatus.LISTED;
  };

  // Case when you do 2 in 1 Delist + Withdraw
  const isDirectWithdraw = () => {
    return isOwner() && assetIsReadyForWithdraw();
  };

  const assetIsReadyForWithdraw = () => {
    return asset?.status === AssetStatus.LISTED && getNowTs() > Number(asset.lastRentEnd);
  };

  const shouldShowEditButton = () => {
    return (
      wallet.account &&
      asset.status === AssetStatus.LISTED &&
      (wallet.account.toLowerCase() === asset?.owner?.id.toLowerCase() ||
        wallet.account.toLowerCase() === asset?.consumer?.id.toLowerCase())
    );
  };

  const isOwner = () => {
    return wallet.account && wallet.account.toLowerCase() === asset?.owner?.id.toLowerCase();
  };

  const handleWithdraw = async () => {
    if (!asset.id || !isOwner()) {
      return;
    }
    try {
      await landWorksContract?.withdraw(asset.id, () => {
        setWithdrawButtonDisabled(true);
      });
      showToastNotification(ToastType.Success, 'Property withdrawn successfully!');
      history.push('/explore');
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while withdrawing the property.');
      console.log(e);
    }
  };

  const handleDelistButton = () => {
    setOpenDelistPrompt(false);
    if (isDirectWithdraw()) {
      handleDelist();
    } else {
      setShowWarningModal(true);
    }
  };

  const disableButtons = (disabled: boolean) => {
    setDelistButtonDisabled(disabled);
    setWithdrawButtonDisabled(disabled);
    setClaimButtonDisabled(disabled);
    setRentButtonDisabled(disabled);
    setEditButtonDisabled(disabled);
    setIsUpdateOperatorDisabled(disabled);
  };

  const handleDelist = async () => {
    if (!asset.id || !wallet.account) {
      return;
    }

    try {
      await landWorksContract?.delist(asset.id, () => {
        disableButtons(true);
        setShowWarningModal(false);
      });
      showToastNotification(
        ToastType.Success,
        `Property ${isDirectWithdraw() ? 'withdrawn' : 'delisted'} successfully!`
      );
      if (isDirectWithdraw()) {
        history.push('/explore');
      }
      setShowWarningModal(false);
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while delisting the property.');
      console.log(e);
    }
  };

  const updateAdjacentLands = async () => {
    if (!asset) {
      return;
    }
    const assetCoordinates = asset?.decentralandData?.coordinates;
    const neighbours = calculateNeighbours(assetCoordinates || []);

    const adjacentLands = await fetchAdjacentDecentralandAssets(neighbours);

    setAdjacentLands(adjacentLands);
    setPaginatedNearbyLands(adjacentLands.slice(0, itemsOnPage));
  };

  const onPaginationChange = (pageNumber: number) => {
    const begin = (pageNumber - 1) * itemsOnPage;
    const end = begin + itemsOnPage;
    setPaginatedNearbyLands(adjacentLands.slice(begin, end));
  };

  const { items } = usePagination({
    count: adjacentLands.length / itemsOnPage,
    page: page,
    onChange: (event, pageNumber) => {
      setPage(pageNumber);
      onPaginationChange(pageNumber);
    },
  });

  useEffect(() => {
    updateAdjacentLands();
  }, [asset]);

  return (
    <div className="content-container single-card-section">
      <WarningModal
        onCancel={() => {
          setShowWarningModal(false);
        }}
        style={{ zIndex: '1005' }}
        onOk={handleDelist}
        visible={showWarningModal}
        text={
          <>
            The property is rented until <strong>{timestampSecondsToDate(asset.lastRentEnd || '0')}</strong>. Delisting
            the property now will make it unavailable for new renters. You will be able to withdraw your property from
            the Protocol once all rents end.
          </>
        }
      />

      <Modal height={'100%'} handleClose={() => setOpenDelistPrompt(false)} open={openDelistPrompt}>
        <Grid container width="410px" direction="column">
          <Typography fontSize={25} variant="h2">
            Do you want to delist?
          </Typography>
          <Typography fontSize={16} fontWeight="normal" sx={{ margin: '10px 0 40px 0' }} variant="subtitle1">
            Are you sure you want to delist this property? This action cannot be reversed.
          </Typography>
          <Grid container direction="row" justifyContent="space-between">
            <Button variant="secondary" btnSize="medium" onClick={() => setOpenDelistPrompt(false)}>
              No, go back
            </Button>
            <Button variant="gradient" btnSize="medium" onClick={handleDelistButton}>
              Yes, delist
            </Button>
          </Grid>
        </Grid>
      </Modal>

      <Row gutter={40} className="head-nav">
        <div className="left-wrapper">
          <div className="head-breadcrumbs">
            <Link className="button-back" to="/explore">
              <div className="button-icon">
                <Icon iconSize={'m'} iconElement={<BackIcon />} />
              </div>
              <span>Back to Explore</span>
            </Link>

            <p className="separator" />

            <Link className="button-explore" to="/explore">
              Explore
            </Link>

            <Icon iconSize={'m'} iconElement={<ArrowRightIcon />} />

            <p className="current-land">{asset.name}</p>
          </div>
        </div>

        <div className="right-wrapper">
          {shouldShowDelist() &&
            (isOwner() ? (
              <Button
                variant="tertiary"
                btnSize="xsmall"
                onClick={() => setOpenDelistPrompt(true)}
                disabled={delistButtonDisabled}
              >
                {isDirectWithdraw() ? 'WITHDRAW' : 'DELIST'}
              </Button>
            ) : (
              <LandsTooltip
                placement="bottom"
                trigger="hover"
                text={
                  <>
                    You are configured as consumer of the property. If you have staked the property in{' '}
                    <ExternalLink href="https://dao.enterdao.xyz/yield-farming">LandWorks Yield Farming</ExternalLink>,
                    make sure to unstake it in order to {assetIsReadyForWithdraw() ? 'withdraw' : 'delist'} it from the
                    marketplace.
                  </>
                }
              >
                <span>
                  <Button variant="tertiary" btnSize="xsmall" disabled={true}>
                    {assetIsReadyForWithdraw() ? 'WITHDRAW' : 'DELIST'}
                  </Button>
                </span>
              </LandsTooltip>
            ))}
          {shouldShowEditButton() && (
            <Button
              variant="accentblue"
              btnSize="xsmall"
              disabled={editButtonDisabled}
              onClick={() => history.push(`/property/${asset.id}/edit`, asset)}
            >
              EDIT
            </Button>
          )}
          {shouldShowStake() && (
            <Button
              variant="primary"
              btnSize="xsmall"
              disabled={editButtonDisabled}
              onClick={() => window.open('https://dao.enterdao.xyz/yield-farming', '_blank')}
            >
              STAKE
            </Button>
          )}
          {shouldShowWithdraw() &&
            (isOwner() ? (
              shouldHaveWithdrawTooltip() ? (
                <LandsTooltip
                  placement="bottom"
                  trigger="hover"
                  text="There are still active/pending rents. You will be able to withdraw your property once all rents"
                >
                  <span>
                    <Button variant="tertiary" btnSize="xsmall" disabled={true}>
                      WITHDRAW
                    </Button>
                  </span>
                </LandsTooltip>
              ) : (
                <Button variant="tertiary" btnSize="xsmall" onClick={handleWithdraw} disabled={withdrawButtonDisabled}>
                  WITHDRAW
                </Button>
              )
            ) : (
              <LandsTooltip
                placement="bottom"
                trigger="hover"
                text={
                  <>
                    You are configured as consumer of the property. If you have staked the property in{' '}
                    <ExternalLink href="https://dao.enterdao.xyz/yield-farming">LandWorks Yield Farming</ExternalLink>,
                    make sure to unstake it in order to withdraw it from the marketplace.
                  </>
                }
              >
                <span>
                  <Button variant="tertiary" btnSize="xsmall" disabled={true}>
                    WITHDRAW
                  </Button>
                </span>
              </LandsTooltip>
            ))}
        </div>
      </Row>
      <SingleViewLandCard
        isClaimButtonDisabled={claimButtonDisabled}
        isRentButtonDisabled={rentButtonDisabled}
        isUpdateOperatorButtonDisabled={isUpdateOperatorDisabled}
        setShowRentModal={setShowRentModal}
        asset={asset}
        onClaimSubmit={() => {
          disableButtons(true);
        }}
      />

      <SingleViewLandHistory assetId={tokenId} />

      {!!adjacentLands.length && (
        <Row className="nearby-section">
          <div className="nearby-title">
            <p className="nearby-heading">Nearby Properties </p>
            <p className="nearby-description">{adjacentLands.length} Properties</p>
          </div>

          <Col span={24} className="single-lands-pagination">
            {items.map(({ type, ...item }, index) => {
              if (['next', 'previous'].includes(type))
                return (
                  <button {...item} key={index}>
                    {type === 'previous' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
                  </button>
                );
            })}
          </Col>

          <Col span={24}>
            <Row gutter={[15, 15]}>
              {paginatedNearbyLands.map((land) => (
                <LandWorkCard key={land.id} land={land} />
              ))}
            </Row>
          </Col>
        </Row>
      )}

      {showRentModal && (
        <RentModal
          onCancel={() => {
            setShowRentModal(false);
          }}
          onSubmit={() => {
            disableButtons(true);
            setShowRentModal(false);
          }}
          visible={showRentModal}
          availability={asset.availability}
          assetId={asset.id}
          pricePerSecond={asset.pricePerSecond}
          paymentToken={asset.paymentToken}
        />
      )}
    </div>
  );
};

export default SingleLandView;
