import React, { FC } from 'react';

import CardsGrid from 'components/custom/cards-grid';
import { useSearchBar } from 'components/custom/search-bar/SearchBar';
import LoadMoreButton from 'layout/components/load-more-button';
import { BaseNFT } from 'modules/interface';
import LandsWorksGridEmptyState from 'modules/land-works/components/land-works-grid-empty-state';

import ListAssetCard from './ListAssetCard';
import useMyPropertiesLoadMoreButton from './useMyPropertiesLoadMoreButton';

import { filterLandsByQuery } from 'modules/land-works/utils';

interface NotListedTabContentProps {
  assets: BaseNFT[];
}

const NotListedTabContent: FC<NotListedTabContentProps> = ({ assets }) => {
  const [search] = useSearchBar();
  const filteredAssets = filterLandsByQuery(assets, search);
  const [listedAssets, loadMoreButtonProps] = useMyPropertiesLoadMoreButton(filteredAssets);

  return assets.length > 0 ? (
    <>
      <CardsGrid>
        {listedAssets.map((asset) => {
          return <ListAssetCard key={asset.id} asset={asset} />;
        })}
      </CardsGrid>
      <LoadMoreButton sx={{ mt: 10 }} {...loadMoreButtonProps} />
    </>
  ) : (
    <LandsWorksGridEmptyState />
  );
};

export default NotListedTabContent;
