/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useNotion } from 'api/notion/client';
import { Grid } from 'design-system';
import { ArrowRightIcon, BackIcon } from 'design-system/icons';
import SceneBuilderProfile from 'modules/scene-builder/components/scene-builder-profile';
import ProfileLoaderSkeleton from 'modules/scene-builder/components/scene-builder-profile/card-loader-skeleton';
import SceneBuilderDetails from 'modules/scene-builder/components/scene-builder-profile/scene-builder-details';
import SceneBuilderPortfolio from 'modules/scene-builder/components/scene-builder-profile/scene-builder-portfolio';
import { APP_ROUTES, LANDING_ROUTES, useIsAppRoute } from 'router/routes';

import { BreadCrumbs, Separator } from '../scene-builder-form-view/styled';
import { StyledBreadcrumbsGrid } from './styled';

import { transformSceneProviderForProfile } from 'modules/scene-builder/utils';

import { NotionResultForProfile } from 'modules/scene-builder/components/scene-builder-card/types';

interface SingleBuilderViewParams {
  builderName: string;
}

const SingleBuilderView: FC = () => {
  const { getSceneProviders } = useNotion();
  const [loading, setLoading] = useState(true);
  const [selectedBuilder, setSelectedBuilder] = useState<NotionResultForProfile>();
  const builderFromParam = useParams() as SingleBuilderViewParams;
  const { builderName } = builderFromParam;
  const isAppRoute = useIsAppRoute();
  const sceneBuilderRoute = isAppRoute ? APP_ROUTES.sceneBuilder : LANDING_ROUTES.sceneBuilder;

  useEffect(() => {
    (async () => {
      const sceneProv = await getSceneProviders();
      const data = sceneProv.results.map((i: any) => transformSceneProviderForProfile(i));
      const filterDataByBuilderName = data?.find((e) => e.builderName === builderName);
      setSelectedBuilder(filterDataByBuilderName!);
      setLoading(false);
    })();
  }, [builderFromParam]);

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
          <Separator />
          <Link className="button-explore" to={sceneBuilderRoute}>
            <span>{'Builders'}</span>
          </Link>
          <ArrowRightIcon style={{ width: '20px' }} />
          <span>{selectedBuilder?.builderName}</span>
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
