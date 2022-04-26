import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import usePagination from '@mui/material/usePagination/usePagination';

import { Col, Row } from 'antd';
import { Button, Grid, Icon, Modal, Typography } from 'design-system';
import { ArrowLeftIcon, ArrowRightIcon, BackIcon, TwitterIcon } from 'design-system/icons';
import { timestampSecondsToDate } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import { LocationState } from 'modules/interface';
import EditPropertyViewNew from 'modules/land-works/components/edit-property';
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import { ShareLink } from 'modules/land-works/components/lands-list-modal/styled';

import ExternalLink from '../../../../components/custom/external-link';
import { useWallet } from '../../../../wallets/wallet';
import { ASSET_SUBSCRIPTION, AssetEntity, fetchAdjacentDecentralandAssets, parseAsset } from '../../api';
import SingleViewLandHistory from '../../components/land-works-card-history';
import SingleViewLandCard from '../../components/land-works-card-single-view';
import { RentModal } from '../../components/lands-rent-modal';
import { LandsTooltip } from '../../components/lands-tooltip';
import { AssetStatus } from '../../models/AssetStatus';
import { useLandworks } from '../../providers/landworks-provider';

import { calculateNeighbours } from 'modules/land-works/utils';
import { getNowTs } from '../../../../utils';

import { TWITTER_TEXT } from 'modules/land-works/constants';

import './index.scss';

