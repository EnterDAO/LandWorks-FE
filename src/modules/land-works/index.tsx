import React, { lazy } from 'react';
import { isMobile } from 'react-device-detect';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from 'components/custom/protected-route';
import { useWarning } from 'providers/warning-provider';

import SceneBuilderFormView from './views/scene-builder-form-view';
import SceneBuilderView from './views/scene-builder-view';
import SingleBuilderView from './views/single-scene-builder-view';

const RentingView = lazy(() => import('./views/my-renting-view'));
const LendingView = lazy(() => import('./views/my-lending-view'));
const LandsView = lazy(() => import('./views/lands-view'));
const ExploreView = lazy(() => import('./views/explore-view'));
const MyPropertiesView = lazy(() => import('./views/my-properties-view'));
const SingleLand = lazy(() => import('./views/single-land-view'));
const ListProperty = lazy(() => import('./views/list-property-view'));
const LandingView = lazy(() => import('modules/landing'));

const LandworksView: React.FC = () => {
  const warning = useWarning();

  React.useEffect(() => {
    let warningDestructor: () => void;

    if (isMobile) {
      warningDestructor = warning.addWarn({
        text: 'Transactions can only be made from the desktop version using Metamask',
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
      <ProtectedRoute isAuthenticated={false} authenticationPath="/explore" path="/all" exact component={LandsView} />
      <Route path="/explore" exact component={ExploreView} />
      <Route path="/my-properties" exact component={MyPropertiesView} />
      <Route path="/scene-builder" exact component={SceneBuilderView} />
      <Route path="/scene-builder/:builderName" exact component={SingleBuilderView} />
      <Route path="/join-builders" exact component={SceneBuilderFormView} />
      <Route path="/lending" exact component={LendingView} />
      <ProtectedRoute
        isAuthenticated={false}
        authenticationPath="/my-properties"
        path="/renting"
        exact
        component={RentingView}
      />
      <ProtectedRoute
        isAuthenticated={false}
        authenticationPath="/explore"
        path="/list"
        exact
        component={ListProperty}
      />
      <Route path={['/home', '/']} component={LandingView} />
    </Switch>
  );
};

export default LandworksView;
