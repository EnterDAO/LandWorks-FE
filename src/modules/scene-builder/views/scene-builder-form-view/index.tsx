import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Grid, Icon } from 'design-system';
import { ArrowRightIcon, BackIcon } from 'design-system/icons';
import { LocationState } from 'modules/interface';
import SceneBuildersForm from 'modules/scene-builder/components/land-works-scene-builders-form';

import { BreadCrumbs, Separator } from './styled';

const SceneBuilderFormView: FC = () => {
  const location = useLocation<LocationState>();

  return (
    <Grid className="content-container">
      <BreadCrumbs>
        <Link className="button-back" to={location.state?.from || '/scene-builder'}>
          <div className="button-icon">
            <Icon iconSize={'m'} iconElement={<BackIcon />} />
          </div>
          <span>Back to {location.state?.title || 'Scene Builder'}</span>
        </Link>

        <Separator />

        <Link className="button-explore" to={location.state?.from || '/scene-builder'}>
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
