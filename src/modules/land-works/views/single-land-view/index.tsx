import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import { Col, Row } from 'antd';

import Button from 'components/antd/button';
import { timestampSecondsToDate } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';

import ExternalLink from '../../../../components/custom/externalLink';
import { useWallet } from '../../../../wallets/wallet';
import {
  ASSET_SUBSCRIPTION,
  AssetEntity,
  CoordinatesLAND,
  fetchAdjacentDecentralandAssets,
  parseAsset,
} from '../../api';
import LandWorkCard from '../../components/land-works-card';
import SingleViewLandHistory from '../../components/land-works-card-history';
import SingleViewLandCard from '../../components/land-works-card-single-view';
import { RentModal } from '../../components/lands-rent-modal';
import { LandsTooltip } from '../../components/lands-tooltip';
import { WarningModal } from '../../components/lands-warning-modal';
import { AssetStatus } from '../../models/AssetStatus';
import { useLandworks } from '../../providers/landworks-provider';

import { getNowTs } from '../../../../utils';

import './index.scss';

const SingleLandView: React.FC = () => {
  const wallet = useWallet();

  const { landWorksContract } = useLandworks();

  const history = useHistory();
  const { tokenId } = useParams<{ tokenId: string }>();
  const [asset, setAsset] = useState({} as AssetEntity);
  const [adjacentLands, setAdjacentLands] = useState([] as AssetEntity[]);
  const [showRentModal, setShowRentModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const [rentButtonDisabled, setRentButtonDisabled] = useState(false);
  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);
  const [delistButtonDisabled, setDelistButtonDisabled] = useState(false);
  const [withdrawButtonDisabled, setWithdrawButtonDisabled] = useState(false);
  const [editButtonDisabled, setEditButtonDisabled] = useState(false);
  const [isUpdateOperatorDisabled, setIsUpdateOperatorDisabled] = useState(false);

  useSubscription(ASSET_SUBSCRIPTION, {
    variables: { id: tokenId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }
      if (subscriptionData.data.asset === null) {
        history.push('/all');
        return;
      }
      disableButtons(false);
      setAsset(parseAsset(subscriptionData.data.asset));
    },
  });

  const calculateNeighbours = (coordinatesList: CoordinatesLAND[]): string[] => {
    let neighbours = [] as string[];
    for (const coordinates of coordinatesList) {
      neighbours = [...neighbours, ...getNeighbours(coordinates)];
    }

    return [...new Set(neighbours)].filter((item) => !coordinatesList.some((l) => l.id === item));
  };

  const getNeighbours = (coordinates: CoordinatesLAND): string[] => {
    const numX = +coordinates.x;
    const numY = +coordinates.y;
    return [`${numX - 1}-${numY}`, `${numX}-${numY - 1}`, `${numX}-${numY + 1}`, `${numX + 1}-${numY}`];
  };

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
      history.push('/all');
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while withdrawing the property.');
      console.log(e);
    }
  };

  const handleDelistButton = () => {
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
        history.push('/all');
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
  };

  useEffect(() => {
    updateAdjacentLands();
  }, [asset]);

  return (
    <div className="content-container single-card-section">
      <WarningModal
        onCancel={() => {
          setShowWarningModal(false);
        }}
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
      <Row gutter={40} className="head-nav">
        <div className="left-wrapper">
          {shouldShowEditButton() && (
            <Button
              style={{ fontSize: 14 }}
              type="link"
              className="button-accent"
              disabled={editButtonDisabled}
              onClick={() => history.push(`/property/${asset.id}/edit`, asset)}
            >
              <span>EDIT</span>
            </Button>
          )}
        </div>
        <div className="right-wrapper">
          {shouldShowStake() && (
            <ExternalLink
              style={{ marginRight: 20, fontSize: 14 }}
              href="https://dao.enterdao.xyz/yield-farming"
              className="button-primary"
            >
              STAKE
            </ExternalLink>
          )}
          {shouldShowDelist() &&
            (isOwner() ? (
              <Button
                type="link"
                style={{ fontSize: 14 }}
                className="button-subtle"
                onClick={handleDelistButton}
                disabled={delistButtonDisabled}
              >
                <span>{isDirectWithdraw() ? 'WITHDRAW' : 'DELIST'}</span>
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
                  <Button type="link" style={{ fontSize: 14 }} className="button-subtle" disabled={true}>
                    <span>{assetIsReadyForWithdraw() ? 'WITHDRAW' : 'DELIST'}</span>
                  </Button>
                </span>
              </LandsTooltip>
            ))}
          {shouldShowWithdraw() &&
            (isOwner() ? (
              shouldHaveWithdrawTooltip() ? (
                <LandsTooltip
                  placement="bottom"
                  trigger="hover"
                  text="There are still active/pending rents. You will be able to withdraw your property once all rents"
                >
                  <span>
                    <Button type="link" style={{ fontSize: 14 }} className="button-subtle" disabled={true}>
                      <span>WITHDRAW</span>
                    </Button>
                  </span>
                </LandsTooltip>
              ) : (
                <Button
                  type="link"
                  style={{ fontSize: 14 }}
                  className="button-subtle"
                  onClick={handleWithdraw}
                  disabled={withdrawButtonDisabled}
                >
                  <span>WITHDRAW</span>
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
                  <Button type="link" style={{ fontSize: 14 }} className="button-subtle" disabled={true}>
                    <span>WITHDRAW</span>
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
        <Row className="pooling-section">
          <div className="pooling-title">
            <p className="pooling-heading">Pooling </p>
            <p className="pooling-description">
              The following properties are adjacent to this property. You can rent the adjacent properties to maximise
              the land you want to build scenes/experiences on
            </p>
          </div>
          <Col span={24}>
            <Row gutter={[15, 15]} style={{ paddingTop: '27px' }}>
              {adjacentLands.map((land) => (
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
