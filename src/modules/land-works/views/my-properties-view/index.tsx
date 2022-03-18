import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import LandsWorksGridEmptyState from 'modules/land-works/components/land-works-grid-empty-state';
import LoadMoreLands from 'modules/land-works/components/lands-explore-load-more';
import LandsMyPropertiesHeader from 'modules/land-works/components/lands-my-properties-header';
import LandsMyPropertiesSubheader from 'modules/land-works/components/lands-my-properties-subheader';
import LandsSearchQueryProvider from 'modules/land-works/providers/lands-search-query';
import { useWallet } from 'wallets/wallet';

import { filterLandsByCurrencyId, filterLandsByQuery } from 'modules/land-works/utils';
import { sessionStorageHandler } from 'utils';

const MyPropertiesView: FC = () => {
  const history = useHistory();
  const isGridPerFour = useMediaQuery('(max-width: 1599px)');
  const wallet = useWallet();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(MY_PROPERTIES_TAB_STATE_ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize] = useState(getPageSize());
  const [user, setUser] = useState({} as UserEntity);
  const [lands, setLands] = useState<AssetEntity[]>([]);
  const [rents, setRents] = useState<AssetEntity[]>([]);
  const [totalRents, setTotalRents] = useState(0);
  const [loadPercentageValue, setLoadPercentageValue] = useState(0);
  const [slicedLands, setSlicedLands] = useState(pageSize);
  const [currencyId, setCurrencyId] = useState(sessionStorageHandler('my-properties-filters', 'currency') || 0);

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

  const fetchRents = async () => {
    if (!wallet.account) return;

    const rents = await fetchUserAssetsByRents(wallet.account);

    setRents(rents.data || []);
    setTotalRents(rents.meta.count);
  };

  const updateUser = async () => {
    await fetchRents();
    if (userData && userData.user) {
      setUser(parseUser(userData.user));
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
      if (tab === MY_PROPERTIES_TAB_STATE_ALL) {
        setLands(concatOwnerAndConsumerAssetsAndRents());
      }
    }
  }, [user]);

  useEffect(() => {
    if (!wallet.account) {
      setLands([]);
      setRents([]);
      setTotalRents(0);
    }
  }, [wallet.account]);

  useEffect(() => {
    if (!wallet.account || lands.length) {
      setLoading(false);
    }
  }, [lands]);

  useEffect(() => {
    setLoadPercentageValue(getLoadPercentageValue());
  }, [lands, slicedLands]);

  let filteredLands = filterLandsByQuery(lands, searchQuery);

  if (currencyId > 0) {
    filteredLands = filterLandsByCurrencyId(lands, currencyId);
  }

  const slicedLandsInTotal = filteredLands.slice(0, slicedLands).length;

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
              filteredLands.slice(0, slicedLands).map((land) => (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={land.id}>
                  <LandWorkCard land={land} onClick={() => history.push(`/property/${land.id}`)} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <LandsWorksGridEmptyState />
              </Grid>
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
        </div>
      </TabContext>
    </LandsSearchQueryProvider>
  );
};

export default MyPropertiesView;
