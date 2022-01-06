/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Col, Image, Row } from 'antd';

import Button from 'components/antd/button';
import Icon, { TokenIconNames } from 'components/custom/icon';

import { useWallet } from '../../../../wallets/wallet';
import { AssetEntity, CoordinatesLAND, fetchAdjacentDecentralandAssets, fetchAsset } from '../../api';
import LandWorkCard from '../../components/land-works-card';
import SingleViewLandHistory from '../../components/land-works-card-history';
import SingleViewLandCard from '../../components/land-works-card-single-view';
import { RentModal } from '../../components/lands-rent-modal';
import { WarningModal } from '../../components/lands-warning-modal';
import LandWorksContract from '../../contracts/core/LandWorksContract';
import { AssetStatus } from '../../models/AssetStatus';

import './index.scss';

const SingleLand: React.FC = () => {
  const wallet = useWallet();

  const history = useHistory();
  const { tokenId } = useParams<{ tokenId: string }>();
  const [asset, setAsset] = useState({} as AssetEntity);
  const [lands, setLands] = useState([] as AssetEntity[]);
  const [showRentModal, setShowRentModal] = useState(false);

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
    setAsset(asset);

    const assetCoordinates = asset?.decentralandData?.coordinates!;
    const neighbours = calculateNeighbours(assetCoordinates);

    const adjacentLands = await fetchAdjacentDecentralandAssets(neighbours);
    setLands(adjacentLands);
  };

  const shouldShowWithdraw = () => {
    return isOwnerOrConsumer() && asset?.status === AssetStatus.DELISTED;
  };

  const isOwnerOrConsumer = () => {
    return (
      wallet.account &&
      (wallet.account.toLowerCase() === asset?.owner?.id.toLowerCase() ||
        wallet.account.toLowerCase() === asset?.consumer?.id.toLowerCase())
    );
  };

  const handleWithdraw = () => {console.log("withdraw")};

  useEffect(() => {
    getData(tokenId);
  }, [tokenId, wallet.account]);

  return (
    <div className="content-container single-card-section">
      <WarningModal
        onCancel={() => {console.log("cancel")}}
        text={
          <>
            The property is rented until <strong>12.11.2021 12:35</strong>. Delisting the property now will make it
            unavailable for new renters. You will be able to withdraw your property from the Protocol once all rents
            end.
          </>
        }
      />
      <Row className="head-nav" style={{ marginBottom: '20px' }}>
        <Button type="light" className="back-btn" onClick={() => history.goBack()}>
          <span>
            <Icon name="arrow-back" className="eth-icon" />
            Back
          </span>
        </Button>
        {isOwnerOrConsumer() && (
          <Button type="light" className="back-btn" onClick={() => console.log('edit')}>
            <span>Edit</span>
          </Button>
        )}
        {shouldShowWithdraw() && (
          <button type="button" className="button-primary" onClick={handleWithdraw}>
            <span>WITHDRAW</span>
          </button>
        )}
      </Row>
      <SingleViewLandCard setShowRentModal={setShowRentModal} asset={asset} />
      <SingleViewLandHistory assetId={tokenId} />
      <Row className="pooling-section">
        <Col className="pooling-heading">Pooling </Col>
        <Col className="pooling-description">
          The following properties are adjacent to this property. You can rent the adjacent properties to maximise the
          land you want to build scenes/experiences on
        </Col>
        <Col span={24}>
          <Row gutter={[15, 15]} style={{ paddingTop: '27px' }}>
            {lands.map((land) => (
              <LandWorkCard key={land.id} land={land} />
            ))}
          </Row>
        </Col>
      </Row>

      <RentModal onCancel={() => setShowRentModal(false)} visible={showRentModal} />
    </div>
  );
};

export default SingleLand;
