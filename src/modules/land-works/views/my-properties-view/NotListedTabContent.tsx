import React, { FC } from 'react';

import CardsGrid from 'components/custom/cards-grid';
import { useSearchBar } from 'components/custom/search-bar/SearchBar';
import { BaseNFT } from 'modules/interface';
import LandsWorksGridEmptyState from 'modules/land-works/components/land-works-grid-empty-state';

import ListAssetCard from './ListAssetCard';

import { filterLandsByQuery } from 'modules/land-works/utils';

interface NotListedTabContentProps {
  assets: BaseNFT[];
}

const NotListedTabContent: FC<NotListedTabContentProps> = ({ assets }) => {
  const [search] = useSearchBar();
  const filteredAssets = filterLandsByQuery(assets, search);

  return assets.length > 0 ? (
    <CardsGrid>
      {filteredAssets.map((asset) => {
        return <ListAssetCard key={asset.id} asset={asset} />;
      })}
    </CardsGrid>
  ) : (
    <LandsWorksGridEmptyState />
  );
};

export default NotListedTabContent;
