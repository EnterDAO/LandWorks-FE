import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { APP_ROUTES, LANDING_ROUTES } from 'router/routes';

const SceneBuilderMainView = lazy(() => import('./views/scene-builder-view'));
const SceneBuilderFormView = lazy(() => import('./views/scene-builder-form-view'));
const SingleBuilderView = lazy(() => import('./views/single-scene-builder-view'));

const SceneBuilderView: React.FC = () => {
  return (
    <Switch>
      <Route path={[APP_ROUTES.sceneBuilder, LANDING_ROUTES.sceneBuilder]} exact component={SceneBuilderMainView} />
      <Route path={[APP_ROUTES.sceneBuilderJoin, LANDING_ROUTES.sceneBuilderJoin]} component={SceneBuilderFormView} />
      <Route
        path={[APP_ROUTES.sceneBuilderBuilder, LANDING_ROUTES.sceneBuilderBuilder]}
        component={SingleBuilderView}
      />
    </Switch>
  );
};

export default SceneBuilderView;
