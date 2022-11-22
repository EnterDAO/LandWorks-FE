import { FC, ReactNode, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import CardsGrid from 'components/custom/cards-grid';
import Container from 'components/custom/container';
import { Box, Typography } from 'design-system';
import useIsMetamaskConnected from 'hooks/useIsMetamaskConnected';
import SplitBeeListButton from 'layout/metric/SplitBeeListButton';
import { AssetEntity } from 'modules/land-works/api';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import ClaimHistoryTable from 'modules/land-works/components/land-claim-history';
import ClaimRewardsAlert from 'modules/land-works/components/land-claim-rents-alert';
import MyPropetiesHistoryTable from 'modules/land-works/components/land-my-properties-history';
import { useListingModal } from 'providers/listing-modal-provider';
import { APP_ROUTES, MY_PROPERTIES_ROUTE_TABS, useMyPropertiesRouteTab } from 'router/routes';
import { useWallet } from 'wallets/wallet';

import ListedTabContent from './ListedTabContent';
import { useMetaverseQueryParam } from './MetaverseSelect';
import MyPropertiesViewHeader from './MyPropertiesViewHeader';
import NotListedTabContent from './NotListedTabContent';
import RentedTabContent from './RentedTabContent';
import useGetAccountAssetsQuery from './useGetAccountAssetsQuery';
import useGetAccountNonListedAssetsQuery from './useGetAccountNotListedAssets';

export interface TabContentProps {
  totalAssets: number;
  assets: AssetEntity[];
}

const MyPropertiesView: FC = () => {
  const tab = useMyPropertiesRouteTab();
  const history = useHistory();
  const wallet = useWallet();
  const listingModal = useListingModal();
  const [metaverse] = useMetaverseQueryParam();

  const { data: accountAssets, isLoading: areAssetsLoading } = useGetAccountAssetsQuery(
    wallet.account || '',
    metaverse
  );
  const { data: notListedAssets, isLoading: areNotListedAssetsLoading } = useGetAccountNonListedAssetsQuery(
    wallet.account || '',
    metaverse
  );
  const isMetamaskConnected = useIsMetamaskConnected();
  const isLoading = areNotListedAssetsLoading || areAssetsLoading;

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

  const tabs: {
    id: string;
    label: string;
    total: number;
    content: ReactNode;
  }[] = useMemo(() => {
    return [
      {
        id: MY_PROPERTIES_ROUTE_TABS.rented,
        label: 'Rented',
        total: isLoading ? 0 : accountAssets.rented.length,
        content: <RentedTabContent assets={accountAssets.rented} />,
      },
      {
        id: MY_PROPERTIES_ROUTE_TABS.listed,
        label: 'Listed',
        total: isLoading ? 0 : accountAssets.listed.length,
        content: <ListedTabContent assets={accountAssets.listed} />,
      },
      {
        id: MY_PROPERTIES_ROUTE_TABS.notListed,
        label: 'Not listed',
        total: isLoading ? 0 : notListedAssets.length,
        content: <NotListedTabContent assets={notListedAssets} />,
      },
    ];
  }, [accountAssets, notListedAssets, isLoading]);

  const activeTab = tabs.find(({ id }) => id === tab) || tabs[0];

  const isRentedTab = activeTab.id === MY_PROPERTIES_ROUTE_TABS.rented;
  const isListedTab = activeTab.id === MY_PROPERTIES_ROUTE_TABS.listed;

  return (
    <Container sx={{ pb: 24 }}>
      <ClaimRewardsAlert />

      <MyPropertiesViewHeader tabs={tabs} />
      <Box display="flex" minHeight={90} alignItems="center" justifyContent="space-between" py="18px">
        <Typography variant="body2" color="var(--theme-light-color)">
          <Typography variant="inherit" component="span" color="var(--theme-subtle-color)">
            {activeTab.label}
          </Typography>
          &nbsp;
          {activeTab.total} lands
        </Typography>

        {isMetamaskConnected && (
          <SplitBeeListButton
            btnSize="medium"
            variant="gradient"
            sx={{ marginLeft: 'auto', alignItems: 'center' }}
            onClick={() => listingModal.open()}
          >
            List Now
          </SplitBeeListButton>
        )}
      </Box>

      <Box display="flex" alignItems="flex-start" minHeight={555}>
        {isLoading ? (
          <CardsGrid>
            {Array.from({ length: 6 }).map((_, i) => {
              return <LandCardSkeleton key={i} />;
            })}
          </CardsGrid>
        ) : (
          activeTab.content
        )}
      </Box>

      {(isListedTab || isRentedTab) && (
        <Box mt={15}>
          {isListedTab && <ClaimHistoryTable metaverse={metaverse} />}
          {isRentedTab && <MyPropetiesHistoryTable metaverse={metaverse} />}
        </Box>
      )}
    </Container>
  );
};

export default MyPropertiesView;
