/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useNotion } from 'api/notion/client';
import { Grid } from 'design-system';
import { ArrowRightIcon, BackIcon } from 'design-system/icons';
import SceneExpertProfile from 'modules/land-works/components/scene-expert-profile';
import ProfileLoaderSkeleton from 'modules/land-works/components/scene-expert-profile/card-loader-skeleton';
import SceneExpertDetails from 'modules/land-works/components/scene-expert-profile/scene-expert-details';
import SceneExpertPortfolio from 'modules/land-works/components/scene-expert-profile/scene-expert-portfolio';

import { BreadCrumbs, Separator } from '../scene-expert-form-view/styled';

import { transformSceneProviderForPortfolio, transformSceneProviderForProfile } from 'modules/land-works/utils';

import {
  NotionResultForPortfolio,
  NotionResultForProfile,
} from 'modules/land-works/components/scene-expert-card/types';

const SingleExpertView: FC = () => {
  const { getSceneProviders } = useNotion();
  const [sceneBuilders, setSceneBuilders] = useState<NotionResultForProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<NotionResultForPortfolio[]>([]);

  useEffect(() => {
    (async () => {
      const sceneProv = await getSceneProviders();
      const data = sceneProv.results.map((i: any) => transformSceneProviderForProfile(i));
      const portfolioImages = sceneProv.results.map((i: any) => transformSceneProviderForPortfolio(i));
      setSceneBuilders(data);
      setPortfolio(portfolioImages);
      setLoading(false);
    })();
  }, [sceneBuilders]);

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
        <span>{sceneBuilders && sceneBuilders[0]?.builderName}</span>
      </BreadCrumbs>
      {loading ? (
        <ProfileLoaderSkeleton />
      ) : (
        <>
          <Grid mt="28px" container spacing={2} rowSpacing={4} columnSpacing={4}>
            <Grid item xs={8}>
              <SceneExpertProfile builder={sceneBuilders && sceneBuilders[0]} />
            </Grid>
            <Grid item xs={4}>
              <SceneExpertDetails builder={sceneBuilders && sceneBuilders[0]} />
            </Grid>
          </Grid>
          <Grid mt="28px" container spacing={2} rowSpacing={4} columnSpacing={4}>
            <Grid item xs={12}>
              <SceneExpertPortfolio portfolio={portfolio} />
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SingleExpertView;
