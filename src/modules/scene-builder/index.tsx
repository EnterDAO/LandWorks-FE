import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from 'router/routes';

const SceneBuilderMainView = lazy(() => import('./views/scene-builder-view'));
const SceneBuilderFormView = lazy(() => import('./views/scene-builder-form-view'));
const SingleBuilderView = lazy(() => import('./views/single-scene-builder-view'));

const SceneBuilderView: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.sceneBuilder} exact component={SceneBuilderMainView} />
      <Route path={routes.sceneBuilderJoin} component={SceneBuilderFormView} />
      <Route path={routes.sceneBuilderBuilder} component={SingleBuilderView} />
    </Switch>
  );
};

export default SceneBuilderView;
