import { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import TabContext from '@mui/lab/TabContext';
import { useMediaQuery } from '@mui/material';

import { Grid } from 'design-system';
import { LocationState } from 'modules/interface';
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
import { useWallet } from 'wallets/wallet';

import {
  filterLandsByQuery,
  isExistingLandInProgress,
  isNewLandTxInProgress,
  landsOrder,
} from 'modules/land-works/utils';
import { sessionStorageHandler } from 'utils';

import {
  MY_PROPERTIES_TAB_STATE_LENT,
  MY_PROPERTIES_TAB_STATE_RENTED,
  sortColumns,
  sortDirections,
} from 'modules/land-works/constants';

const MyPropertiesView: FC = () => {
  const sessionFilters = {
    order: sessionStorageHandler('get', 'my-properties-filters', 'order'),
    metaverse: sessionStorageHandler('get', 'general', 'metaverse'),
  };
  const [metaverse, setMetaverse] = useState(sessionFilters.metaverse || 1);
  const orderFilter =
    sessionFilters.order && sessionFilters.order[`${metaverse}`] ? sessionFilters.order[`${metaverse}`] - 1 : 0;
  const history = useHistory();
  const location = useLocation<LocationState>();
  const isGridPerFour = useMediaQuery('(max-width: 1599px)');
  const wallet = useWallet();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(getTabs());
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

  function getTabs() {
    const tab = location.state?.tab;
    const tabsList = [MY_PROPERTIES_TAB_STATE_RENTED, MY_PROPERTIES_TAB_STATE_LENT];
    return tab && tabsList.includes(tab) ? tab : tabsList[0];
  }

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
      setUser({} as UserEntity);
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
    if (tab === MY_PROPERTIES_TAB_STATE_RENTED) {
      return setLands(rents);
    } else if (tab === MY_PROPERTIES_TAB_STATE_LENT) {
      return setLands(user?.ownerAndConsumerAssets || []);
    }
  }, [tab, rents]);

  useEffect(() => {
    if (rents.length && lands.length) {
      sortLands(sortColumn, sortDir);
    }
    if (Object.keys(user).length) {
      if (tab === MY_PROPERTIES_TAB_STATE_RENTED) setLands(rents);
      if (tab === MY_PROPERTIES_TAB_STATE_LENT) setLands(user?.ownerAndConsumerAssets || []);
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
      history.push('/explore');
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

  const displayNewLandLoader = () => {
    return (
      isNewLandTxInProgress(lands, loading, 'LISTING_IN_PROGRESS') ||
      isNewLandTxInProgress(lands, loading, 'RENT_IN_PROGRESS')
    );
  };

  const displayExistLandLoader = () => {
    return (
      isExistingLandInProgress(lands, loading, 'WITHDRAW_IN_PROGRESS') ||
      isExistingLandInProgress(lands, loading, 'EXIST_RENT_IN_PROGRESS')
    );
  };

  const newPropertyTitle = () => {
    return localStorage.getItem('LISTING_IN_PROGRESS') ? 'Listing' : 'Renting';
  };
  const existPropertyTitle = () => {
    return localStorage.getItem('WITHDRAW_IN_PROGRESS') ? 'Withdraw' : 'Renting';
  };

  return (
    <LandsSearchQueryProvider value={{ searchQuery, setSearchQuery }}>
      <TabContext value={tab}>
        <div className="content-container">
          <LandsMyPropertiesHeader
            setTab={setTab}
            user={user}
            rentedCount={totalRents}
            lentCount={user?.ownerAndConsumerAssets?.length || 0}
          />
          <LandsMyPropertiesSubheader
            propertiesCount={filteredLands.length}
            onChangeSortDirection={onChangeFiltersSortDirection}
            onChangeMetaverse={onChangeMetaverse}
          />

          <Grid container spacing={4} rowSpacing={4} columnSpacing={4}>
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={i}>
                  <LandCardSkeleton key={i} />
                </Grid>
              ))
            ) : lands.length ? (
              <>
                {filteredLands.map((land) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={land.id}>
                    {displayExistLandLoader() === land.metaverseAssetId ? (
                      <LandWorksLoadingCard title={existPropertyTitle()} />
                    ) : (
                      <LandWorkCard
                        land={land}
                        onClick={() =>
                          history.push({
                            pathname: `/property/${land.id}`,
                            state: { from: window.location.pathname, title: 'My properties', tab },
                          })
                        }
                      />
                    )}
                  </Grid>
                ))}
                {displayNewLandLoader() && (
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <LandWorksLoadingCard title={newPropertyTitle()} />
                  </Grid>
                )}
              </>
            ) : (
              <>
                {displayNewLandLoader() ? (
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <LandWorksLoadingCard title={newPropertyTitle()} />
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <LandsWorksGridEmptyState />
                  </Grid>
                )}
              </>
            )}
          </Grid>

          {lands.length > pageSize && (
            <LoadMoreLands
              textToDisplay={`List ${slicedLandsInTotal} of ${lands.length}`}
              handleLoadMore={handleLoadMore}
              percentageValue={loadPercentageValue}
              disabled={slicedLandsInTotal === lands.length}
            />
          )}

          {tab === MY_PROPERTIES_TAB_STATE_LENT && <ClaimHistoryTable metaverse={metaverse} />}
          {tab === MY_PROPERTIES_TAB_STATE_RENTED && <MyPropetiesHistoryTable metaverse={metaverse} />}
        </div>
      </TabContext>
    </LandsSearchQueryProvider>
  );
};

export default MyPropertiesView;
