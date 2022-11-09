import { ComponentType, FC, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import splitbee from '@splitbee/web';

import CardsGrid from 'components/custom/cards-grid';
import Container from 'components/custom/container';
import { useSearchBar } from 'components/custom/search-bar/SearchBar';
import { Box, Button, Modal, Typography } from 'design-system';
import { AssetEntity } from 'modules/land-works/api';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import ClaimHistoryTable from 'modules/land-works/components/land-claim-history';
import MyPropetiesHistoryTable from 'modules/land-works/components/land-my-properties-history';
import ListNewProperty from 'modules/land-works/components/list-new-property';
import { APP_ROUTES, MY_PROPERTIES_ROUTE_TABS, useMyPropertiesRouteTab } from 'router/routes';
import { useWallet } from 'wallets/wallet';

import ListedTabContent from './ListedTabContent';
import { useMetaverseQueryParam } from './MetaverseSelect';
import MyPropertiesViewHeader from './MyPropertiesViewHeader';
import NotListedTabContent from './NotListedTabContent';
import RentedTabContent from './RentedTabContent';
import useGetAccountAssetsQuery from './useGetAccountAssetsQuery';
import useSortAssets from './useSortAssets';

import { filterLandsByQuery } from 'modules/land-works/utils';

export interface TabContentProps {
  totalAssets: number;
  assets: AssetEntity[];
}

const MyPropertiesView: FC = () => {
  const tab = useMyPropertiesRouteTab();
  const history = useHistory();
  const wallet = useWallet();
  const [showListNewModal, setShowListNewModal] = useState(false);
  const [metaverse] = useMetaverseQueryParam();
  const [search] = useSearchBar();
  const { data: accountAssets, isLoading } = useGetAccountAssetsQuery(wallet.account || '', metaverse);
  const isMetamaskConnected = wallet.isActive && wallet.connector?.id === 'metamask';

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

  const handleListNowButtonClick = () => {
    setShowListNewModal(true);

    splitbee.track('List new property button click');
  };

  const tabs: {
    id: string;
    label: string;
    labelEnd: number | string;
    assets: AssetEntity[];
    Component: ComponentType<TabContentProps>;
  }[] = useMemo(() => {
    return [
      {
        id: MY_PROPERTIES_ROUTE_TABS.listed,
        label: 'Listed',
        labelEnd: accountAssets.listed.length,
        assets: accountAssets.listed,
        Component: ListedTabContent,
      },
      {
        id: MY_PROPERTIES_ROUTE_TABS.rented,
        label: 'Rented',
        labelEnd: accountAssets.rented.length,
        assets: accountAssets.rented,
        Component: RentedTabContent,
      },
      // TODO: return when design for the not listed cards will be ready
      // {
      //   id: MY_PROPERTIES_ROUTE_TABS.notListed,
      //   label: 'Not listed',
      //   labelEnd: accountAssets.notListed.length,
      //   assets: accountAssets.notListed,
      //   Component: NotListedTabContent,
      // },
    ];
  }, [accountAssets]);

  const activeTab = tabs.find(({ id }) => id === tab) || tabs[0];

  const isRentedTab = activeTab.id === MY_PROPERTIES_ROUTE_TABS.rented;
  const isListedTab = activeTab.id === MY_PROPERTIES_ROUTE_TABS.listed;

  const filteredAssets = filterLandsByQuery(activeTab.assets, search);
  const sortedAssets = useSortAssets(filteredAssets);

  const TabContent = activeTab.Component;

  return (
    <>
      <Modal open={showListNewModal} handleClose={() => setShowListNewModal(false)}>
        <ListNewProperty closeModal={() => setShowListNewModal(false)} />
      </Modal>

      <Container sx={{ pb: 24 }}>
        <MyPropertiesViewHeader tabs={tabs} />
        <Box display="flex" minHeight={90} alignItems="center" justifyContent="space-between" py="18px">
          <Typography variant="body2" color="var(--theme-light-color)">
            <Typography variant="inherit" component="span" color="var(--theme-subtle-color)">
              Listed
            </Typography>
            &nbsp;
            {activeTab.assets.length} lands
          </Typography>

          {isMetamaskConnected && (
            <Button
              btnSize="medium"
              variant="gradient"
              sx={{ marginLeft: 'auto', alignItems: 'center' }}
              onClick={handleListNowButtonClick}
            >
              List Now
            </Button>
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
            <TabContent totalAssets={activeTab.assets.length} assets={sortedAssets} />
          )}
        </Box>

        {(isListedTab || isRentedTab) && (
          <Box mt={15}>
            {isListedTab && <ClaimHistoryTable metaverse={metaverse} />}
            {isRentedTab && <MyPropetiesHistoryTable metaverse={metaverse} />}
          </Box>
        )}
      </Container>
    </>
  );
};

export default MyPropertiesView;
