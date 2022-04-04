import { FC, useEffect, useState } from 'react';

import { useNotion } from 'api/notion/client';
import { Grid } from 'design-system';
import CardLoaderSkeleton from 'modules/land-works/components/scene-expert-card/card-loader-skeleton';
import SceneExpertProfile from 'modules/land-works/components/scene-expert-profile';

import { transformSceneProviderForProfile } from 'modules/land-works/utils';

import { NotionResultForProfile } from 'modules/land-works/components/scene-expert-card/types';

const SingleExpertView: FC = () => {
  const { getSceneProviders } = useNotion();
  const [sceneBuilders, setSceneBuilders] = useState<NotionResultForProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [expert, setExpert] = useState(true);

  useEffect(() => {
    (async () => {
      const sceneProv = await getSceneProviders();
      console.log({ sceneProv });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = sceneProv.results.map((i: any) => transformSceneProviderForProfile(i));
      setSceneBuilders(data);
      setLoading(false);
    })();
  }, [expert]);

  return (
    <Grid className="content-container">
      {loading ? (
        <Grid container spacing={4} rowSpacing={4} columnSpacing={4}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={i}>
              <CardLoaderSkeleton key={i} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Grid container spacing={2} rowSpacing={4} columnSpacing={4}>
            <Grid item xs={8}>
              <SceneExpertProfile builder={sceneBuilders && sceneBuilders[0]} />
            </Grid>
            <Grid item xs={4}>
              <SceneExpertProfile builder={sceneBuilders && sceneBuilders[0]} />
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SingleExpertView;
