import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import CardsGrid from 'components/custom/cards-grid';
import LandWorksCard from 'modules/land-works/components/land-works-card-explore-view';
import LandWorksLoadingCard from 'modules/land-works/components/land-works-card-loading';
import LandsWorksGridEmptyState from 'modules/land-works/components/land-works-grid-empty-state';
import { getPropertyPath } from 'router/routes';

import { TabContentProps } from '.';

import { getExistingLandIdInProgress, isNewLandTxInProgress } from 'modules/land-works/utils';

const RentedTabContent: FC<TabContentProps> = ({ assets, totalAssets }) => {
  const history = useHistory();
  const isRentingInProgress = isNewLandTxInProgress(assets, 'RENT_IN_PROGRESS');
  const existLandIdRentInProgress = getExistingLandIdInProgress(assets, 'EXIST_RENT_IN_PROGRESS');

  return totalAssets > 0 || isRentingInProgress ? (
    <CardsGrid>
      {assets.map((asset) => {
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
  ) : (
    <LandsWorksGridEmptyState />
  );
};

export default RentedTabContent;
