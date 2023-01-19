import React from 'react';
import { Box } from '@mui/material';

import { ReactComponent as ClockIcon } from 'assets/icons/clock-01.svg';
import { ReactComponent as CoinUnbrokenIcon } from 'assets/icons/coin-unbroken.svg';
import { ReactComponent as EyeOpenIcon } from 'assets/icons/eye-open.svg';
import { ReactComponent as ShieldIcon } from 'assets/icons/shield-01.svg';
import blurredLightsImgSrc from 'assets/img/advantages-blurred-lights.png';
import exploreScreenImgSrc from 'assets/img/advantages-explore-screen.png';
import AdaptiveTypography from 'components/custom/adaptive-typography';
import Image from 'components/custom/image';
import { Grid, Typography } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

const cards = [
  {
    title: 'Affordability',
    description: 'Rent land in the Metaverse for as low as $2 per day!',
    Icon: CoinUnbrokenIcon,
  },
  {
    title: 'Security',
    description: 'Audited three times and battle-tested by more than 300 rents.',
    Icon: ShieldIcon,
  },
  {
    title: 'Trustless',
    description: 'Decentralized renting. No middleman. No hassle.',
    Icon: EyeOpenIcon,
  },
  {
    title: 'Flexibility',
    description: 'Rent for as short as a day to host an event or as long as an year!',
    Icon: ClockIcon,
  },
];

export const Advantages: React.FC = () => {
  return (
    <Box id="why" className="content-container why" py={{ xs: 10, lg: 20 }}>
      <AdaptiveTypography textAlign="center" variant="h2" mb={8}>
        Advantages of Renting
      </AdaptiveTypography>

      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt={{ xs: 8, sm: 16 }}
        pb={{ xs: 8, sm: 28 }}
      >
        <Box position="absolute" width={1} height={1} display="flex" alignItems="center" justifyContent="center">
          <Image src={blurredLightsImgSrc} width={2596} height={1798} sx={{ width: 1 }} />
        </Box>
        <Image
          src={exploreScreenImgSrc}
          width={1440}
          height={1024}
          sx={{
            borderRadius: '30px',
            border: '5px solid #27273A',
            bgcolor: '#27273A',
            width: 1,
            maxWidth: 740,
            filter: 'drop-shadow(0px 0px 80px #040D1E)',
          }}
        />
      </Box>

      <Grid container rowSpacing={{ xs: 5, lg: 8 }} columnSpacing={18} justifyContent="space-around">
        {cards.map(({ title, description, Icon }) => {
          return (
            <Grid key={title} item xs={12} lg={6} display="flex" gap={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexShrink={0}
                borderRadius="15px"
                border="2px solid #27273A"
                width={{ xs: 60, lg: 80 }}
                height={{ xs: 60, lg: 80 }}
                color={THEME_COLORS.light}
              >
                <Icon />
              </Box>
              <Box>
                <Typography variant="h4" component="p" mb={1}>
                  {title}
                </Typography>
                <Typography>{description}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
