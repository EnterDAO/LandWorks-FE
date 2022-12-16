import React, { lazy, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Route, Switch } from 'react-router-dom';

import ListingModalProvider from 'providers/listing-modal-provider';
import { useWarning } from 'providers/warning-provider';
import { APP_ROUTES } from 'router/routes';

const ExploreView = lazy(() => import('./views/explore-view'));
const MyPropertiesView = lazy(() => import('./views/my-properties-view'));
const SingleLand = lazy(() => import('./views/single-land-view'));

const LandworksView: React.FC = () => {
  const warning = useWarning();

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    return warning.addWarn({
      text: 'Transactions can only be made from the desktop version using a wallet',
      closable: true,
      storageIdentity: 'bb_desktop_metamask_tx_warn',
    });
  }, [isMobile]);

  return (
    <ListingModalProvider>
      <Switch>
        <Route path={APP_ROUTES.explore} exact component={ExploreView} />
        <Route path={APP_ROUTES.property} component={SingleLand} />
        <Route path={APP_ROUTES.myProperties} component={MyPropertiesView} />
      </Switch>
    </ListingModalProvider>
  );
};

export default LandworksView;
