import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import ErrorBoundary from 'components/custom/error-boundary';
import { Box } from 'design-system';
import LayoutFooter from 'layout/components/layout-footer';
import LayoutHeader from 'layout/components/layout-header';
import ContractProvider from 'modules/land-works/providers/contract-provider';
import LandWorksProvider from 'modules/land-works/providers/landworks-provider';
import StickyOffsetProvider from 'providers/sticky-offset-provider';
import WarningProvider from 'providers/warning-provider';
import { APP_ROUTES, LANDING_ROUTES } from 'router/routes';

import NotionProvider from '../api/notion/client';
import Erc20Provider from '../modules/land-works/providers/erc20-provider';
import NotFoundView from '../modules/land-works/views/not-found-view';
import { GraphClient } from '../web3/graph/client';
import LoadingView from './components/LoadingView';

import classes from './layout.module.scss';

const LandingView = lazy(() => import('modules/landing'));
const LandworksView = lazy(() => import('modules/land-works'));
const SceneBuilderView = lazy(() => import('modules/scene-builder'));
const FAQView = lazy(() => import('modules/faq'));
const GrantsProgram = lazy(() => import('modules/grants-program'));

const client = GraphClient._getWsClient();

const LayoutView: React.FC = () => {
  const isGrandProgramRoute = useRouteMatch({
    path: [APP_ROUTES.grantsProgram, LANDING_ROUTES.grantsProgram],
  });

  const isRouteHasFooter = useRouteMatch({
    path: [LANDING_ROUTES.home, LANDING_ROUTES.faq, APP_ROUTES.explore, APP_ROUTES.faq],
    exact: true,
  });

  return (
    <Box
      className={classes.root}
      // fixes issue when mobile content nav on grants page overlaps footer
      pb={isGrandProgramRoute ? { xs: '77px', md: 0 } : 0}
    >
      <div
        style={{
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <WarningProvider>
          <LandWorksProvider>
            <ContractProvider>
              <Erc20Provider>
                <ApolloProvider client={client}>
                  <NotionProvider>
                    <StickyOffsetProvider>
                      <LayoutHeader />
                      <main className={classes.main}>
                        <ErrorBoundary>
                          <Suspense fallback={<LoadingView />}>
                            <Switch>
                              <Redirect from={LANDING_ROUTES.property} to={APP_ROUTES.property} />
                              <Redirect from={LANDING_ROUTES.myProperties} to={APP_ROUTES.myProperties} />

                              <Route path={LANDING_ROUTES.home} exact component={LandingView} />
                              <Route
                                path={[LANDING_ROUTES.sceneBuilder, APP_ROUTES.sceneBuilder]}
                                component={SceneBuilderView}
                              />
                              <Route path={[LANDING_ROUTES.faq, APP_ROUTES.faq]} component={FAQView} />
                              <Route
                                path={[LANDING_ROUTES.grantsProgram, APP_ROUTES.grantsProgram]}
                                component={GrantsProgram}
                              />
                              <Route path={APP_ROUTES.explore} component={LandworksView} />
                              <Route path="*" component={NotFoundView} />
                            </Switch>
                          </Suspense>
                        </ErrorBoundary>
                      </main>
                      {!isRouteHasFooter && <LayoutFooter />}
                    </StickyOffsetProvider>
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
