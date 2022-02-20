import React, { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import { DECENTRALAND_METAVERSE, DEFAULT_LAST_RENT_END, sortColumns, sortDirections } from 'constants/modules';
import { useSubscription } from '@apollo/client';
import { end } from '@popperjs/core';
import { Col, Row } from 'antd';

import { Atlas } from 'components/custom/Atlas/Atlas';
import { Box, Typography } from 'design-system';
import { StyledSwitch } from 'design-system/Switch/Switch';
import { Option } from 'modules/interface';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import { LandsAction } from 'modules/land-works/components/lands-action';
import { ClaimModal } from 'modules/land-works/components/lands-claim-modal';
import { LandsSorter } from 'modules/land-works/components/lands-explore-filters/lands-price-sorter';
import { LandsSubheader } from 'modules/land-works/components/lands-explore-subheader';
import { useWallet } from 'wallets/wallet';

import {
  AssetEntity,
  USER_SUBSCRIPTION,
  UserEntity,
  fetchAllListedAssetsByMetaverseAndGteLastRentEndWithOrder,
  parseUser,
} from '../../api';
import { currencyData, data, landsData } from './filterData';

import './index.scss';

const ExploreView: React.FC = () => {
  const wallet = useWallet();

  const [lands, setLands] = useState([] as AssetEntity[]);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [user, setUser] = useState({} as UserEntity);

  const [sortDir, setSortDir] = useState(sortDirections[0]);
  const [sortColumn, setSortColumn] = useState(sortColumns[0]);


  const [atlasMapX, setAtlasMapX] = useState(0);
  const [atlasMapY, setAtlasMapY] = useState(0);

  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useSubscription(USER_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }
      if (subscriptionData.data.user === null) {
        setUser({} as UserEntity);
        return;
      }

      setClaimButtonDisabled(false);
      setUser(parseUser(subscriptionData.data.user));
    },
  });

  const getAssets = async () => {
    const lands = await fetchAllListedAssetsByMetaverseAndGteLastRentEndWithOrder(
      DECENTRALAND_METAVERSE,
      DEFAULT_LAST_RENT_END,
      sortColumns[0],
      sortDirections[0],
    );

    console.log('getAssets', lands);

    setLands(lands.data);
    setLoading(false);
  };

  const onClickAtlasHandler = (land: AssetEntity) => {
    const { x, y } = land.decentralandData?.coordinates[0];
    setAtlasMapX(Number(x));
    setAtlasMapY(Number(y));
  };

  useEffect(() => {
    setLoading(true);
    getAssets();
  }, [wallet.account, sortColumn, sortDir]);

  const onPlaceChange = (value: SingleValue<Option>) => {
    // TODO:: some filtering here
    console.log({ value });
  };

  const onSortDirectionChange = (value: SingleValue<Option>) => {
    const sortIndex = Number(value) - 1;
    setSortDir(sortDirections[sortIndex]);
    setSortColumn(sortColumns[sortIndex]);

    console.log({ value });
  };

  return (
    <>
      <LandsSubheader
        totalLands={lands.length}
        hasMetamaskConnected={wallet.isActive && wallet.connector?.id === 'metamask'}
      />
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <LandsSorter onSortDirectionChange={onPlaceChange} data={landsData} />
          <LandsSorter onSortDirectionChange={onSortDirectionChange} data={currencyData} />
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Box style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <Typography>Mine Only</Typography>
            <Box style={{ marginLeft: '10px' }}>
              <StyledSwitch defaultChecked />
            </Box>
          </Box>
          <Box style={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>
            <Typography>Avalaible Only</Typography>
            <Box style={{ marginLeft: '10px' }}>
              <StyledSwitch />
            </Box>
          </Box>
          <LandsSorter onSortDirectionChange={onSortDirectionChange} data={data} />
        </Box>
      </Box>

      <div className="content-container content-container--explore-view">
        <Row className="lands-container">
          <Col span={12}>
            <Row justify={end} className="actions-container">
              {user.hasUnclaimedRent && (
                <Col className="lands-claim-container">
                  <LandsAction
                    onButtonClick={setShowClaimModal}
                    buttonText={'CLAIM '}
                    subHeading="You have"
                    isClaimButtonDisabled={claimButtonDisabled}
                    mainHeading="Unclaimed rent"
                  />
                </Col>
              )}
            </Row>
            <Row
              gutter={[
                { xs: 16, sm: 16, md: 16, lg: 32 },
                { xs: 16, sm: 16, md: 16, lg: 32 },
              ]}
              className="cards-list-container"
            >
              {loading ? (
                [1, 2, 3].map((i) => <LandCardSkeleton key={i} />)
              ) : lands.length ? (
                lands.map((land) => <LandWorkCard onClick={onClickAtlasHandler} key={land.id} land={land} />)
              ) : (
                <div>No properties are currently listed</div>
              )}
            </Row>
          </Col>
          <Col span={12}>
            <Row className="map-list-container">
              <div style={{ minHeight: 'calc(100vh - 80px - 90px)', width: '100%' }}>
                <Atlas x={atlasMapX} y={atlasMapY} />
              </div>
            </Row>
          </Col>
        </Row>

        <ClaimModal
          onSubmit={() => {
            setClaimButtonDisabled(true);
            setShowClaimModal(false);
          }}
          onCancel={() => setShowClaimModal(false)}
          visible={showClaimModal}
          rentFees={user?.unclaimedRentAssets}
        />
      </div>
    </>
  );
};

export default ExploreView;
