import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, Grid } from 'design-system';

import landingImage from './assets/scene-expert-landing.png';
import { TypographyStyled } from './styled';

const SceneExpertHeading: FC = () => {
  const history = useHistory();

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
          <Button
            variant="gradient"
            btnSize="medium"
            onClick={() =>
              history.push({
                pathname: '/join-experts',
                state: { from: window.location.pathname, title: 'Scene Expert' },
              })
            }
          >
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
        alt="Landing image"
        src={landingImage}
      />
    </Grid>
  );
};

export default SceneExpertHeading;
