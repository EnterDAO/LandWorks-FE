import React, { lazy } from 'react';
import { isMobile } from 'react-device-detect';
import { Route, Switch } from 'react-router-dom';

import { useWarning } from 'providers/warning-provider';

const SceneBuilderMainView = lazy(() => import('./views/scene-builder-view'));
const SceneBuilderFormView = lazy(() => import('./views/scene-builder-form-view'));
const SingleBuilderView = lazy(() => import('./views/single-scene-builder-view'));

const SceneBuilderView: React.FC = () => {
  const warning = useWarning();

  React.useEffect(() => {
    let warningDestructor: () => void;

    if (isMobile) {
      warningDestructor = warning.addWarn({
        text: 'Transactions can only be made from the desktop version using a wallet',
        closable: true,
        storageIdentity: 'bb_desktop_metamask_tx_warn',
      });
    }

    return () => {
      warningDestructor?.();
    };
  }, [isMobile]);

  return (
    <Switch>
      <Route exact component={SceneBuilderMainView} />
      <Route path="/:builderName" exact component={SingleBuilderView} />
      <Route path="/join-builders" exact component={SceneBuilderFormView} />
    </Switch>
  );
};

export default SceneBuilderView;
