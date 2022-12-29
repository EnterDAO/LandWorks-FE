import { FC, ReactNode, RefObject, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import CardsGrid from 'components/custom/cards-grid';
import Container from 'components/custom/container';
import Skeleton from 'components/custom/skeleton';
import { Box } from 'design-system';
import useIsMetamaskConnected from 'hooks/useIsMetamaskConnected';
import SplitBeeListButton from 'layout/metric/SplitBeeListButton';
import ClaimHistoryTable from 'modules/land-works/components/land-claim-history';
import ClaimRewardsAlert from 'modules/land-works/components/land-claim-rents-alert';
import MyPropetiesHistoryTable from 'modules/land-works/components/land-my-properties-history';
import PropertyCardSkeleton from 'modules/land-works/components/land-works-card-explore-view/PropertyCardSkeleton';
import { useSyncActiveAssetTransactions } from 'providers/ActiveAssetTransactionsProvider/ActiveAssetTransactionsProvider';
import { useListingModal } from 'providers/listing-modal-provider';
import { APP_ROUTES, MY_PROPERTIES_ROUTE_TABS, useMyPropertiesRouteTab } from 'router/routes';
import { useWallet } from 'wallets/wallet';

import { AssetStatus } from '../../models/AssetStatus';
import FeedbackButton from '../single-land-view/FeedbackButton';
import ListedTabContent from './ListedTabContent';
import { useMetaverseQueryParam } from './MetaverseSelect';
import MyPropertiesViewHeader from './MyPropertiesViewHeader';
import MyPropertiesViewTabs from './MyPropertiesViewTabs';
import NotListedTabContent from './NotListedTabContent';
import RentedTabContent from './RentedTabContent';
import useGetAllAccountAssetsQuery, { UserAssets } from './useGetAllAccountAssetsQuery';

const useActiveTabId = ({ listed, rented, notListed }: Omit<UserAssets, 'unclaimed'>) => {
  const routeTab = useMyPropertiesRouteTab();

  return useMemo(() => {
    if (routeTab) {
      return routeTab;
    }

    if (notListed.length >= Math.max(listed.length, rented.length)) {
      return MY_PROPERTIES_ROUTE_TABS.notListed;
    } else if (rented.length >= Math.max(notListed.length, listed.length)) {
      return MY_PROPERTIES_ROUTE_TABS.rented;
    }

    return MY_PROPERTIES_ROUTE_TABS.listed;
  }, [routeTab, rented.length, listed.length, notListed.length]);
};

const useGridNumberOfColumns = (ref: RefObject<HTMLElement | null>, initialNumberOfColumns = 6) => {
  const [numberOfColumns, setNumberOfColumns] = useState(initialNumberOfColumns);

  useLayoutEffect(() => {
    if (ref.current) {
      const { gridTemplateColumns } = window.getComputedStyle(ref.current);

      setNumberOfColumns(gridTemplateColumns.split(' ').length);
    }
  }, []);

  return numberOfColumns;
};

const MyPropertiesView: FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const listingModal = useListingModal();
  const [metaverse] = useMetaverseQueryParam();
  const cardGridElRef = useRef<HTMLDivElement | null>(null);
  const numberOfCardsPerRow = useGridNumberOfColumns(cardGridElRef);

  const { data, isLoading } = useGetAllAccountAssetsQuery(wallet.account || '', metaverse);

  useSyncActiveAssetTransactions(data);

  const isMetamaskConnected = useIsMetamaskConnected();

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
        total: isLoading ? 0 : data.rented.length,
        content: <RentedTabContent assets={data.rented} />,
      },
      {
        id: MY_PROPERTIES_ROUTE_TABS.listed,
        label: 'Listed',
        total: isLoading ? 0 : data.listed.length,
        content: <ListedTabContent assets={data.listed} />,
      },
      {
        id: MY_PROPERTIES_ROUTE_TABS.notListed,
        label: 'Not listed',
        total: isLoading ? 0 : data.notListed.length,
        content: <NotListedTabContent assets={data.notListed} />,
      },
    ];
  }, [data.notListed, data.listed, data.rented, isLoading]);

  const activeTabId = useActiveTabId(data);
  const activeTab = tabs.find(({ id }) => id === activeTabId) || tabs[0];

  const isRentedTab = activeTab.id === MY_PROPERTIES_ROUTE_TABS.rented;
  const isListedTab = activeTab.id === MY_PROPERTIES_ROUTE_TABS.listed;

  const isFeedbackButtonVisible = data.listed.some((listedAsset) => listedAsset.status !== AssetStatus.WITHDRAWN);

  return (
    <Container sx={{ pb: 24 }}>
      <ClaimRewardsAlert />

      <MyPropertiesViewHeader />

      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap-reverse"
        gap="18px"
        justifyContent="space-between"
        py="18px"
      >
        <Box flex="1 0 auto">
          {isLoading ? (
            <Box
              display="flex"
              gap={2}
              sx={{
                width: 1,
                flexWrap: 'wrap',
                '> *': {
                  flex: '1 1 auto',
                },
                '@media (min-width: 700px)': {
                  width: 'auto',
                  flexWrap: 'nowrap',
                  '> *': {
                    flex: '0 0 auto',
                  },
                },
              }}
            >
              {tabs.map((tab) => {
                return (
                  <Skeleton key={tab.id} width={120} height={45} variant="rectangular" sx={{ borderRadius: '8px' }} />
                );
              })}
            </Box>
          ) : (
            <MyPropertiesViewTabs activeTabId={activeTabId} tabs={tabs} />
          )}
        </Box>

        {isMetamaskConnected && (
          <Box display="flex" alignItems="center" ml="auto" justifyContent="flex-end" flexWrap="wrap" gap="12px">
            {isFeedbackButtonVisible && <FeedbackButton />}

            <SplitBeeListButton
              btnSize="medium"
              variant="gradient"
              sx={{ marginLeft: 'auto', alignItems: 'center' }}
              onClick={() => listingModal.open()}
            >
              List Now
            </SplitBeeListButton>
          </Box>
        )}
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="flex-start" minHeight={555}>
        {isLoading ? (
          <CardsGrid ref={cardGridElRef}>
            {Array.from({ length: numberOfCardsPerRow }).map((_, i) => {
              return <PropertyCardSkeleton key={i} />;
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
