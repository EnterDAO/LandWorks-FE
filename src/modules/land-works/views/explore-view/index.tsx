import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DECENTRALAND_METAVERSE,
  DEFAULT_LAST_RENT_END,
  DEFAULT_TOKEN_ADDRESS,
  metaverseOptions,
  sortColumns,
  sortDirections,
} from 'constants/modules';
import { useSubscription } from '@apollo/client';
import { end } from '@popperjs/core';
import { Col, Row } from 'antd';

import { Atlas } from 'components/custom/Atlas/Atlas';
import { Box, ControlledSelect, StyledSwitch, Typography } from 'design-system';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import { LandsAction } from 'modules/land-works/components/lands-action';
import { ClaimModal } from 'modules/land-works/components/lands-claim-modal';
import LandsSubheader from 'modules/land-works/components/lands-explore-subheader';
import { SearchBar } from 'modules/land-works/components/lands-search';
import { useWallet } from 'wallets/wallet';

import {
  AssetEntity,
  PaymentToken,
  USER_SUBSCRIPTION,
  UserEntity,
  fetchAllListedAssetsByMetaverseAndGteLastRentEndWithOrder,
  fetchTokenPayments,
  parseUser,
} from '../../api';
import { currencyData, landsData, sortData } from './filterData';

import { getNowTs } from 'utils';

import './index.scss';

