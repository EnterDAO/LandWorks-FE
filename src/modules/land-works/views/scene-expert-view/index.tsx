import { FC, useEffect, useState } from 'react';
import {
  SCENE_EXPERT_TAB_STATE_ALL,
  SCENE_EXPERT_TAB_STATE_INDIVIDUAL,
  SCENE_EXPERT_TAB_STATE_STUDIO,
} from 'constants/modules';
import TabContext from '@mui/lab/TabContext';

import { useNotion } from 'api/notion/client';
import { Grid } from 'design-system';
import SceneExpertHeading from 'modules/land-works/components/land-works-scene-experts-heading';
import SceneExpertCard from 'modules/land-works/components/scene-expert-card';
import CardLoaderSkeleton from 'modules/land-works/components/scene-expert-card/card-loader-skeleton';
import SceneExpertTabs from 'modules/land-works/components/scene-expert-tabs';

import { transformSceneProviderForCard } from 'modules/land-works/utils';

import { NotionResultForCard } from 'modules/land-works/components/scene-expert-card/types';

const SceneExpertView: FC = () => {
  const { getSceneProviders } = useNotion();
  const [sceneBuilders, setSceneBuilders] = useState<NotionResultForCard[]>([]);
  const [filteredData, setFilteredData] = useState(sceneBuilders);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(SCENE_EXPERT_TAB_STATE_ALL);

  useEffect(() => {
    (async () => {
      const sceneProv = await getSceneProviders();

      console.log({ sceneProv });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = sceneProv.results.map((i: any) => transformSceneProviderForCard(i));
      setSceneBuilders(data);
      setLoading(false);
    })();
  }, [tab]);

  const individualBuilders = sceneBuilders?.filter((i) => i.builderType === 'Individual');
  const studioBuilders = sceneBuilders?.filter((i) => i.builderType === 'Studio');

  useEffect(() => {
    if (tab === SCENE_EXPERT_TAB_STATE_INDIVIDUAL && individualBuilders !== undefined) {
      setFilteredData(individualBuilders);
    } else if (tab === SCENE_EXPERT_TAB_STATE_STUDIO && studioBuilders !== undefined) {
      setFilteredData(studioBuilders);
    } else {
      setFilteredData(sceneBuilders);
    }
  }, [tab, sceneBuilders]);

  return (
    <Grid className="content-container">
      <SceneExpertHeading />
      <TabContext value={tab}>
        <SceneExpertTabs setTab={setTab} />
        {loading ? (
          <Grid container spacing={4} rowSpacing={4} columnSpacing={4}>
            {[1, 2, 3, 4].map((i) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={i}>
                <CardLoaderSkeleton key={i} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={4} rowSpacing={4} columnSpacing={4}>
            {sceneBuilders.length &&
              filteredData.map((builder) => (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={builder.builderName}>
                  <SceneExpertCard builder={builder} />
                </Grid>
              ))}
          </Grid>
        )}
      </TabContext>
    </Grid>
  );
};

export default SceneExpertView;
