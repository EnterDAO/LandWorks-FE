import React, { Suspense, lazy } from 'react';
import { isMobile } from 'react-device-detect';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import { useWarning } from 'components/providers/warning-provider';

import EstateRegistryProvider from './providers/decentraland/estate-registry-provider';
import LandRegistryProvider from './providers/decentraland/land-registry-provider';
import LandworksProvider from './providers/landworks-provider';

const RentingView = lazy(() => import('./views/my-renting-view'));
const LendingView = lazy(() => import('./views/my-lending-view'));
const OwnedPasses = lazy(() => import('./views/lands-view'));
const SingleLand = lazy(() => import('./views/single-land-view'));
const ListProperty = lazy(() => import('./views/list-property-view'));

const MetapassView: React.FC = () => {
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
    <LandworksProvider>
      <LandRegistryProvider></LandRegistryProvider>
      <EstateRegistryProvider> </EstateRegistryProvider>
      <Suspense fallback={<AntdSpin />}>
        <Switch>
          <Route path="/land-works" exact component={OwnedPasses} />
          <Route path="/land-works/land/:tokenId" exact component={SingleLand} />
          <Route path="/land-works/land/:tokenId" exact component={SingleLand} />
          <Route path="/land-works/lending" exact component={LendingView} />
          <Route path="/land-works/renting" exact component={RentingView} />
          <Route path="/land-works/list-property" exact component={ListProperty} />
          <Route path="/land-works/edit-property" exact component={ListProperty} />
          {/*<Redirect to="/land-registry-provider-works" />*/}
        </Switch>
      </Suspense>
    </LandworksProvider>
  );
};

export default MetapassView;
