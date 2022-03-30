import { FC } from 'react';

import { Grid } from 'design-system';
import SceneExpertHeading from 'modules/land-works/components/land-works-scene-experts-heading';

const SceneExpertView: FC = () => {
  return (
    <Grid className="content-container">
      <SceneExpertHeading />
    </Grid>
  );
};

export default SceneExpertView;
