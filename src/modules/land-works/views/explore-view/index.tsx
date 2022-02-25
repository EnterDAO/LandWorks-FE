import React, { useEffect, useState } from 'react';
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

import LayoutFooter from 'layout/components/layout-footer';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import { LandsAction } from 'modules/land-works/components/lands-action';
import { ClaimModal } from 'modules/land-works/components/lands-claim-modal';
import LandsExploreFilters from 'modules/land-works/components/lands-explore-filters';
import { LoadMoreLands } from 'modules/land-works/components/lands-explore-load-more';
import LandsExploreMap from 'modules/land-works/components/lands-explore-map';
import LandsExploreSubheader from 'modules/land-works/components/lands-explore-subheader';
import LandsSearchBar from 'modules/land-works/components/lands-search';
import { useWallet } from 'wallets/wallet';

import {
  AssetEntity,
  CoordinatesLAND,
  PaymentToken,
  USER_SUBSCRIPTION,
  UserEntity,
  fetchAllListedAssetsByMetaverseAndGetLastRentEndWithOrder,
  fetchTokenPayments,
  parseUser,
} from '../../api';

import { getAllLandsCoordinates } from 'modules/land-works/utils';
import { getNowTs } from 'utils';

import './explore-view.scss';

const ExploreView: React.FC = () => {
  const wallet = useWallet();

  const [lands, setLands] = useState([] as AssetEntity[]);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [user, setUser] = useState({} as UserEntity);

  const [sortDir, setSortDir] = useState(sortDirections[0]);
  const [sortColumn, setSortColumn] = useState(sortColumns[0]);

  const [coordinatesHighlights, setCoordinatesHighlights] = useState<CoordinatesLAND[]>([]);
  const [mapExpanded, setMapExpanded] = useState(false);

  const [atlasMapX, setAtlasMapX] = useState(0);
  const [atlasMapY, setAtlasMapY] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');

  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [lastRentEnd, setLastRentEnd] = useState(DEFAULT_LAST_RENT_END);

  const [slicedLands, setSlicedLands] = useState(DEFAULT_SLICED_PAGE);
  const [loadPercentageValue, setLoadPercentageValue] = useState(0);

  const [paymentTokens, setPaymentTokens] = useState([] as PaymentToken[]);
  const [paymentToken, setPaymentToken] = useState(DEFAULT_TOKEN_ADDRESS);

  const getPaymentTokens = async () => {
    const tokens = await fetchTokenPayments();
    setPaymentTokens(tokens);
  };

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

      setClaimButtonDisabled(false);
      setUser(parseUser(subscriptionData.data.user));
    },
  });

  const setPointMapCentre = (lands: CoordinatesLAND[]) => {
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
    const highlights = getAllLandsCoordinates(lands.data);
    setCoordinatesHighlights(highlights);
    setPointMapCentre(highlights);
    setLoading(false);
    setSlicedLands(DEFAULT_SLICED_PAGE);
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

  const slicedLandsInTotal = lands.slice(0, slicedLands).length;

  const handleLoadMore = () => {
    setSlicedLands(slicedLands + DEFAULT_SLICED_PAGE);
    setLoadPercentageValue((slicedLandsInTotal * 100) / lands.length);
  };

  useEffect(() => {
    setLoadPercentageValue((lands.slice(0, slicedLands).length * 100) / lands.length);
  }, [lands, slicedLands]);

  return (
    <>
      <div className="content-container--explore-view--header">
        <LandsExploreSubheader
          totalLands={lands.length}
          hasMetamaskConnected={wallet.isActive && wallet.connector?.id === 'metamask'}
        />
        <LandsExploreFilters
          onChangeSortDirection={onChangeFiltersSortDirection}
          onChangeOwnerToggler={onChangeFiltersOwnerToggler}
          onChangeAvailable={onChangeFiltersAvailable}
          onChangeCurrency={onChangeFiltersCurrency}
        />
      </div>

      {user.hasUnclaimedRent && (
        <div className="actions-container">
          <div className="lands-claim-container">
            <LandsAction
              onButtonClick={setShowClaimModal}
              buttonText={'CLAIM '}
              subHeading="You have"
              isClaimButtonDisabled={claimButtonDisabled}
              mainHeading="Unclaimed rent"
            />
          </div>
        </div>
      )}

      <div className="content-container content-container--explore-view">
        <div className="lands-container">
          <LandsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Grid container spacing={4} rowSpacing={4} columnSpacing={4}>
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                  <LandCardSkeleton key={i} />
                </Grid>
              ))
            ) : lands.length ? (
              lands.slice(0, slicedLands).map((land) => (
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                  <LandWorkCard
                    onClick={() => {
                      console.log('something happens');
                    }}
                    key={land.id}
                    land={land}
                  />
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

      <ClaimModal
        onSubmit={() => {
          setClaimButtonDisabled(true);
          setShowClaimModal(false);
        }}
        onCancel={() => setShowClaimModal(false)}
        visible={showClaimModal}
        rentFees={user?.unclaimedRentAssets}
      />
    </>
  );
};

export default ExploreView;