const SingleLandView: React.FC = () => {
  const wallet = useWallet();

  const { landWorksContract } = useLandworks();

  const history = useHistory();
  const location = useLocation<LocationState>();
  const { tokenId } = useParams<{ tokenId: string }>();
  const [asset, setAsset] = useState({} as AssetEntity);

  const [adjacentLands, setAdjacentLands] = useState([] as AssetEntity[]);
  const [paginatedNearbyLands, setPaginatedNearbyLands] = useState([] as AssetEntity[]);
  const [itemsOnPage] = useState(4);

  const [showRentModal, setShowRentModal] = useState(false);
  const [openDelistPrompt, setOpenDelistPrompt] = useState(false);

  const [rentButtonDisabled, setRentButtonDisabled] = useState(false);
  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);
  const [delistButtonDisabled, setDelistButtonDisabled] = useState(false);
  const [withdrawButtonDisabled, setWithdrawButtonDisabled] = useState(false);
  const [editButtonDisabled, setEditButtonDisabled] = useState(false);
  const [isUpdateOperatorDisabled, setIsUpdateOperatorDisabled] = useState(false);
  const [page, setPage] = useState(1);

  const [showEditModal, setShowEditModal] = useState(false);

  useSubscription(ASSET_SUBSCRIPTION, {
    variables: { id: tokenId },
    onSubscriptionData: async ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }
      if (subscriptionData.data.asset === null) {
        history.push('/explore');
        return;
      }
      disableButtons(false);
      setAsset(await parseAsset(subscriptionData.data.asset));
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
    return isOwner() && asset?.status === AssetStatus.LISTED && asset?.metaverse.name === 'Decentraland';
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
        localStorage.setItem('WITHDRAW_IN_PROGRESS', asset.metaverseAssetId);
      });
      showToastNotification(ToastType.Success, 'Property withdrawn successfully!');
      if (isNeedRedirect()) history.push('/explore');
    } catch (e) {
      localStorage.removeItem('WITHDRAW_IN_PROGRESS');
      showToastNotification(ToastType.Error, 'There was an error while withdrawing the property.');
      console.log(e);
    }
  };

  const handleConfirmDialog = () => {
    setOpenDelistPrompt(false);
    // no active rent - delist & withdraw , handeDelist()
    // active rent - delist, handleDelist()
    // delisted & actie - button disabled
    // delisted & no active rent - withdraw, handleWithDraw()
    if (shouldShowWithdraw()) {
      handleWithdraw();
    } else {
      handleDelist();
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
        isDirectWithdraw() && localStorage.setItem('WITHDRAW_IN_PROGRESS', asset.metaverseAssetId);
        disableButtons(true);
      });
      showToastNotification(
        ToastType.Success,
        `Property ${isDirectWithdraw() ? 'withdrawn' : 'delisted'} successfully!`
      );
      if (isDirectWithdraw() && isNeedRedirect()) {
        history.push('/explore');
      }
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while delisting the property.');
      localStorage.removeItem('WITHDRAW_IN_PROGRESS');
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

  const showPrompt = () => {
    setShowEditModal(false);
    setOpenDelistPrompt(true);
  };

  useEffect(() => {
    setClaimButtonDisabled(!asset?.unclaimedRentFee?.gt(0));
  }, [asset]);

  const isWithdraw = () => {
    return isDirectWithdraw() || shouldShowWithdraw();
  };

  const isNeedRedirect = () => window.location.pathname === `/property/${asset.id}`;
  const breadcrumbs = {
    url: location.state?.previousPage?.from || location.state?.from || '/explore',
    title: location.state?.previousPage?.title || location.state?.title || 'Explore',
  };

  return (
    <div className="content-container single-card-section">
      <Modal height={'100%'} handleClose={() => setOpenDelistPrompt(false)} open={openDelistPrompt}>
        <Grid container width="410px" direction="column">
          <Typography fontSize={25} variant="h2">
            {isWithdraw() ? 'Do you want to withdraw ?' : 'Warning'}
          </Typography>
          <Typography fontSize={16} fontWeight="normal" sx={{ margin: '10px 0 40px 0' }} variant="subtitle1">
            {isWithdraw() ? (
              'Are you sure you want to withdraw this property? This action cannot be reversed.'
            ) : (
              <span>
                The property is rented until <strong>{timestampSecondsToDate(asset.lastRentEnd || '0')}</strong>.
                Delisting the property now will make it unavailable for new renters. You will be able to withdraw your
                property from the Protocol once all rents end.
              </span>
            )}
          </Typography>
          <Grid container direction="row" justifyContent="space-between">
            <Button variant="secondary" btnSize="medium" onClick={() => setOpenDelistPrompt(false)}>
              No, go back
            </Button>
            <Button variant="gradient" btnSize="medium" onClick={handleConfirmDialog}>
              Yes, {isWithdraw() ? 'withdraw' : 'delist'}
            </Button>
          </Grid>
        </Grid>
      </Modal>

      <Grid container className="head-nav">
        <div className="left-wrapper">
          <div className="head-breadcrumbs">
            <Link
              className="button-back"
              to={{
                pathname: breadcrumbs.url,
                state: {
                  tab: location.state?.tab,
                },
              }}
            >
              <div className="button-icon">
                <Icon iconSize={'m'} iconElement={<BackIcon />} />
              </div>
              <span>Back to {breadcrumbs.title}</span>
            </Link>

            <p className="separator" />

            <Link
              className="button-explore"
              to={{
                pathname: breadcrumbs.url,
                state: {
                  tab: location.state?.tab,
                },
              }}
            >
              {breadcrumbs.title}
            </Link>

            <Icon iconSize={'m'} iconElement={<ArrowRightIcon />} />

            <p className="current-land">{asset.name}</p>
          </div>
        </div>

        <div className="right-wrapper">
          {isOwnerOrConsumer() && (
            <>
              <ShareLink
                className="shareLink"
                target={'_blank'}
                href={`https://twitter.com/intent/tweet?text=${TWITTER_TEXT}&url=${window.location.origin}/property/${asset.id}`}
              >
                <TwitterIcon height={20} width={30} />
                share on twitter
              </ShareLink>
              <span className="separator" style={{ marginRight: '15px' }} />
            </>
          )}
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
                target={
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
              onClick={() => setShowEditModal(true)}
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
                  target="There are still active/pending rents. You will be able to withdraw your property once all rents end."
                >
                  <span>
                    <Button variant="tertiary" btnSize="xsmall" disabled={true}>
                      WITHDRAW
                    </Button>
                  </span>
                </LandsTooltip>
              ) : (
                <Button
                  variant="tertiary"
                  btnSize="xsmall"
                  onClick={() => setOpenDelistPrompt(true)}
                  disabled={withdrawButtonDisabled}
                >
                  WITHDRAW
                </Button>
              )
            ) : (
              <LandsTooltip
                placement="bottom"
                target={
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
      </Grid>

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

      <SingleViewLandHistory assetId={tokenId} metaverseRegistry={asset.metaverseRegistry?.id} />

      {!!adjacentLands.length && (
        <Grid container className="nearby-section">
          <div className="nearby-title">
            <p className="nearby-heading">Nearby Properties </p>
            <p className="nearby-description">{adjacentLands.length} Properties</p>
          </div>

          <Grid item xs={24} className="single-lands-pagination">
            {items.map(({ type, ...item }, index) => {
              if (['next', 'previous'].includes(type))
                return (
                  <button {...item} key={index}>
                    {type === 'previous' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
                  </button>
                );
            })}
          </Grid>

          <Grid item xs={24}>
            <Grid container spacing={[15, 15]}>
              {paginatedNearbyLands.map((land) => (
                <LandWorkCard key={land.id} land={land} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}

      {showEditModal && (
        <Modal height={'90vh'} open={showEditModal} handleClose={() => setShowEditModal(false)}>
          <EditProperty
            closeModal={() => setShowEditModal(false)}
            openDelistPrompt={showPrompt}
            delistText={isWithdraw() ? 'withdraw property' : 'delist property'}
          />
        </Modal>
      )}

      {showRentModal && (
        <RentModal
          onCancel={() => {
            setShowRentModal(false);
          }}
          onSubmit={() => {
            disableButtons(true);
            // setShowRentModal(false);
          }}
          open={showRentModal}
          availability={asset.availability}
          metaverseAssetId={asset.metaverseAssetId}
          metaverseRegistry={asset.metaverseRegistry?.id}
          assetId={asset.id}
          children={<></>}
          pricePerSecond={asset.pricePerSecond}
          paymentToken={asset.paymentToken}
        />
      )}
    </div>
  );
};

export default SingleLandView;
