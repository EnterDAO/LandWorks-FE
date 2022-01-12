import React, { Suspense, lazy } from 'react';
import { isMobile } from 'react-device-detect';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import ProtectedRoute from 'components/custom/protected-route';
import { useWarning } from 'components/providers/warning-provider';
import { useWallet } from 'wallets/wallet';

const RentingView = lazy(() => import('./views/my-renting-view'));
const LendingView = lazy(() => import('./views/my-lending-view'));
const LandsView = lazy(() => import('./views/lands-view'));
const SingleLand = lazy(() => import('./views/single-land-view'));
const ListProperty = lazy(() => import('./views/list-property-view'));
const EditProperty = lazy(() => import('./views/edit-property-view'));
const LandingView = lazy(() => import('modules/landing'));

const LandworksView: React.FC = () => {
  const warning = useWarning();
  const walletCtx = useWallet();
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
    <Suspense fallback={<AntdSpin />}>
      <Switch>
        <Route path="/property/:tokenId" exact component={SingleLand} />
        <Route path="/all" exact component={LandsView} />
        <Route path="/lending" exact component={LendingView} />
        <Route path="/renting" exact component={RentingView} />
        <ProtectedRoute
          isAuthenticated={!!walletCtx.account}
          authenticationPath="/"
          path="/list"
          exact
          component={ListProperty}
        />
        <ProtectedRoute
          isAuthenticated={!!walletCtx.account}
          authenticationPath="/"
          path="/property/:tokenid/edit/"
          exact
          component={EditProperty}
        />
        <Route path={['/home', '/']} component={LandingView} />

        {/*<Redirect to="/land-registry-provider-works" />*/}
      </Switch>
    </Suspense>
  );
};

export default LandworksView;
