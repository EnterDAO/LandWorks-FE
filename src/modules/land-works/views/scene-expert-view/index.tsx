import { FC } from 'react';

import { Grid } from 'design-system';
import SceneExpertHeading from 'modules/land-works/components/land-works-scene-experts-heading';
import SceneExpertCard from 'modules/land-works/components/scene-expert-card';

const SceneExpertView: FC = () => {
  return (
    <Grid className="content-container">
      <Grid container spacing={4} rowSpacing={4} columnSpacing={4}>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <SceneExpertCard />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <SceneExpertCard />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <SceneExpertCard />
        </Grid>
      </Grid>
      <SceneExpertHeading />
    </Grid>
  );
};

export default SceneExpertView;
