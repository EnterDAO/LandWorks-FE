import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const SceneBuilderMainView = lazy(() => import('./views/scene-builder-view'));
const SceneBuilderFormView = lazy(() => import('./views/scene-builder-form-view'));
const SingleBuilderView = lazy(() => import('./views/single-scene-builder-view'));

const SceneBuilderView: React.FC = () => {
  return (
    <Switch>
      <Route path="/scene-builder" exact component={SceneBuilderMainView} />
      <Route path="/scene-builder/join-builders" exact component={SceneBuilderFormView} />
      <Route path="/scene-builder/:builderName" exact component={SingleBuilderView} />
    </Switch>
  );
};

export default SceneBuilderView;
