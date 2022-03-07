import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  DECENTRALAND_METAVERSE,
  DEFAULT_LAST_RENT_END,
  DEFAULT_SLICED_PAGE,
  DEFAULT_TOKEN_ADDRESS,
  sortColumns,
  sortDirections,
} from 'constants/modules';
import { useSubscription } from '@apollo/client';
import { Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Modal } from 'design-system';
import LayoutFooter from 'layout/components/layout-footer';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import LandsExploreFilters from 'modules/land-works/components/lands-explore-filters';
import { LoadMoreLands } from 'modules/land-works/components/lands-explore-load-more';
import LandsExploreMap from 'modules/land-works/components/lands-explore-map';
import LandsExploreSubheader from 'modules/land-works/components/lands-explore-subheader';
import LandsSearchBar from 'modules/land-works/components/lands-search';
import LandsMapActiveTileProvider from 'modules/land-works/providers/lands-map-active-tile';
import { useWallet } from 'wallets/wallet';

import {
  AssetEntity,
  CoordinatesLand,
  PaymentToken,
  USER_SUBSCRIPTION,
  UserEntity,
  fetchAllListedAssetsByMetaverseAndGetLastRentEndWithOrder,
  fetchTokenPayments,
  parseUser,
} from '../../api';
import ListNewProperty from '../list-new-property';

import { getAllLandsCoordinates } from 'modules/land-works/utils';
import { getNowTs } from 'utils';

import './explore-view.scss';

