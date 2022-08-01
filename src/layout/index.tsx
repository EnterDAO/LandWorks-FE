import React, { Suspense, lazy, useLayoutEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import ErrorBoundary from 'components/custom/error-boundary';
import { Loader } from 'design-system';
import LayoutFooter from 'layout/components/layout-footer';
import LayoutHeader from 'layout/components/layout-header';
import ContractProvider from 'modules/land-works/providers/contract-provider';
import LandWorksProvider from 'modules/land-works/providers/landworks-provider';
import WarningProvider from 'providers/warning-provider';

import NotionProvider from '../api/notion/client';
import Erc20Provider from '../modules/land-works/providers/erc20-provider';
import { GraphClient } from '../web3/graph/client';
import { AgitaionBar } from './components/agitation-bar';

import classes from './layout.module.scss';

const LandingView = lazy(() => import('modules/landing'));
const LandworksView = lazy(() => import('modules/land-works'));
const SceneBuilderView = lazy(() => import('modules/scene-builder'));
const FAQView = lazy(() => import('modules/faq'));
const GrantsProgram = lazy(() => import('modules/grants-program'));

const client = GraphClient._getWsClient();

const LayoutView: React.FC = () => {
  const [showAgitationBar, setShowAgitationBar] = useState(true);
  const location = useLocation();

  const isntExploreViewRoute = location.pathname.search('/explore') === -1;
  const isntLandingViewRoute = location.pathname !== '/';

  useLayoutEffect(() => {
    setShowAgitationBar(Boolean(!sessionStorage.getItem('showAgitationBar')));
  }, []);

  return (
    <div className={classes.root}>
      {showAgitationBar && <AgitaionBar setShowAgitationBar={setShowAgitationBar} />}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginTop: showAgitationBar ? 50 : 0 }}>
        <WarningProvider>
          <LandWorksProvider>
            <ContractProvider>
              <Erc20Provider>
                <ApolloProvider client={client}>
                  <NotionProvider>
                    <LayoutHeader />
                    <main className={classes.main}>
                      <ErrorBoundary>
                        <Suspense
                          fallback={
                            <Loader
                              sx={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                zoom: '0.5',
                                transform: 'translate(-50%, -50%)',
                              }}
                            />
                          }
                        >
                          <Switch>
                            <Route path="/" exact component={LandingView} />
                            <Route path="/scene-builder" component={SceneBuilderView} />
                            <Route path="/faq" component={FAQView} />
                            <Route exact path="/grants-program" component={GrantsProgram} />
                            <Route component={LandworksView} />
                          </Switch>
                        </Suspense>
                      </ErrorBoundary>
                    </main>
                    {isntExploreViewRoute && isntLandingViewRoute && <LayoutFooter />}
                  </NotionProvider>
                </ApolloProvider>
              </Erc20Provider>
            </ContractProvider>
          </LandWorksProvider>
        </WarningProvider>
      </div>
    </div>
  );
};

export default LayoutView;
