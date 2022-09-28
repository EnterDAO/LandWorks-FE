import { FC, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import TabContext from '@mui/lab/TabContext';
import { useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

import CardsGrid from 'components/custom/cards-grid';
import { AssetEntity, USER_SUBSCRIPTION, UserEntity, fetchUserAssetsByRents, parseUser } from 'modules/land-works/api';
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
  isExistingLandInProgress,
  isNewLandTxInProgress,
  landsOrder,
} from 'modules/land-works/utils';
import { sessionStorageHandler } from 'utils';

import { sortColumns, sortDirections } from 'modules/land-works/constants';

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
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize] = useState(getPageSize());
  const [user, setUser] = useState({} as UserEntity);
  const [lands, setLands] = useState<AssetEntity[]>([]);
  const [rents, setRents] = useState<AssetEntity[]>([]);
  const [totalRents, setTotalRents] = useState(0);
  const [loadPercentageValue, setLoadPercentageValue] = useState(0);
  const [slicedLands, setSlicedLands] = useState(pageSize);
  const [sortDir, setSortDir] = useState(sortDirections[orderFilter]);
  const [sortColumn, setSortColumn] = useState(sortColumns[orderFilter]);

  const { data: userData } = useSubscription(USER_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: {
      id: wallet.account?.toLowerCase(),
      metaverse: String(metaverse),
    },
  });

  function getPageSize() {
    return isGridPerFour ? 4 : 8;
  }

  const handleLoadMore = () => {
    setSlicedLands(slicedLands + getPageSize());
  };

  const getLoadPercentageValue = () => {
    return (filteredLands.slice(0, slicedLands).length * 100) / filteredLands.length;
  };

  const fetchRents = async () => {
    if (!wallet.account) return;

    setLoading(true);
    const rents = await fetchUserAssetsByRents(wallet.account, String(metaverse));
    setRents(rents.data || []);
    setTotalRents(rents.meta.count);
  };

  const updateUser = async () => {
    await fetchRents();
    if (userData && userData.user) {
      setUser(await parseUser(userData.user));
    } else {
      setUser({
        id: '',
        hasUnclaimedRent: false,
        assets: [],
        consumerTo: [],
        rents: [],
        unclaimedRentAssets: [],
        ownerAndConsumerAssets: [],
      } as UserEntity);
    }
  };
  const onChangeFiltersSortDirection = (value: number) => {
    const sortIndex = Number(value) - 1;

    setSortDir(sortDirections[sortIndex]);
    setSortColumn(sortColumns[sortIndex]);
    sortLands(sortColumns[sortIndex], sortDirections[sortIndex]);
  };

  const sortLands = (orderCol: string, orderDir: 'asc' | 'desc') => {
    setLands(landsOrder(lands, orderCol, orderDir));
    setRents(landsOrder(rents, orderCol, orderDir));
    setLoading(false);
  };

  const onChangeMetaverse = (value: number) => {
    setMetaverse(value);
  };

  const removeLands = () => {
    setLands([]);
    setRents([]);
    setTotalRents(0);
  };

  useEffect(() => {
    updateUser();
  }, [userData]);

  useEffect(() => {
    fetchRents();
  }, [metaverse]);

  useEffect(() => {
    if (tab === MY_PROPERTIES_ROUTE_TABS.rented) {
      setLands(rents);
    } else if (tab === MY_PROPERTIES_ROUTE_TABS.listed) {
      setLands(user?.ownerAndConsumerAssets || []);
    }
  }, [tab, rents]);

  useEffect(() => {
    sortLands(sortColumn, sortDir);
    if (Object.keys(user).length) {
      if (tab === MY_PROPERTIES_ROUTE_TABS.rented) setLands(rents);
      if (tab === MY_PROPERTIES_ROUTE_TABS.listed) setLands(user?.ownerAndConsumerAssets || []);
    } else {
      removeLands();
    }
  }, [user]);

  useEffect(() => {
    if (!wallet.account) {
      removeLands();
    }
  }, [wallet.account]);

  useEffect(() => {
    if (wallet.disconnecting) {
      history.push(APP_ROUTES.explore);
    }
  }, [wallet.disconnecting]);

  useEffect(() => {
    if (!wallet.account || lands.length) {
      setLoading(false);
    }
  }, [lands, rents]);

  useEffect(() => {
    setTimeout(() => {
      if (!wallet.account) {
        wallet.showWalletsModal();
      }
    }, 500);
  }, []);

  useEffect(() => {
    setLoadPercentageValue(getLoadPercentageValue());
  }, [lands, slicedLands, searchQuery]);

  const slicedLandsInTotal = lands.slice(0, slicedLands).length;
  const filteredLands = filterLandsByQuery(lands.slice(0, slicedLands), searchQuery);

  const { displayNewLandLoader, displayExistLandLoader } = useMemo(() => {
    return {
      displayNewLandLoader:
        isNewLandTxInProgress(lands, loading, 'LISTING_IN_PROGRESS') ||
        isNewLandTxInProgress(lands, loading, 'RENT_IN_PROGRESS'),
      displayExistLandLoader:
        isExistingLandInProgress(lands, loading, 'WITHDRAW_IN_PROGRESS') ||
        isExistingLandInProgress(lands, loading, 'EXIST_RENT_IN_PROGRESS'),
    };
  }, [lands, loading]);

  const newPropertyTitle = () => {
    return localStorage.getItem('LISTING_IN_PROGRESS') ? 'Listing' : 'Renting';
  };
  const existPropertyTitle = () => {
    return localStorage.getItem('WITHDRAW_IN_PROGRESS') ? 'Withdraw' : 'Renting';
  };

  return (
    <LandsSearchQueryProvider value={{ searchQuery, setSearchQuery }}>
      <TabContext value={tab}>
        <Box px="var(--horizontal-padding)" pb="var(--content-container-v-padding)">
          <LandsMyPropertiesHeader
            user={user}
            rentedCount={totalRents}
            lentCount={user?.ownerAndConsumerAssets?.length || 0}
          />
          <LandsMyPropertiesSubheader
            propertiesCount={filteredLands.length}
            onChangeSortDirection={onChangeFiltersSortDirection}
            onChangeMetaverse={onChangeMetaverse}
          />
          <Box display="flex" justifyContent="center">
            {(loading || !!filteredLands.length) && (
              <CardsGrid>
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => {
                      return <LandCardSkeleton key={i} />;
                    })
                  : filteredLands.map((land) => {
                      return displayExistLandLoader === land.metaverseAssetId ? (
                        <LandWorksLoadingCard title={existPropertyTitle()} />
                      ) : (
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
                    })}
              </CardsGrid>
            )}

            {!loading &&
              (displayNewLandLoader ? (
                <LandWorksLoadingCard title={newPropertyTitle()} />
              ) : (
                !lands.length && <LandsWorksGridEmptyState />
              ))}
          </Box>

          {lands.length > pageSize && (
            <LoadMoreLands
              textToDisplay={`List ${slicedLandsInTotal} of ${lands.length}`}
              handleLoadMore={handleLoadMore}
              percentageValue={loadPercentageValue}
              disabled={slicedLandsInTotal === lands.length}
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
