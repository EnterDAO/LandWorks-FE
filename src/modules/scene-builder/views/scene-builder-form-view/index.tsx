import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Grid, Icon } from 'design-system';
import { ArrowRightIcon, BackIcon } from 'design-system/icons';
import { LocationState } from 'modules/interface';
import SceneBuildersForm from 'modules/scene-builder/components/land-works-scene-builders-form';
import { APP_ROUTES, LANDING_ROUTES, useIsAppRoute } from 'router/routes';

import { BreadCrumbs, Separator } from './styled';

const SceneBuilderFormView: FC = () => {
  const location = useLocation<LocationState>();
  const isAppRoute = useIsAppRoute();

  const sceneBuilderRoute = isAppRoute ? APP_ROUTES.sceneBuilder : LANDING_ROUTES.sceneBuilder;

  return (
    <Grid className="content-container">
      <BreadCrumbs>
        <Link className="button-back" to={location.state?.from || sceneBuilderRoute}>
          <div className="button-icon">
            <Icon iconSize={'m'} iconElement={<BackIcon />} />
          </div>
          <span>Back to {location.state?.title || 'Scene Builder'}</span>
        </Link>

        <Separator />

        <Link className="button-explore" to={location.state?.from || sceneBuilderRoute}>
          <span>{location.state?.title || 'Scene Builder'}</span>
        </Link>

        <Icon iconSize={'m'} iconElement={<ArrowRightIcon />} />

        <p className="current">Join Builders</p>
      </BreadCrumbs>
      <SceneBuildersForm />
    </Grid>
  );
};

export default SceneBuilderFormView;
