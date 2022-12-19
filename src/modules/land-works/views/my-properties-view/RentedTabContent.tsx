import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import CardsGrid from 'components/custom/cards-grid';
import { useSearchBar } from 'components/custom/search-bar/SearchBar';
import LoadMoreButton from 'layout/components/load-more-button';
import { AssetEntity } from 'modules/land-works/api';
import LandWorksCard from 'modules/land-works/components/land-works-card-explore-view';
import LandWorksLoadingCard from 'modules/land-works/components/land-works-card-loading';
import LandsWorksGridEmptyState from 'modules/land-works/components/land-works-grid-empty-state';
import { getPropertyPath } from 'router/routes';

import useExistingRentIdsInProgress from './useExistingRentIdsInProgress';
import useMyPropertiesLoadMoreButton from './useMyPropertiesLoadMoreButton';
import useRentIdsInProgress from './useRentIdsInProgress';
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

  const rentIdsInProgress = useRentIdsInProgress(assets);
  const existLandIdRentInProgress = useExistingRentIdsInProgress(assets);

  return assets.length > 0 || rentIdsInProgress.length > 0 ? (
    <>
      <CardsGrid>
        {listedAssets.map((asset) => {
          if (existLandIdRentInProgress.includes(asset.metaverseAssetId)) {
            return <LandWorksLoadingCard key={asset.metaverseAssetId} title="Renting" />;
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

        {rentIdsInProgress.map((rentIdInProgress) => {
          return <LandWorksLoadingCard key={rentIdInProgress} title="Renting" />;
        })}
      </CardsGrid>

      <LoadMoreButton
        sx={{ mt: 10 }}
        {...loadMoreButtonProps}
        listed={rentIdsInProgress.length + loadMoreButtonProps.listed}
        total={rentIdsInProgress.length + loadMoreButtonProps.total}
      />
    </>
  ) : (
    <LandsWorksGridEmptyState />
  );
};

export default RentedTabContent;
