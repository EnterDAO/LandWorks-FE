/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Col, Image, Row } from 'antd';
import BigNumber from 'bignumber.js';

import Button from 'components/antd/button';
import Icon from 'components/custom/icon';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';

import ExternalLink from '../../../../components/custom/externalLink';
import { useWallet } from '../../../../wallets/wallet';
import { AssetEntity, CoordinatesLAND, fetchAdjacentDecentralandAssets, fetchAsset } from '../../api';
import LandWorkCard from '../../components/land-works-card';
import SingleViewLandHistory from '../../components/land-works-card-history';
import SingleViewLandCard from '../../components/land-works-card-single-view';
import { RentModal } from '../../components/lands-rent-modal';
import { WarningModal } from '../../components/lands-warning-modal';
import { AssetStatus } from '../../models/AssetStatus';
import { useLandworks } from '../../providers/landworks-provider';

import { getNowTs } from '../../../../utils';

import './index.scss';

const SingleLand: React.FC = () => {
  const wallet = useWallet();

  const { landWorksContract } = useLandworks();

  const history = useHistory();
  const { tokenId } = useParams<{ tokenId: string }>();
  const [asset, setAsset] = useState({} as AssetEntity);
  const [adjacentLands, setAdjacentLands] = useState([] as AssetEntity[]);
  const [showRentModal, setShowRentModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

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

  const getData = async (tokenId: string) => {
    const asset = await fetchAsset(tokenId);
    if (!asset.id) {
      //TODO: Maybe show error or special component when property can't be found
      history.push('/land-works');
      return;
    }
    setAsset(asset);

    const assetCoordinates = asset?.decentralandData?.coordinates!;
    const neighbours = calculateNeighbours(assetCoordinates);

    const adjacentLands = await fetchAdjacentDecentralandAssets(neighbours);
    setAdjacentLands(adjacentLands);
  };

  const shouldShowWithdraw = () => {
    return isOwner() && asset?.status === AssetStatus.DELISTED;
  };

  const shouldShowDelist = () => {
    return isOwner() && asset?.status === AssetStatus.LISTED;
  };

  const shouldShowStake = () => {
    return isOwner() && asset?.status === AssetStatus.LISTED;
  };

  // Case when you do 2 in 1 Delist + Withdraw
  const isDirectWithdraw = () => {
    return isOwner() && asset?.status === AssetStatus.LISTED && getNowTs() > Number(asset.lastRentEnd);
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
    if (!asset.id || !wallet.account) {
      return;
    }
    try {
      await landWorksContract?.withdraw(asset.id);
      showToastNotification(ToastType.Success, 'Property withdrawn successfully!');
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

  const handleDelist = async () => {
    if (!asset.id || !wallet.account) {
      return;
    }

    try {
      await landWorksContract?.delist(asset.id);
      showToastNotification(ToastType.Success, 'Property delisted successfully!');
      setShowWarningModal(false);
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while delisting the property.');
      console.log(e);
    }
  };

  useEffect(() => {
    getData(tokenId);
  }, [tokenId, wallet.account]);

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
            The property is rented until <strong>{asset.lastRentEnd}</strong>. Delisting the property now will make it
            unavailable for new renters. You will be able to withdraw your property from the Protocol once all rents
            end.
          </>
        }
      />
      <Row className="head-nav" style={{ marginBottom: '20px' }}>
        <Button style={{ marginRight: 20 }} type="light" className="back-btn" onClick={() => history.goBack()}>
          <span>
            <Icon name="arrow-back" className="eth-icon" />
            Back
          </span>
        </Button>
        {shouldShowEditButton() && (
          <Button type="light" className="edit-btn" onClick={() => history.push('/land-works/edit-property', asset)}>
            <span>EDIT</span>
          </Button>
        )}
        <div className='right-wrapper'>
          {shouldShowStake() && (
            <ExternalLink
              style={{ marginRight: 20, fontSize: 14 }}
              href="https://dao.enterdao.xyz/yield-farming"
              className="button-primary"
            >
              STAKE
            </ExternalLink>
          )}
          {shouldShowDelist() && (
            <button style={{ fontSize: 14 }} type="button" className="button-subtle" onClick={handleDelistButton}>
              <span>{isDirectWithdraw() ? 'WITHDRAW' : 'DELIST'}</span>
            </button>
          )}
          {shouldShowWithdraw() && (
            <button style={{ fontSize: 14 }} type="button" className="button-subtle" onClick={handleWithdraw}>
              <span>WITHDRAW</span>
            </button>
          )}
        </div>
      </Row>
      <SingleViewLandCard setShowRentModal={setShowRentModal} asset={asset} />
      <SingleViewLandHistory assetId={tokenId} />
      {!!adjacentLands.length && (
        <Row className="pooling-section">
          <Col className="pooling-heading">Pooling </Col>
          <Col className="pooling-description">
            The following properties are adjacent to this property. You can rent the adjacent properties to maximise the
            land you want to build scenes/experiences on
          </Col>
          <Col span={24}>
            <Row gutter={[15, 15]} style={{ paddingTop: '27px' }}>
              {adjacentLands.map((land) => (
                <LandWorkCard key={land.id} land={land} />
              ))}
            </Row>
          </Col>
        </Row>
      )}

      <RentModal
        onCancel={() => setShowRentModal(false)}
        visible={showRentModal}
        availability={asset.availability}
        assetId={asset.id}
        pricePerSecond={asset.pricePerSecond}
        paymentToken={asset.paymentToken}
      />
    </div>
  );
};

export default SingleLand;
