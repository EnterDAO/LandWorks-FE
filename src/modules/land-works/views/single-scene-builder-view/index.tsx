/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useNotion } from 'api/notion/client';
import { Grid } from 'design-system';
import { ArrowRightIcon, BackIcon } from 'design-system/icons';
import SceneBuilderProfile from 'modules/land-works/components/scene-builder-profile';
import ProfileLoaderSkeleton from 'modules/land-works/components/scene-builder-profile/card-loader-skeleton';
import SceneBuilderDetails from 'modules/land-works/components/scene-builder-profile/scene-builder-details';
import SceneBuilderPortfolio from 'modules/land-works/components/scene-builder-profile/scene-builder-portfolio';

import { BreadCrumbs, Separator } from '../scene-builder-form-view/styled';

import { transformSceneProviderForProfile } from 'modules/land-works/utils';

import { NotionResultForProfile } from 'modules/land-works/components/scene-builder-card/types';

interface SingleBuilderViewParams {
  builderName: string;
}

const SingleBuilderView: FC = () => {
  const { getSceneProviders } = useNotion();
  const [loading, setLoading] = useState(true);
  const [selectedBuilder, setSelectedBuilder] = useState<NotionResultForProfile>();
  const builderFromParam = useParams() as SingleBuilderViewParams;
  const { builderName } = builderFromParam;

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
    <Grid className="content-container" style={{ position: 'relative' }}>
      <BreadCrumbs style={{ position: 'sticky', top: '147px' }}>
        <Link className="button-back" to={'/scene-builder'}>
          <div className="button-icon">
            <BackIcon style={{ width: '20px' }} />
          </div>
          <span>Back to {'Scene Builders'}</span>
        </Link>
        <Separator />
        <Link className="button-explore" to={'/scene-builder'}>
          <span>{'Builders'}</span>
        </Link>
        <ArrowRightIcon style={{ width: '20px' }} />
        <span>{selectedBuilder?.builderName}</span>
      </BreadCrumbs>

      {loading ? (
        <ProfileLoaderSkeleton />
      ) : (
        <>
          <Grid mt="18px" container spacing={2} rowSpacing={4} columnSpacing={4} position="relative">
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
  );
};

export default SingleBuilderView;
