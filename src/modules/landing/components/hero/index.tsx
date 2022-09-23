import React from 'react';
import { Link, useHistory } from 'react-router-dom';

//eslint-disable-next-line
//@ts-ignore
import animationVideoHvc from 'assets/home-hero-animation.mov';
//eslint-disable-next-line
//@ts-ignore         
import animationVideoWebm from 'assets/home-hero-animation.webm';
import { ReactComponent as DecentralandLogo } from 'assets/img/decentraland-logo.svg';
import { ReactComponent as Background } from 'assets/img/hero_main.svg';
import backgroundImgSrc from 'assets/img/hero_main.svg';
import { ReactComponent as Metaverse } from 'assets/img/hero_tag.svg';
import { ReactComponent as Partners } from 'assets/img/partners.svg';
import { ReactComponent as QuantStampLogo } from 'assets/img/quantstamp-logo.svg';
import { ReactComponent as QuantStamp } from 'assets/img/quantstamp.svg';
import { ReactComponent as VoxelsLogo } from 'assets/img/voxels-logo.svg';
import { Box, Button, Grid, Typography } from 'design-system';
import { routes } from 'router/routes';

import { GRADIENT_TEXT } from 'themes/theme-constants';

import './index.scss';

export const Hero: React.FC = () => {
  const history = useHistory();

  return (
    <Box pt={{ xs: '95px', xl: '195px' }} pb={{ xs: 10, xl: '95px' }} position="relative">
      <Box
        component="img"
        src={backgroundImgSrc}
        position="absolute"
        top={0}
        bottom={0}
        right={0}
        left={0}
        width={1}
        margin="auto"
        sx={{ objectFit: 'cover', pointerEvents: 'none' }}
      />
      <Box className="content-container" py={0}>
        <Grid container mb={15}>
          <Grid item xs={12} lg={4} xl={5}>
            <Metaverse />

            <Typography variant="h1" mt={4} mb={2}>
              <Typography variant="inherit" component="span" sx={GRADIENT_TEXT} mb="4px">
                Renting Land
              </Typography>
              <br />
              Never Worked so well
            </Typography>

            <Typography maxWidth={410} mb={12}>
              LandWorks is a community-owned Marketplace for renting Web3 Metaverse Land, governed by EnterDAO and the
              ENTR token.
            </Typography>

            <Button variant="gradient" btnSize="medium" onClick={() => history.push(routes.explore)}>
              Explore
            </Button>
          </Grid>
          <Grid item display={{ xs: 'none', lg: 'block' }} lg={8} xl={7} position="relative">
            <Box
              component="video"
              autoPlay
              width={1}
              loop
              muted
              playsInline
              position="absolute"
              top={0}
              right={0}
              bottom={0}
              left={0}
              sx={{
                transform: 'translate(19%, -10%)',
              }}
            >
              <source src={animationVideoHvc} type="video/mp4;codecs=hvc1" />
              <source src={animationVideoWebm} type="video/webm" />
              Sorry, your browser doesn't support embedded videos.
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" alignItems="center" rowGap={4} columnGap={16} flexWrap="wrap">
          <Box display="flex" alignItems="center" gap={4}>
            <Box display={{ xs: 'none', md: 'block' }}>
              <QuantStamp />
            </Box>
            <Box display="flex" columnGap={2} flexWrap="wrap" flexDirection={{ xs: 'row', sm: 'column' }}>
              <Typography mb={3}>Audited by</Typography>
              <QuantStampLogo />
            </Box>
          </Box>

          <Box display="flex" columnGap={2} flexWrap="wrap" flexDirection={{ xs: 'row', sm: 'column' }}>
            <Typography mb={3}>Supported Metaverses</Typography>
            <Box display="flex" gap={{ xs: 4, sm: 8 }}>
              <VoxelsLogo height={31} />
              <DecentralandLogo />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
