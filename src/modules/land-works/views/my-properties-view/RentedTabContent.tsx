import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import CardsGrid from 'components/custom/cards-grid';
import { useSearchBar } from 'components/custom/search-bar/SearchBar';
import LoadMoreButton from 'layout/components/load-more-button';
import { AssetEntity } from 'modules/land-works/api';
import LandWorksCard from 'modules/land-works/components/land-works-card-explore-view';
import LandWorksLoadingCard from 'modules/land-works/components/land-works-card-loading';
import LandsWorksGridEmptyState from 'modules/land-works/components/land-works-grid-empty-state';
import { useActiveAssetTransactions } from 'providers/ActiveAssetTransactionsProvider/ActiveAssetTransactionsProvider';
import { getPropertyPath } from 'router/routes';

import useMyPropertiesLoadMoreButton from './useMyPropertiesLoadMoreButton';
import useSortAssets from './useSortAssets';

import { filterLandsByQuery } from 'modules/land-works/utils';

interface RentedTabContentProps {
  assets: AssetEntity[];
}

const RentedTabContent: FC<RentedTabContentProps> = ({ assets }) => {
  const history = useHistory();
  const [search] = useSearchBar();

  const filteredAssets = filterLandsByQuery(assets, search);
  const sortedAssets = useSortAssets(filteredAssets);
  const [listedAssets, loadMoreButtonProps] = useMyPropertiesLoadMoreButton(sortedAssets);
  const { rentingTransactionIds } = useActiveAssetTransactions();

  const { existingRentingAssetIds, newRentingAssetIds } = useMemo(() => {
    const rentAssetIds = Object.keys(rentingTransactionIds);
    const existingRentingAssetIds: string[] = [];
    const newRentingAssetIds: string[] = [];

    rentAssetIds.forEach((assetId) => {
      const foundAsset = assets.find((asset) => asset.id === assetId);

      if (foundAsset) {
        existingRentingAssetIds.push(assetId);
      } else {
        newRentingAssetIds.push(assetId);
      }
    });

    return {
      existingRentingAssetIds,
      newRentingAssetIds,
    };
  }, [rentingTransactionIds, assets]);

  return assets.length > 0 || newRentingAssetIds.length > 0 ? (
    <>
      <CardsGrid>
        {listedAssets.map((asset) => {
          if (existingRentingAssetIds.includes(asset.id)) {
            return <LandWorksLoadingCard key={asset.id} title="Renting" />;
          } else {
            return (
              <LandWorksCard
                key={asset.id}
                land={asset}
                onClick={() =>
                  history.push({
                    pathname: getPropertyPath(asset.id),
                    state: { from: window.location.pathname, title: 'My properties' },
                  })
                }
              />
            );
          }
        })}

        {newRentingAssetIds.map((assetId) => {
          return <LandWorksLoadingCard key={assetId} title="Renting" />;
        })}
      </CardsGrid>

      <LoadMoreButton
        sx={{ mt: 10 }}
        {...loadMoreButtonProps}
        listed={newRentingAssetIds.length + loadMoreButtonProps.listed}
        total={newRentingAssetIds.length + loadMoreButtonProps.total}
      />
    </>
  ) : (
    <LandsWorksGridEmptyState />
  );
};

export default RentedTabContent;
