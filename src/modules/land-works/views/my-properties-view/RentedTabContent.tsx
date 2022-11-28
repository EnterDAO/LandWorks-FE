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

import useMyPropertiesLoadMoreButton from './useMyPropertiesLoadMoreButton';
import useSortAssets from './useSortAssets';

import { filterLandsByQuery, getExistingLandIdInProgress, isNewLandTxInProgress } from 'modules/land-works/utils';

interface RentedTabContentProps {
  assets: AssetEntity[];
}

const RentedTabContent: FC<RentedTabContentProps> = ({ assets }) => {
  const history = useHistory();
  const [search] = useSearchBar();
  const isRentingInProgress = isNewLandTxInProgress(assets, 'RENT_IN_PROGRESS');
  const existLandIdRentInProgress = getExistingLandIdInProgress(assets, 'EXIST_RENT_IN_PROGRESS');

  const filteredAssets = filterLandsByQuery(assets, search);
  const sortedAssets = useSortAssets(filteredAssets);
  const [listedAssets, loadMoreButtonProps] = useMyPropertiesLoadMoreButton(sortedAssets);

  return assets.length > 0 || isRentingInProgress ? (
    <>
      <CardsGrid>
        {listedAssets.map((asset) => {
          if (existLandIdRentInProgress === asset.metaverseAssetId) {
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
        {isRentingInProgress && <LandWorksLoadingCard title="Renting" />}
      </CardsGrid>

      <LoadMoreButton
        sx={{ mt: 10 }}
        {...loadMoreButtonProps}
        listed={+isRentingInProgress + loadMoreButtonProps.listed}
        total={+isRentingInProgress + loadMoreButtonProps.total}
      />
    </>
  ) : (
    <LandsWorksGridEmptyState />
  );
};

export default RentedTabContent;
