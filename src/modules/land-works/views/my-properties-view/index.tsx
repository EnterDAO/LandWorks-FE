import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MY_PROPERTIES_TAB_STATE_ALL,
  MY_PROPERTIES_TAB_STATE_LENT,
  MY_PROPERTIES_TAB_STATE_RENTED,
  pageSizeOptions,
} from 'constants/modules';
import { useSubscription } from '@apollo/client';
import TabContext from '@mui/lab/TabContext';

import PaginationStyled from 'components/styled/pagination';
import { Grid } from 'design-system';
import { AssetEntity, USER_SUBSCRIPTION, UserEntity, fetchUserAssetsByRents, parseUser } from 'modules/land-works/api';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import LandsWorksGridEmptyState from 'modules/land-works/components/land-works-grid-empty-state';
import LandsMyPropertiesHeader from 'modules/land-works/components/lands-my-properties-header';
import LandsMyPropertiesSubheader from 'modules/land-works/components/lands-my-properties-subheader';
import LandsSearchQueryProvider from 'modules/land-works/providers/lands-search-query';
import { useWallet } from 'wallets/wallet';

import { filterLandsByQuery } from 'modules/land-works/utils';

const MyPropertiesView: FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(MY_PROPERTIES_TAB_STATE_ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(Number(pageSizeOptions[0]));
  const [user, setUser] = useState({} as UserEntity);
  const [lands, setLands] = useState<AssetEntity[]>([]);
  const [rents, setRents] = useState<AssetEntity[]>([]);
  const [totalRents, setTotalRents] = useState(0);

  const { data: userData } = useSubscription(USER_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
  });

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

  const onPaginationChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const concatOwnerAndConsumerAssetsAndRents = () => {
    return [...rents, ...(user?.ownerAndConsumerAssets || [])];
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

  const filteredLands = filterLandsByQuery(lands, searchQuery);

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
          <LandsMyPropertiesSubheader propertiesCount={lands.length} />

          <Grid container spacing={4} rowSpacing={4} columnSpacing={4}>
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={i}>
                  <LandCardSkeleton key={i} />
                </Grid>
              ))
            ) : filteredLands.length ? (
              filteredLands.map((land) => (
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
            <PaginationStyled
              onChange={onPaginationChange}
              page={page}
              count={Math.ceil((tab === 'rent' ? totalRents : lands.length) / pageSize)}
              variant="outlined"
              color="secondary"
            />
          )}
        </div>
      </TabContext>
    </LandsSearchQueryProvider>
  );
};

export default MyPropertiesView;
