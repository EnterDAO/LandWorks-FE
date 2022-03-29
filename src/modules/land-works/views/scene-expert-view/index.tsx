import { FC, useEffect, useState } from 'react';
import { SCENE_EXPERT_TAB_STATE_ALL } from 'constants/modules';
import TabContext from '@mui/lab/TabContext';

import { Button, Grid } from 'design-system';

import { TypographyStyled } from './styled';

const SceneExpertView: FC = () => {
  const [tab, setTab] = useState(SCENE_EXPERT_TAB_STATE_ALL);
  return (
    <Grid className="content-container">
      <TypographyStyled variant="h1">Find Scene Expert for Your Land or Become One</TypographyStyled>
      <TypographyStyled variant="h4" marginTop="10px">
        A place to find experts and professionals in developoing 3D metaverse assets.
      </TypographyStyled>
      <Grid justifyContent="center" display='flex' mt={'30px'} columnGap={3}>
        <Button variant="secondary" btnSize="medium">
          Explore Experts
        </Button>
        <Button variant="gradient" btnSize="medium">
          Join Experts
        </Button>
      </Grid>

      <TabContext value={tab}>{/* <div className="content-container"></div> */}</TabContext>
    </Grid>
  );
};

export default SceneExpertView;
