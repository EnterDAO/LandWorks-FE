import React, { lazy } from 'react';
import { isMobile } from 'react-device-detect';
import { Route, Switch } from 'react-router-dom';

import { useWarning } from 'providers/warning-provider';

const ExploreView = lazy(() => import('./views/explore-view'));
const MyPropertiesView = lazy(() => import('./views/my-properties-view'));
const SingleLand = lazy(() => import('./views/single-land-view'));

const LandworksView: React.FC = () => {
  const warning = useWarning();

  React.useEffect(() => {
    let warningDestructor: () => void;

    if (isMobile) {
      warningDestructor = warning.addWarn({
        text: 'Transactions can only be made from the desktop version using a wallet',
        closable: true,
        storageIdentity: 'bb_desktop_metamask_tx_warn',
      });
    }

    return () => {
      warningDestructor?.();
    };
  }, [isMobile]);

  return (
    <Switch>
      <Route path="/property/:tokenId" exact component={SingleLand} />
      <Route path="/explore" exact component={ExploreView} />
      <Route path="/my-properties" exact component={MyPropertiesView} />
    </Switch>
  );
};

export default LandworksView;
