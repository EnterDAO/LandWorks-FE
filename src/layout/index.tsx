import React, { Suspense, lazy, useLayoutEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import ErrorBoundary from 'components/custom/error-boundary';
import { Box, Loader } from 'design-system';
import LayoutFooter from 'layout/components/layout-footer';
import LayoutHeader from 'layout/components/layout-header';
import ContractProvider from 'modules/land-works/providers/contract-provider';
import LandWorksProvider from 'modules/land-works/providers/landworks-provider';
import WarningProvider from 'providers/warning-provider';
import { routes } from 'router/routes';

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
  const isGrandProgramRoute = useRouteMatch({
    path: routes.grantsProgram,
  });

  const isRouteHasFooter = useRouteMatch({
    path: [routes.explore, routes.home, routes.faq],
    exact: true,
  });

  useLayoutEffect(() => {
    setShowAgitationBar(Boolean(!sessionStorage.getItem('showAgitationBar')));
  }, []);

  return (
    <Box
      className={classes.root}
      // fixes issue when mobile content nav on grants page overlaps footer
      pb={isGrandProgramRoute ? { xs: '77px', md: 0 } : 0}
    >
      {showAgitationBar && <AgitaionBar setShowAgitationBar={setShowAgitationBar} />}
      <div
        style={{
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          marginTop: showAgitationBar ? 50 : 0,
        }}
      >
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
                            <Route path={routes.home} exact component={LandingView} />
                            <Route path={routes.sceneBuilder} component={SceneBuilderView} />
                            <Route path={routes.faq} component={FAQView} />
                            <Route path={routes.grantsProgram} component={GrantsProgram} />
                            <Route component={LandworksView} />
                          </Switch>
                        </Suspense>
                      </ErrorBoundary>
                    </main>
                    {!isRouteHasFooter && <LayoutFooter />}
                  </NotionProvider>
                </ApolloProvider>
              </Erc20Provider>
            </ContractProvider>
          </LandWorksProvider>
        </WarningProvider>
      </div>
    </Box>
  );
};

export default LayoutView;
