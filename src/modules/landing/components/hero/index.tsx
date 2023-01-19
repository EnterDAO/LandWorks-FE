import React from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material';

//eslint-disable-next-line
//@ts-ignore
import animationVideoHvc from 'assets/home-hero-animation.mov';
//eslint-disable-next-line
//@ts-ignore
import animationVideoWebm from 'assets/home-hero-animation.webm';
import decentralandLogoImgSrc from 'assets/img/decentraland-logo.png';
import backgroundImgSrc from 'assets/img/hero_main.svg';
import { ReactComponent as QuantStampLogo } from 'assets/img/quantstamp-logo.svg';
import { ReactComponent as QuantStamp } from 'assets/img/quantstamp.svg';
import { ReactComponent as TrianglesIcon } from 'assets/img/triangles-icon.svg';
import voxelsLogoImgSrc from 'assets/img/voxels-logo.png';
import Typography from 'components/common/Typography';
import AdaptiveTypography from 'components/custom/adaptive-typography';
import Chip from 'components/custom/chip';
import Image from 'components/custom/image';
import { Box, Button, Grid } from 'design-system';
import { useStickyOffset } from 'providers/sticky-offset-provider';
import { APP_ROUTES } from 'router/routes';

import './index.scss';

const SponsorLink = styled('a')({
  display: 'inline-flex',
  alignItems: 'center',
  filter: 'grayscale(1)',
  transition: 'all 0.15s',
  willChange: 'transform',
  ':hover': {
    transform: 'scale(1.05)',
    filter: 'grayscale(0)',
  },
});

export const Hero: React.FC = () => {
  const stickyOffset = useStickyOffset();
  const history = useHistory();

  return (
    <Box
      p={{ xs: '95px 0 50px', lg: 10 }}
      position="relative"
      display="flex"
      alignItems="center"
      minHeight={{ lg: `calc(100vh - ${stickyOffset.offsets.header}px)` }}
    >
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
      <Box position="relative" className="content-container" py={0}>
        <Grid container position="relative" mb={{ xs: 12, xl: 15 }}>
          <Grid item xs={12} lg={6}>
            <Chip icon={<TrianglesIcon />}>METAVERSE LAND RENTING MARKETPLACE</Chip>

            <AdaptiveTypography variant="h1" mt={4} mb={{ xs: 3, xl: 2 }}>
              <Typography variant="inherit" component="span" color="gradient" mb="4px">
                Renting Land
              </Typography>
              <br />
              never worked So Well
            </AdaptiveTypography>

            <Typography maxWidth={410} mb={{ xs: 6, xl: 12 }}>
              LandWorks is a community-owned protocol connecting web3 Metaverse landlords and tenants in a secure and
              decentralized manner.
            </Typography>

            <Button
              variant="gradient"
              btnSize="medium"
              onClick={() => {
                history.push(APP_ROUTES.explore);
              }}
            >
              Enter App
            </Button>
          </Grid>
          <Grid item display={{ xs: 'none', lg: 'block' }} lg={8} xl={7} position="absolute" right={0} top={0}>
            <Box
              component="video"
              autoPlay
              width={1}
              loop
              muted
              playsInline
              sx={{
                transform: 'translate(27%, -10%)',
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
            <Box
              display="flex"
              columnGap={2}
              rowGap={3}
              alignItems={{ xs: 'center', sm: 'flex-start' }}
              flexDirection={{ xs: 'row', sm: 'column' }}
            >
              <Typography>Audited by</Typography>

              <SponsorLink
                href="https://github.com/EnterDAO/LandWorks-protocol/blob/main/audits/2022-03-Quantstamp.pdf"
                target="_blank"
              >
                <QuantStampLogo />
              </SponsorLink>
            </Box>
          </Box>

          <Box
            display="flex"
            columnGap={2}
            rowGap={3}
            alignItems={{ xs: 'center', sm: 'flex-start' }}
            flexDirection={{ xs: 'row', sm: 'column' }}
          >
            <Typography flexBasis={{ xs: 'min-content', sm: 'auto' }}>Supported Metaverses</Typography>
            <Box display="flex" gap={{ xs: 4, sm: 8 }}>
              <SponsorLink href="https://www.voxels.com" target="_blank">
                <Image src={voxelsLogoImgSrc} alt="Voxels" sx={{ maxWidth: 45 }} />
              </SponsorLink>
              <SponsorLink href="https://decentraland.org" target="_blank">
                <Image src={decentralandLogoImgSrc} alt="Decentraland" sx={{ maxWidth: 176 }} />
              </SponsorLink>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
