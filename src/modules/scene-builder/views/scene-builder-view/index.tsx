import { FC, useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';

import { useNotion } from 'api/notion/client';
import { Grid } from 'design-system';
import useWindowDimensions from 'hooks/useWindowDimensions';
import SceneBuilderHeading from 'modules/scene-builder/components/land-works-scene-builders-heading';
import SceneBuilderCard from 'modules/scene-builder/components/scene-builder-card';
import CardLoaderSkeleton from 'modules/scene-builder/components/scene-builder-card/card-loader-skeleton';
import SceneBuilderTabs from 'modules/scene-builder/components/scene-builder-tabs';

import { transformSceneProviderForCard } from 'modules/scene-builder/utils';

import {
  SCENE_BUILDER_TAB_STATE_ALL,
  SCENE_BUILDER_TAB_STATE_INDIVIDUAL,
  SCENE_BUILDER_TAB_STATE_STUDIO,
} from 'modules/scene-builder/constants';

import { NotionResultForCard } from 'modules/scene-builder/components/scene-builder-card/types';

const SceneBuilderView: FC = () => {
  const { getSceneProviders } = useNotion();
  const [sceneBuilders, setSceneBuilders] = useState<NotionResultForCard[]>([]);
  const [filteredData, setFilteredData] = useState(sceneBuilders);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(SCENE_BUILDER_TAB_STATE_ALL);
  const { height } = useWindowDimensions();

  const scrollToDiv = () => {
    window.scrollTo({
      top: height - 90,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    (async () => {
      const sceneProv = await getSceneProviders();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = sceneProv.results.map((i: any) => transformSceneProviderForCard(i));
      setSceneBuilders(data);
      setLoading(false);
    })();
  }, [tab]);

  const individualBuilders = sceneBuilders?.filter((i) => i.builderType === 'Individual');
  const studioBuilders = sceneBuilders?.filter((i) => i.builderType === 'Studio');

  useEffect(() => {
    if (tab === SCENE_BUILDER_TAB_STATE_INDIVIDUAL && individualBuilders !== undefined) {
      setFilteredData(individualBuilders);
    } else if (tab === SCENE_BUILDER_TAB_STATE_STUDIO && studioBuilders !== undefined) {
      setFilteredData(studioBuilders);
    } else {
      setFilteredData(sceneBuilders);
    }
  }, [tab, sceneBuilders]);

  return (
    <Grid
      className="content-container"
      style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 700ms ease' }}
    >
      <SceneBuilderHeading navigateToBuilders={() => scrollToDiv()} />
      <TabContext value={tab}>
        <SceneBuilderTabs setTab={setTab} />
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
                  <SceneBuilderCard builder={builder} />
                </Grid>
              ))}
          </Grid>
        )}
      </TabContext>
    </Grid>
  );
};

export default SceneBuilderView;
