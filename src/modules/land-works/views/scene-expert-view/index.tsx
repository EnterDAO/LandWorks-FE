import { FC, useEffect, useState } from 'react';

import { useNotion } from 'api/notion/client';
import { Grid } from 'design-system';
import SceneExpertHeading from 'modules/land-works/components/land-works-scene-experts-heading';
import SceneExpertCard from 'modules/land-works/components/scene-expert-card';

import { transformSceneProvider } from 'modules/land-works/utils';

import { NotionResultForCard } from 'modules/land-works/components/scene-expert-card/types';

const SceneExpertView: FC = () => {
  const { getSceneProviders } = useNotion();
  const [sceneBuilders, setSceneBuilders] = useState<NotionResultForCard[]>([]);

  useEffect(() => {
    (async () => {
      const sceneProv = await getSceneProviders();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = sceneProv.results.map((i: any) => transformSceneProvider(i));
      setSceneBuilders(data);
    })();
  }, []);

  return (
    <Grid className="content-container">
      <SceneExpertHeading />
      <Grid container spacing={4} rowSpacing={4} columnSpacing={4}>
        {sceneBuilders.length &&
          sceneBuilders.map((builder) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={builder.builderName}>
              <SceneExpertCard builder={builder} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default SceneExpertView;