const ExploreView: React.FC = () => {
  const wallet = useWallet();

  const [lands, setLands] = useState([] as AssetEntity[]);
  const [assets, setAssets] = useState([] as AssetEntity[]);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [user, setUser] = useState({} as UserEntity);

  const [sortDir, setSortDir] = useState(sortDirections[0]);
  const [sortColumn, setSortColumn] = useState(sortColumns[0]);
  const [atlasMapX, setAtlasMapX] = useState(0);
  const [atlasMapY, setAtlasMapY] = useState(0);

  const history = useHistory();
  const { search } = window.location;
  const searchParams = new URLSearchParams(search);

  const query = searchParams.get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');

  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOnlyOwner, setShowOnlyOwner] = useState(false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const [paymentTokens, setPaymentTokens] = useState([] as PaymentToken[]);
  const [paymentToken, setPaymentToken] = useState(DEFAULT_TOKEN_ADDRESS);

  const [metaverse, setMetaverse] = useState(metaverseOptions[0]);

  const [lastRentEnd, setLastRentEnd] = useState(DEFAULT_LAST_RENT_END);

  const [selectedOrder, setSelectedOrder] = useState(1);
  const [selectedMetaverse, setSelectedMetaverse] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState(1);

  const getPaymentTokens = async () => {
    const tokens = await fetchTokenPayments();
    setPaymentTokens(tokens);
    if (tokens.length > 0) {
      setPaymentToken(paymentTokens[0]?.id);
    }
  };

  useEffect(() => {
    getPaymentTokens();
  }, [selectedOrder, selectedCurrency, lands, showOnlyOwner, showOnlyAvailable]);

  useEffect(() => {
    searchParams.set('s', searchQuery);
    history.push({ search: searchParams.toString() });
  }, [searchQuery]);

  useSubscription(USER_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }

      setLoading(subscriptionData.loading);
      if (subscriptionData.data.user === null) {
        setUser({} as UserEntity);
        setAssets([]);
        return;
      }

      const user = parseUser(subscriptionData.data.user);
      setClaimButtonDisabled(false);
      setUser(user);
      setAssets(user?.ownerAndConsumerAssets || []);
    },
  });

  useEffect(() => {
    if (wallet.account) {
      setLoading(true);
    } else {
      setUser({} as UserEntity);
      setAssets([]);
    }
  }, [wallet.account]);

  const getAssets = async (orderColumn: string, sortDir: string, lastRentEnd: string) => {
    const lands = await fetchAllListedAssetsByMetaverseAndGteLastRentEndWithOrder(
      DECENTRALAND_METAVERSE,
      lastRentEnd,
      orderColumn,
      sortDir,
      paymentToken
    );

    setLands(lands.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getAssets(sortColumn, sortDir, lastRentEnd);
  }, [wallet.account, sortColumn, sortDir, lastRentEnd, showOnlyOwner, selectedCurrency]);

  const filterLandsByQuery = (lands: AssetEntity[], query: string) => {
    if (!query) {
      return lands;
    }

    return lands.filter((land) => {
      const landName = land.name.toLowerCase();
      const landOwner = land.decentralandData?.asset?.consumer?.id.toLowerCase();
      return landName.includes(query) || landOwner?.includes(query);
    });
  };

  const filteredLands = filterLandsByQuery(lands, searchQuery);

  const onClickAtlasHandler = (land: AssetEntity) => {
    const { x, y } = land.decentralandData?.coordinates[0];
    setAtlasMapX(Number(x));
    setAtlasMapY(Number(y));
  };

  const onPlaceChange = (value: number) => {
    setMetaverse(metaverse);
    setSelectedMetaverse(value);
    // TODO:: add some filtering here
  };

  const onSortDirectionChange = (value: number) => {
    setSelectedOrder(value);
    const sortIndex = Number(value) - 1;
    setSortDir(sortDirections[sortIndex]);
    setSortColumn(sortColumns[sortIndex]);
  };

  const handleOwnerToggleChange = () => {
    setShowOnlyOwner(!showOnlyOwner);
    setShowOnlyAvailable(!showOnlyAvailable);
  };

  const handleAvailableChange = () => {
    setShowOnlyAvailable(!showOnlyAvailable);
    setLastRentEnd(showOnlyAvailable ? getNowTs().toString() : DEFAULT_LAST_RENT_END);
  };

  const onCurrencyChange = (value: number) => {
    const sortIndex = Number(value) - 1;
    setSelectedCurrency(value); // this sets the value for the label in the dropdown
    setPaymentToken(paymentTokens[sortIndex].id);
  };

  function landData() {
    let result;
    if (showOnlyOwner) {
      result = assets;
    } else {
      result = filteredLands;
    }
    return result;
  }

  const data = landData();
  //const data = showOnlyOwner ? assets : filteredLands;

  return (
    <>
      <LandsSubheader
        totalLands={lands.length}
        hasMetamaskConnected={wallet.isActive && wallet.connector?.id === 'metamask'}
      />

      <div className="filter-wrapper">
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box style={{ display: 'flex', alignItems: 'center', width: '400px' }}>
            <Box style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
              <ControlledSelect value={selectedMetaverse} onChange={onPlaceChange} options={landsData} />
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ControlledSelect value={selectedCurrency} onChange={onCurrencyChange} options={currencyData} />
            </Box>
          </Box>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
              <Typography>Mine Only</Typography>
              <Box style={{ marginLeft: '10px' }}>
                <StyledSwitch onChange={handleOwnerToggleChange} />
              </Box>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>
              <Typography>Available Only</Typography>
              <Box style={{ marginLeft: '10px' }}>
                <StyledSwitch onChange={handleAvailableChange} />
              </Box>
            </Box>
            <ControlledSelect value={selectedOrder} onChange={onSortDirectionChange} options={sortData} />
          </Box>
        </Box>
      </div>

      <div className="content-container content-container--explore-view">
        <Row className="lands-container">
          <Col span={12}>
            {user.hasUnclaimedRent && (
              <Row justify={end} className="actions-container">
                <Col className="lands-claim-container">
                  <LandsAction
                    onButtonClick={setShowClaimModal}
                    buttonText={'CLAIM '}
                    subHeading="You have"
                    isClaimButtonDisabled={claimButtonDisabled}
                    mainHeading="Unclaimed rent"
                  />
                </Col>
              </Row>
            )}
            <Row>
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
              ) : data.length ? (
                data.map((land) => <LandWorkCard onClick={onClickAtlasHandler} key={land.id} land={land} />)
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
