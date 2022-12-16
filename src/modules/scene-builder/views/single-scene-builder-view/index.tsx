/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Grid } from 'design-system';
import { BackIcon } from 'design-system/icons';
import SceneBuilderProfile from 'modules/scene-builder/components/scene-builder-profile';
import ProfileLoaderSkeleton from 'modules/scene-builder/components/scene-builder-profile/card-loader-skeleton';
import SceneBuilderDetails from 'modules/scene-builder/components/scene-builder-profile/scene-builder-details';
import SceneBuilderPortfolio from 'modules/scene-builder/components/scene-builder-profile/scene-builder-portfolio';
import { APP_ROUTES, LANDING_ROUTES, useIsAppRoute } from 'router/routes';

import { BreadCrumbs } from '../scene-builder-form-view/styled';
import { useSceneBuilders } from '../scene-builder-view';
import { StyledBreadcrumbsGrid } from './styled';

interface SingleBuilderViewParams {
  builderName: string;
}

const useSceneBuilder = (id: string) => {
  const request = useSceneBuilders();

  const data = useMemo(() => {
    if (!request.data) {
      return request.data;
    }

    return request.data.find((sceneBuilder) => sceneBuilder.builderName === id);
  }, [request.data, id]);

  return {
    ...request,
    data,
  };
};

const SingleBuilderView: FC = () => {
  const { builderName } = useParams<SingleBuilderViewParams>();
  const { data: selectedBuilder } = useSceneBuilder(builderName);
  const isAppRoute = useIsAppRoute();
  const sceneBuilderRoute = isAppRoute ? APP_ROUTES.sceneBuilder : LANDING_ROUTES.sceneBuilder;
  const loading = !selectedBuilder;

  const hasPortfolio = selectedBuilder?.portfolio[0] !== undefined;

  return (
    <>
      <StyledBreadcrumbsGrid className="content-container">
        <BreadCrumbs>
          <Link className="button-back" to={sceneBuilderRoute}>
            <div className="button-icon">
              <BackIcon style={{ width: '20px' }} />
            </div>
            <span>Back to {'Scene Builders'}</span>
          </Link>
        </BreadCrumbs>
      </StyledBreadcrumbsGrid>
      <Grid className="content-container" style={{ paddingTop: '0px', position: 'relative' }}>
        {loading ? (
          <ProfileLoaderSkeleton />
        ) : (
          <>
            <Grid container spacing={2} rowSpacing={2} columnSpacing={4} position="relative">
              <Grid item xs={12} sm={12} md={12} lg={8}>
                <SceneBuilderProfile builder={selectedBuilder!} />
                {selectedBuilder && hasPortfolio && (
                  <Grid mt="28px">
                    <Grid item xs={12}>
                      <SceneBuilderPortfolio portfolio={selectedBuilder?.portfolio?.filter((p) => p !== undefined)} />
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <SceneBuilderDetails builder={selectedBuilder!} />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default SingleBuilderView;
