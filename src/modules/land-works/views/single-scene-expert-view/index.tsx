/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useNotion } from 'api/notion/client';
import { Grid } from 'design-system';
import { ArrowRightIcon, BackIcon } from 'design-system/icons';
import SceneExpertProfile from 'modules/land-works/components/scene-expert-profile';
import ProfileLoaderSkeleton from 'modules/land-works/components/scene-expert-profile/card-loader-skeleton';
import SceneExpertDetails from 'modules/land-works/components/scene-expert-profile/scene-expert-details';
import SceneExpertPortfolio from 'modules/land-works/components/scene-expert-profile/scene-expert-portfolio';

import { BreadCrumbs, Separator } from '../scene-expert-form-view/styled';

import { transformSceneProviderForProfile } from 'modules/land-works/utils';

import { NotionResultForProfile } from 'modules/land-works/components/scene-expert-card/types';

const SingleExpertView: FC = () => {
  const { getSceneProviders } = useNotion();
  const [loading, setLoading] = useState(true);
  const [selectedExpert, setSelectedExpert] = useState<NotionResultForProfile>();

  const location = useLocation();

  useEffect(() => {
    (async () => {
      const sceneProv = await getSceneProviders();
      const data = sceneProv.results.map((i: any) => transformSceneProviderForProfile(i));
      const expertFromParam = location.pathname.substring(14);
      const filterDataByExpertName = data?.find((e) => e.builderName === expertFromParam);
      setSelectedExpert(filterDataByExpertName!);
      setLoading(false);
    })();
  }, [selectedExpert]);

  const hasPortfolio = selectedExpert?.portfolio[0] !== undefined;

  return (
    <Grid className="content-container">
      <BreadCrumbs>
        <Link className="button-back" to={'/scene-expert'}>
          <div className="button-icon">
            <BackIcon style={{ width: '20px' }} />
          </div>
          <span>Back to {'Scene Experts'}</span>
        </Link>
        <Separator />
        <Link className="button-explore" to={'/scene-expert'}>
          <span>{'Experts'}</span>
        </Link>
        <ArrowRightIcon style={{ width: '20px' }} />
        <span>{selectedExpert?.builderName}</span>
      </BreadCrumbs>
      {loading ? (
        <ProfileLoaderSkeleton />
      ) : (
        <>
          <Grid mt="28px" container spacing={2} rowSpacing={4} columnSpacing={4}>
            <Grid item xs={12} sm={12} md={12} lg={8}>
              <SceneExpertProfile builder={selectedExpert!} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <SceneExpertDetails builder={selectedExpert!} />
            </Grid>
          </Grid>
          {selectedExpert && hasPortfolio && (
            <Grid mt="28px" container spacing={2} rowSpacing={4} columnSpacing={4}>
              <Grid item xs={12}>
                <SceneExpertPortfolio portfolio={selectedExpert.portfolio} />
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default SingleExpertView;
