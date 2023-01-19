/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Redirect, useParams } from 'react-router-dom';

import { Grid } from 'design-system';
import { BackIcon } from 'design-system/icons';
import SceneBuilderProfile from 'modules/meta-creators/components/scene-builder-profile';
import ProfileLoaderSkeleton from 'modules/meta-creators/components/scene-builder-profile/card-loader-skeleton';
import SceneBuilderDetails from 'modules/meta-creators/components/scene-builder-profile/scene-builder-details';
import SceneBuilderPortfolio from 'modules/meta-creators/components/scene-builder-profile/scene-builder-portfolio';
import useGetMetaCreatorByIdQuery from 'modules/meta-creators/hooks/useGetMetaCreatorByIdQuery';
import { APP_ROUTES, LANDING_ROUTES, useIsAppRoute } from 'router/routes';

import { BreadCrumbs } from '../MetaCreatorsJoinView/styled';
import { StyledBreadcrumbsGrid } from './styled';

const MetaCreatorsCreatorView = () => {
  const { metaCreatorId } = useParams<{ metaCreatorId: string }>();
  const { data: metaCreator, isLoading } = useGetMetaCreatorByIdQuery(metaCreatorId);
  const isAppRoute = useIsAppRoute();
  const metaCreatorsRoute = isAppRoute ? APP_ROUTES.metaCreators : LANDING_ROUTES.metaCreators;
  const notFoundRoute = isAppRoute ? APP_ROUTES.notFound : LANDING_ROUTES.notFound;

  if (!isLoading && !metaCreator) {
    return <Redirect to={notFoundRoute} />;
  }

  const hasPortfolio = metaCreator?.portfolio[0] !== undefined;

  return (
    <>
      <StyledBreadcrumbsGrid className="content-container">
        <BreadCrumbs>
          <Link className="button-back" to={metaCreatorsRoute}>
            <div className="button-icon">
              <BackIcon style={{ width: '20px' }} />
            </div>
            <span>Back to MetaCreators</span>
          </Link>
        </BreadCrumbs>
      </StyledBreadcrumbsGrid>
      <Grid className="content-container" style={{ paddingTop: '0px', position: 'relative' }}>
        {!metaCreator ? (
          <ProfileLoaderSkeleton />
        ) : (
          <>
            <Grid container spacing={2} rowSpacing={2} columnSpacing={4} position="relative">
              <Grid item xs={12} sm={12} md={12} lg={8}>
                <SceneBuilderProfile builder={metaCreator} />
                {metaCreator && hasPortfolio && (
                  <Grid mt="28px">
                    <Grid item xs={12}>
                      <SceneBuilderPortfolio portfolio={metaCreator?.portfolio?.filter((p) => p !== undefined)} />
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <SceneBuilderDetails builder={metaCreator} />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default MetaCreatorsCreatorView;
