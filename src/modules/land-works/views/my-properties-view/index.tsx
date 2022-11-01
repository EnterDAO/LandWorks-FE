import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import TabContext from '@mui/lab/TabContext';
import { Stack, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

import CardsGrid from 'components/custom/cards-grid';
import { AssetEntity, USER_SUBSCRIPTION, UserEntity, parseUser } from 'modules/land-works/api';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import ClaimHistoryTable from 'modules/land-works/components/land-claim-history';
import MyPropetiesHistoryTable from 'modules/land-works/components/land-my-properties-history';
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import LandWorksLoadingCard from 'modules/land-works/components/land-works-card-loading';
import LandsWorksGridEmptyState from 'modules/land-works/components/land-works-grid-empty-state';
import LoadMoreLands from 'modules/land-works/components/lands-explore-load-more';
import LandsMyPropertiesHeader from 'modules/land-works/components/lands-my-properties-header';
import LandsMyPropertiesSubheader from 'modules/land-works/components/lands-my-properties-subheader';
import LandsSearchQueryProvider from 'modules/land-works/providers/lands-search-query';
import { APP_ROUTES, MY_PROPERTIES_ROUTE_TABS, getPropertyPath, useMyPropertiesRouteTab } from 'router/routes';
import { useWallet } from 'wallets/wallet';

import {
  filterLandsByQuery,
  getExistingLandIdInProgress,
  isNewLandTxInProgress,
  landsOrder,
} from 'modules/land-works/utils';
import { sessionStorageHandler } from 'utils';

import { sortColumns, sortDirections } from 'modules/land-works/constants';

const initialUser: UserEntity = {
  id: '',
  hasUnclaimedRent: false,
  assets: [],
  consumerTo: [],
  rents: [],
  unclaimedRentAssets: [],
  ownerAndConsumerAssets: [],
};

const MyPropertiesView: FC = () => {
  const tab = useMyPropertiesRouteTab();
  const sessionFilters = {
    order: sessionStorageHandler('get', 'my-properties-filters', 'order'),
    metaverse: sessionStorageHandler('get', 'general', 'metaverse'),
  };
  const [metaverse, setMetaverse] = useState(sessionFilters.metaverse || 1);
  const orderFilter =
    sessionFilters.order && sessionFilters.order[`${metaverse}`] ? sessionFilters.order[`${metaverse}`] - 1 : 0;
  const history = useHistory();
  const isGridPerFour = useMediaQuery('(max-width: 1599px)');
  const wallet = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize] = useState(getPageSize());
  const [user, setUser] = useState<UserEntity | null>(null);
  const [slicedLands, setSlicedLands] = useState(pageSize);
  const [sortDir, setSortDir] = useState(sortDirections[orderFilter]);
  const [sortColumn, setSortColumn] = useState(sortColumns[orderFilter]);

  const { data: rawUserData, loading } = useSubscription<{ user: UserEntity }>(USER_SUBSCRIPTION, {
    skip: !wallet.account,
    variables: {
      id: wallet.account?.toLowerCase(),
      metaverse: String(metaverse),
    },
  });

  const isParseUserLoadingRef = useRef(loading);
  const isLoading = !!wallet.account && (loading || isParseUserLoadingRef.current);

  useEffect(() => {
    if (loading) {
      isParseUserLoadingRef.current = true;
    }
  }, [loading]);

  function getPageSize() {
    return isGridPerFour ? 4 : 8;
  }

  const tabLands: AssetEntity[] = useMemo(() => {
    const { rents = [], ownerAndConsumerAssets = [] } = user || {};

    return {
      [MY_PROPERTIES_ROUTE_TABS.rented]: rents,
      [MY_PROPERTIES_ROUTE_TABS.listed]: ownerAndConsumerAssets,
    }[tab];
  }, [tab, user]);

  console.log({
    tabLands,
    user,
    tab,
  });

  const sortedLands = landsOrder(tabLands, sortColumn, sortDir);

  const handleLoadMore = () => {
    setSlicedLands(slicedLands + getPageSize());
  };

  useEffect(() => {
    if (!rawUserData) {
      return;
    }

    let isCancelled = false;

    const { user } = rawUserData;

    if (user) {
      parseUser(user)
        .then((parsedUserData) => {
          if (!isCancelled) {
            setUser(parsedUserData);

            isParseUserLoadingRef.current = false;
          }
        })
        .catch((e) => {
          console.error(e);
          if (!isCancelled) {
            setUser(initialUser);

            isParseUserLoadingRef.current = false;
          }
        });
    } else {
      setUser(initialUser);
      isParseUserLoadingRef.current = false;
    }

    return () => {
      isCancelled = true;
    };
  }, [rawUserData]);

  const onChangeFiltersSortDirection = (value: number) => {
    const sortIndex = Number(value) - 1;

    setSortDir(sortDirections[sortIndex]);
    setSortColumn(sortColumns[sortIndex]);
  };

  const onChangeMetaverse = (value: number) => {
    setMetaverse(value);
  };

  useEffect(() => {
    if (!wallet.account) {
      setUser(initialUser);
    }
  }, [wallet.account]);

  useEffect(() => {
    if (wallet.disconnecting) {
      history.push(APP_ROUTES.explore);
    }
  }, [wallet.disconnecting]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!wallet.account) {
        wallet.showWalletsModal();
      }
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const slicedLandsInTotal = sortedLands.slice(0, slicedLands).length;
  const filteredLands = filterLandsByQuery(sortedLands.slice(0, slicedLands), searchQuery);
  const loadPercentageValue = (filteredLands.slice(0, slicedLands).length * 100) / filteredLands.length;

  const { isRentingInProgress, isListingInProgress, landIdInWithdraw, existLandIdRentInProgress } = useMemo(() => {
    const isListingInProgress =
      tab === MY_PROPERTIES_ROUTE_TABS.listed && isNewLandTxInProgress(tabLands, 'LISTING_IN_PROGRESS');
    const isRentingInProgress =
      tab === MY_PROPERTIES_ROUTE_TABS.rented && isNewLandTxInProgress(tabLands, 'RENT_IN_PROGRESS');
    const landIdInWithdraw =
      tab === MY_PROPERTIES_ROUTE_TABS.listed
        ? getExistingLandIdInProgress(tabLands, 'WITHDRAW_IN_PROGRESS')
        : undefined;
    const existLandIdRentInProgress =
      tab === MY_PROPERTIES_ROUTE_TABS.rented
        ? getExistingLandIdInProgress(tabLands, 'EXIST_RENT_IN_PROGRESS')
        : undefined;

    return {
      isListingInProgress,
      isRentingInProgress,
      landIdInWithdraw,
      existLandIdRentInProgress,
    };
  }, [tabLands, tab, isLoading]);

  return (
    <LandsSearchQueryProvider value={{ searchQuery, setSearchQuery }}>
      <TabContext value={tab}>
        <Box px="var(--horizontal-padding)" pb="var(--content-container-v-padding)">
          <LandsMyPropertiesHeader
            user={user}
            rentedCount={user?.rents?.length || 0}
            lentCount={user?.ownerAndConsumerAssets?.length || 0}
          />
          <LandsMyPropertiesSubheader
            propertiesCount={filteredLands.length}
            onChangeSortDirection={onChangeFiltersSortDirection}
            onChangeMetaverse={onChangeMetaverse}
          />
          <Stack>
            {(isLoading || !!filteredLands.length) && (
              <CardsGrid>
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => {
                      return <LandCardSkeleton key={i} />;
                    })
                  : filteredLands.map((land) => {
                      if (landIdInWithdraw === land.metaverseAssetId) {
                        return <LandWorksLoadingCard key={land.metaverseAssetId} title="Withdraw" />;
                      } else if (existLandIdRentInProgress && land.metaverseAssetId) {
                        return <LandWorksLoadingCard key={land.metaverseAssetId} title="Renting" />;
                      } else {
                        return (
                          <LandWorkCard
                            key={land.id}
                            land={land}
                            onClick={() =>
                              history.push({
                                pathname: getPropertyPath(land.id),
                                state: { from: window.location.pathname, title: 'My properties', tab },
                              })
                            }
                          />
                        );
                      }
                    })}

                {isRentingInProgress && <LandWorksLoadingCard title="Renting" />}
                {isListingInProgress && <LandWorksLoadingCard title="Listing" />}
              </CardsGrid>
            )}

            {!isLoading && !tabLands.length && <LandsWorksGridEmptyState />}
          </Stack>

          {tabLands.length > pageSize && (
            <LoadMoreLands
              textToDisplay={`List ${slicedLandsInTotal} of ${tabLands.length}`}
              handleLoadMore={handleLoadMore}
              percentageValue={loadPercentageValue}
              disabled={slicedLandsInTotal === tabLands.length}
            />
          )}

          {tab === MY_PROPERTIES_ROUTE_TABS.listed && <ClaimHistoryTable metaverse={metaverse} />}
          {tab === MY_PROPERTIES_ROUTE_TABS.rented && <MyPropetiesHistoryTable metaverse={metaverse} />}
        </Box>
      </TabContext>
    </LandsSearchQueryProvider>
  );
};

export default MyPropertiesView;
