import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import AntdSpin from 'antd/lib/spin';

import ErrorBoundary from 'components/custom/error-boundary';
import LayoutFooter from 'layout/components/layout-footer';
import LayoutHeader from 'layout/components/layout-header';
import EstateRegistryProvider from 'modules/land-works/providers/decentraland/estate-registry-provider';
import LandRegistryProvider from 'modules/land-works/providers/decentraland/land-registry-provider';
import LandWorksProvider from 'modules/land-works/providers/landworks-provider';
import WarningProvider from 'providers/warning-provider';

import Erc20Provider from '../modules/land-works/providers/erc20-provider';
import { GraphClient } from '../web3/graph/client';

import s from './s.module.scss';

const LandworksView = lazy(() => import('modules/land-works'));
const client = GraphClient._getWsClient();

const LayoutView: React.FC = () => {
  const location = useLocation();

  const isntExploreViewRoute = location.pathname.search('/explore') === -1;

  return (
    <div className={s.layout}>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <WarningProvider>
          <LandWorksProvider>
            <LandRegistryProvider>
              <EstateRegistryProvider>
                <Erc20Provider>
                  <ApolloProvider client={client}>
                    <LayoutHeader />
                    <main className={s.main}>
                      <ErrorBoundary>
                        <Suspense fallback={<AntdSpin className="pv-24 ph-64" style={{ width: '100%' }} />}>
                          <Switch>
                            <Route path="/" component={LandworksView} />
                          </Switch>
                        </Suspense>
                      </ErrorBoundary>
                    </main>
                    {isntExploreViewRoute && <LayoutFooter />}
                  </ApolloProvider>
                </Erc20Provider>
              </EstateRegistryProvider>
            </LandRegistryProvider>
          </LandWorksProvider>
        </WarningProvider>
      </div>
    </div>
  );
};

export default LayoutView;
