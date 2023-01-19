import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { APP_ROUTES, LANDING_ROUTES } from 'router/routes';

const MetaCreatorsView = lazy(() => import('./views/MetaCreatorsView'));
const MetaCreatorsJoinView = lazy(() => import('./views/MetaCreatorsJoinView'));
const MetaCreatorsCreatorView = lazy(() => import('./views/MetaCreatorsCreatorView'));

const MetaCreatorsRoutes = () => {
  return (
    <Switch>
      <Route path={[APP_ROUTES.metaCreators, LANDING_ROUTES.metaCreators]} exact component={MetaCreatorsView} />
      <Route path={[APP_ROUTES.metaCreatorsJoin, LANDING_ROUTES.metaCreatorsJoin]} component={MetaCreatorsJoinView} />
      <Route
        path={[APP_ROUTES.metaCreatorsCreator, LANDING_ROUTES.metaCreatorsCreator]}
        component={MetaCreatorsCreatorView}
      />
    </Switch>
  );
};

export default MetaCreatorsRoutes;
