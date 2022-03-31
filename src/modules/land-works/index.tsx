import React, { lazy } from 'react';
import { isMobile } from 'react-device-detect';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from 'components/custom/protected-route';
import { useWarning } from 'providers/warning-provider';

import SingleExpertView from './views/single-scene-expert-view';

// import { useSessionStorage } from 'react-use-storage';

// import { useWallet } from 'wallets/wallet';

const RentingView = lazy(() => import('./views/my-renting-view'));
const LendingView = lazy(() => import('./views/my-lending-view'));
const ExploreView = lazy(() => import('./views/explore-view'));
const MyPropertiesView = lazy(() => import('./views/my-properties-view'));
const SceneExpertView = lazy(() => import('./views/scene-expert-view'));
const SceneExpertFormView = lazy(() => import('./views/scene-expert-form-view'));
const SingleLand = lazy(() => import('./views/single-land-view'));
const ListProperty = lazy(() => import('./views/list-property-view'));
const EditProperty = lazy(() => import('./views/edit-property-view'));
const LandingView = lazy(() => import('modules/landing'));

const LandworksView: React.FC = () => {
  const warning = useWarning();
  // const walletCtx = useWallet();
  // const [sessionProvider] = useSessionStorage<string | undefined>('wallet_provider');

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
      <Route path="/scene-expert" exact component={SceneExpertView} />
      <Route path="/scene-expert/:expertName" exact component={SingleExpertView} />
      <Route path="/join-experts" exact component={SceneExpertFormView} />
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
      <ProtectedRoute
        isAuthenticated={false}
        authenticationPath="/explore"
        path="/property/:tokenId/edit/"
        exact
        component={EditProperty}
      />
      <Route path={['/home', '/']} component={LandingView} />
    </Switch>
  );
};

export default LandworksView;
