import { FC } from 'react';

import { Box, Button, Grid } from 'design-system';

import landingImage from './assets/scene-expert-landing.png';
import { TypographyStyled } from './styled';

const SceneExpertHeading: FC = () => {
  return (
    <Grid display="flex" flexDirection="column" alignItems="center" justifyContent="space-around" height="80vh">
      <div>
        <TypographyStyled variant="h1">Find Scene Expert for Your Land or Become One</TypographyStyled>
        <TypographyStyled variant="h4" marginTop="10px">
          A place to find experts and professionals in developoing 3D metaverse assets.
        </TypographyStyled>
        <Grid justifyContent="center" display="flex" mt={'30px'} columnGap={3}>
          <Button variant="secondary" btnSize="medium">
            Explore Experts
          </Button>
          <Button variant="gradient" btnSize="medium">
            Join Experts
          </Button>
        </Grid>
      </div>
      <Box
        component="img"
        sx={{
          height: { xs: 300, md: 400, lg: 500 },
          marginTop: '20px',
          maxHeight: '50vh',
        }}
        alt="The property from the offer."
        src={landingImage}
      />
    </Grid>
  );
};

export default SceneExpertHeading;
