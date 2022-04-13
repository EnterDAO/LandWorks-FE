import { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  MY_PROPERTIES_TAB_STATE_ALL,
  MY_PROPERTIES_TAB_STATE_LENT,
  MY_PROPERTIES_TAB_STATE_RENTED,
} from 'constants/modules';
import { useSubscription } from '@apollo/client';
import TabContext from '@mui/lab/TabContext';
import { useMediaQuery } from '@mui/material';

import { Grid } from 'design-system';
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

import { LocationState } from '../single-land-view';

import {
  filterLandsByCurrencyId,
  filterLandsByQuery,
  isExistingLandInProgress,
  isNewLandTxInProgress,
} from 'modules/land-works/utils';
import { sessionStorageHandler } from 'utils';

const MyPropertiesView: FC = () => {
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
  const [currencyId, setCurrencyId] = useState(sessionStorageHandler('get', 'my-properties-filters', 'currency') || 0);

  const { data: userData } = useSubscription(USER_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
  });

  function getPageSize() {
    return isGridPerFour ? 4 : 8;
  }

  const handleLoadMore = () => {
    setSlicedLands(slicedLands + getPageSize());
  };

  const getLoadPercentageValue = () => {
    return (lands.slice(0, slicedLands).length * 100) / lands.length;
  };

  function getTabs() {
    const tab = location.state?.tab;
    const tabsList = [MY_PROPERTIES_TAB_STATE_ALL, MY_PROPERTIES_TAB_STATE_RENTED, MY_PROPERTIES_TAB_STATE_LENT];
    return tab && tabsList.includes(tab) ? tab : tabsList[0];
  }

  const fetchRents = async () => {
    if (!wallet.account) return;

    const rents = await fetchUserAssetsByRents(wallet.account);

    setRents(rents.data || []);
    setTotalRents(rents.meta.count);
  };

  const updateUser = async () => {
    await fetchRents();
    setLoading(false);

    if (userData && userData.user) {
      setUser(await parseUser(userData.user));
    } else {
      setUser({} as UserEntity);
    }
  };

  const concatOwnerAndConsumerAssetsAndRents = () => {
    return [...rents, ...(user?.ownerAndConsumerAssets || [])];
  };

  const onChangeCurrencyHandler = (value: number) => {
    setCurrencyId(value);
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
    if (tab === MY_PROPERTIES_TAB_STATE_RENTED) {
      return setLands(rents);
    } else if (tab === MY_PROPERTIES_TAB_STATE_LENT) {
      return setLands(user?.ownerAndConsumerAssets || []);
    }

    setLands(concatOwnerAndConsumerAssetsAndRents());
  }, [tab]);

  useEffect(() => {
    if (Object.keys(user).length) {
      // We setLands only if the tab is still MY_PROPERTIES_TAB_STATE_ALL
      if (tab === MY_PROPERTIES_TAB_STATE_ALL) setLands(concatOwnerAndConsumerAssetsAndRents());
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
  }, [lands]);

  useEffect(() => {
    setTimeout(() => {
      if (!wallet.account) {
        wallet.showWalletsModal();
      }
    }, 500);
  }, []);

  useEffect(() => {
    setLoadPercentageValue(getLoadPercentageValue());
  }, [lands, slicedLands]);

  let filteredLands = filterLandsByQuery(lands, searchQuery);

  if (currencyId > 0) {
    filteredLands = filterLandsByCurrencyId(filteredLands, currencyId);
  }

  const slicedLandsInTotal = filteredLands.slice(0, slicedLands).length;

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
            allCount={concatOwnerAndConsumerAssetsAndRents().length}
            rentedCount={totalRents}
            lentCount={user?.ownerAndConsumerAssets?.length || 0}
          />
          <LandsMyPropertiesSubheader
            propertiesCount={lands.length}
            onChangeCurrencyCallback={onChangeCurrencyHandler}
          />

          <Grid container spacing={4} rowSpacing={4} columnSpacing={4}>
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={i}>
                  <LandCardSkeleton key={i} />
                </Grid>
              ))
            ) : filteredLands.length ? (
              <>
                {filteredLands.slice(0, slicedLands).map((land) => (
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
              textToDisplay={`List ${slicedLandsInTotal} of ${filteredLands.length}`}
              handleLoadMore={handleLoadMore}
              percentageValue={loadPercentageValue}
              disabled={slicedLandsInTotal === filteredLands.length}
            />
          )}

          {tab === MY_PROPERTIES_TAB_STATE_LENT && <ClaimHistoryTable />}
          {tab === MY_PROPERTIES_TAB_STATE_RENTED && <MyPropetiesHistoryTable />}
        </div>
      </TabContext>
    </LandsSearchQueryProvider>
  );
};

export default MyPropertiesView;
