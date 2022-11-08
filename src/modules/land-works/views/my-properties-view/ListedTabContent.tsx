import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import CardsGrid from 'components/custom/cards-grid';
import LandWorksCard from 'modules/land-works/components/land-works-card-explore-view';
import LandWorksLoadingCard from 'modules/land-works/components/land-works-card-loading';
import LandsWorksGridEmptyState from 'modules/land-works/components/land-works-grid-empty-state';
import { getPropertyPath } from 'router/routes';

import { TabContentProps } from '.';

import { getExistingLandIdInProgress, isNewLandTxInProgress } from 'modules/land-works/utils';

const ListedTabContent: FC<TabContentProps> = ({ assets, filteredAssets }) => {
  const history = useHistory();
  const isListingInProgress = isNewLandTxInProgress(assets, 'LISTING_IN_PROGRESS');
  const landIdInWithdraw = getExistingLandIdInProgress(assets, 'WITHDRAW_IN_PROGRESS');

  return assets.length > 0 || isListingInProgress ? (
    <CardsGrid>
      {filteredAssets.map((asset) => {
        if (landIdInWithdraw === asset.metaverseAssetId) {
          return <LandWorksLoadingCard key={asset.metaverseAssetId} title="Withdraw" />;
        } else {
          return (
            <LandWorksCard
              key={asset.id}
              land={asset}
              onClick={() =>
                history.push({
                  pathname: getPropertyPath(asset.id),
                  state: {
                    from: window.location.pathname,
                    title: 'My properties',
                  },
                })
              }
            />
          );
        }
      })}
      {isListingInProgress && <LandWorksLoadingCard title="Listing" />}
    </CardsGrid>
  ) : (
    <LandsWorksGridEmptyState />
  );
};

export default ListedTabContent;