const ExploreView: React.FC = () => {
  const wallet = useWallet();
  const isPerTwo = useMediaQuery('(max-width:1299px)');

  const [lands, setLands] = useState([] as AssetEntity[]);
  const [clickedLandId, setClickedLandId] = useState<AssetEntity['id']>('');
  const [user, setUser] = useState({} as UserEntity);

  const [sortDir, setSortDir] = useState(sortDirections[0]);
  const [sortColumn, setSortColumn] = useState(sortColumns[0]);

  const [coordinatesHighlights, setCoordinatesHighlights] = useState<CoordinatesLand[]>([]);
  const [mapExpanded, setMapExpanded] = useState(false);

  const [atlasMapX, setAtlasMapX] = useState(0);
  const [atlasMapY, setAtlasMapY] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(false);
  const [blockAutoScroll, setBlockAutoScroll] = useState(false);

  const [lastRentEnd, setLastRentEnd] = useState(DEFAULT_LAST_RENT_END);

  const [slicedLands, setSlicedLands] = useState(isPerTwo ? DEFAULT_SLICED_PAGE : 6);
  const [loadPercentageValue, setLoadPercentageValue] = useState(0);

  const [paymentTokens, setPaymentTokens] = useState([] as PaymentToken[]);
  const [paymentToken, setPaymentToken] = useState(DEFAULT_TOKEN_ADDRESS);

  const [showListNewModal, setShowListNewModal] = useState(true);
  const slicedLandsInTotal = lands.slice(0, slicedLands).length;

  useEffect(() => {
    getPaymentTokens();
  }, [paymentToken, lastRentEnd, lands]);

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
        return;
      }

      setUser(parseUser(subscriptionData.data.user));
    },
  });

  const setPointMapCentre = (lands: CoordinatesLand[]) => {
    if (lands[0]) {
      const { x, y } = lands[0];

      setAtlasMapX(Number(x));
      setAtlasMapY(Number(y));
    }
  };

  const onChangeFiltersSortDirection = (value: number) => {
    const sortIndex = Number(value) - 1;
    setSortDir(sortDirections[sortIndex]);
    setSortColumn(sortColumns[sortIndex]);
  };

  const onChangeFiltersOwnerToggler = (value: boolean) => {
    if (value) {
      setLands(user?.ownerAndConsumerAssets || []);
    } else {
      getLands(sortColumn, sortDir, lastRentEnd, paymentToken);
    }
  };

  const onChangeFiltersAvailable = (value: boolean) => {
    setLastRentEnd(value ? getNowTs().toString() : DEFAULT_LAST_RENT_END);
  };

  const onChangeFiltersCurrency = (value: number) => {
    const sortIndex = Number(value) - 1;
    // setSelectedCurrency(value); // this sets the value for the label in the dropdown
    setPaymentToken(paymentTokens[sortIndex].id);
  };

  const getPaymentTokens = async () => {
    const tokens = await fetchTokenPayments();
    setPaymentTokens(tokens);
  };

  const getLands = async (orderColumn: string, sortDir: string, lastRentEnd: string, paymentToken: string) => {
    setLoading(true);

    const lands = await fetchAllListedAssetsByMetaverseAndGetLastRentEndWithOrder(
      DECENTRALAND_METAVERSE,
      lastRentEnd,
      orderColumn,
      sortDir,
      paymentToken
    );

    setLands(lands.data);
    setLoading(false);
    setSlicedLands(isPerTwo ? DEFAULT_SLICED_PAGE : 6);
    const highlights = getAllLandsCoordinates(lands.data.slice(0, slicedLands));
    setCoordinatesHighlights(highlights);
    setPointMapCentre(highlights);
  };

  const filterLandsByQuery = (lands: AssetEntity[], query: string) => {
    if (!query) {
      return lands;
    }

    return lands.filter((land) => {
      const landName = land.name.toLowerCase();
      return landName.includes(query);
    });
  };

  const handleLoadMore = () => {
    const newSlicedLands = slicedLands + (isPerTwo ? DEFAULT_SLICED_PAGE : 6);
    setSlicedLands(newSlicedLands);
    const highlights = getAllLandsCoordinates(lands.slice(0, newSlicedLands));
    setCoordinatesHighlights(highlights);
    setPointMapCentre(highlights);
  };

  const onMouseOverCardHandler = (e: SyntheticEvent, land: AssetEntity) => {
    const allCoords = getAllLandsCoordinates([land]);

    if (allCoords.length && allCoords[0]) {
      setPointMapCentre([{ id: land.id, x: allCoords[0].x, y: allCoords[0].y }]);
      setClickedLandId && setClickedLandId(`${allCoords[0].x},${allCoords[0].y}`);
    }
  };

  useEffect(() => {
    if (!searchQuery.length) {
      getLands(sortColumn, sortDir, lastRentEnd, paymentToken);
    } else {
      setLands(filterLandsByQuery(lands, searchQuery));
    }
  }, [searchQuery]);

  useEffect(() => {
    if (wallet.account) {
      setLoading(true);
    } else {
      setUser({} as UserEntity);
      setLands([]);
    }
  }, [wallet.account]);

  useEffect(() => {
    getLands(sortColumn, sortDir, lastRentEnd, paymentToken);
  }, [wallet.account, sortColumn, sortDir, lastRentEnd, paymentToken]);

  useEffect(() => {
    setLoadPercentageValue((lands.slice(0, slicedLands).length * 100) / lands.length);
  }, [lands, slicedLands]);

  useEffect(() => {
    if (!window) return;

    const landExploreCard = window.document.getElementById(`land-explore-card--${clickedLandId}`);

    if (landExploreCard && !blockAutoScroll) {
      landExploreCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [clickedLandId]);

  return (
    <LandsMapActiveTileProvider value={{ clickedLandId, setClickedLandId }}>
      <div className="content-container--explore-view--header">
        <LandsExploreSubheader
          totalLands={lands.length}
          hasMetamaskConnected={wallet.isActive && wallet.connector?.id === 'metamask'}
          handleListNew={() => setShowListNewModal(true)}
        />
        <LandsExploreFilters
          onChangeSortDirection={onChangeFiltersSortDirection}
          onChangeOwnerToggler={onChangeFiltersOwnerToggler}
          onChangeAvailable={onChangeFiltersAvailable}
          onChangeCurrency={onChangeFiltersCurrency}
        />
      </div>

      <div className="content-container content-container--explore-view">
        <div
          className="lands-container"
          onMouseMove={() => setBlockAutoScroll(true)}
          onMouseOut={() => setTimeout(() => setBlockAutoScroll(false), 150)}
        >
          <LandsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Grid container spacing={4} rowSpacing={4} columnSpacing={4}>
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4} key={i}>
                  <LandCardSkeleton key={i} />
                </Grid>
              ))
            ) : lands.length ? (
              lands.slice(0, slicedLands).map((land) => (
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4} key={land.id}>
                  <LandWorkCard onMouseOver={onMouseOverCardHandler} land={land} />
                </Grid>
              ))
            ) : (
              <div>No properties are currently listed</div>
            )}
          </Grid>
          <LoadMoreLands
            textToDisplay={`List ${slicedLandsInTotal} of ${lands.length}`}
            handleLoadMore={handleLoadMore}
            percentageValue={loadPercentageValue}
            disabled={slicedLandsInTotal === lands.length}
          />
          <LayoutFooter isWrapped={false} />
        </div>

        <div className={`map-list-container ${mapExpanded ? 'map-list-container--expanded' : ''}`}>
          <LandsExploreMap
            positionX={atlasMapX}
            positionY={atlasMapY}
            expanded={mapExpanded}
            onClick={() => setMapExpanded(!mapExpanded)}
            highlights={coordinatesHighlights}
          />
        </div>
      </div>
      <Modal height={800} open={showListNewModal} handleClose={() => setShowListNewModal(false)}>
        <ListNewProperty />
      </Modal>
    </LandsMapActiveTileProvider>
  );
};

export default ExploreView;
