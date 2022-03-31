import { FC, useEffect, useState } from 'react';

import { useNotion } from 'api/notion/client';
import { Grid } from 'design-system';
import SceneExpertHeading from 'modules/land-works/components/land-works-scene-experts-heading';
import SceneExpertCard from 'modules/land-works/components/scene-expert-card';

import { NotionResult, NotionResultForCard } from 'modules/land-works/components/scene-expert-card/types';

const transformSceneProvider = (notionEntity: NotionResult) => {
  return {
    coverPhotoLink: notionEntity.properties['Cover Photo'].files[0].file.url,
    avatarPhotoLink: notionEntity.properties['Profile Picture'].files[0].file.url,
    builderName: notionEntity.properties['Scene Builder Name'].title[0].plain_text,
    definition: notionEntity.properties.Definition.rich_text[0].plain_text,
    builderType: notionEntity.properties.Type.select.name,
    shortDescription: notionEntity.properties['Short Description'].rich_text[0].plain_text,
    location: notionEntity.properties.Location.rich_text[0].plain_text,
    price: notionEntity.properties.Price.select.name,
  };
};

const SceneExpertView: FC = () => {
  const { getSceneProviders } = useNotion();
  const [sceneBuilders, setSceneBuilders] = useState<NotionResultForCard[]>([]);

  useEffect(() => {
    (async () => {
      console.log('in useEffect');
      const sceneProv = await getSceneProviders();
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
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
              <SceneExpertCard builder={builder} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default SceneExpertView;
