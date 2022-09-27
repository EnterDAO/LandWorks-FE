import React from 'react';
import { Box } from '@mui/material';

import blurredLightsImgSrc from 'assets/img/advantages-blurred-lights.png';
import exploreScreenImgSrc from 'assets/img/advantages-explore-screen.png';
import { ReactComponent as CirclePlusIcon } from 'assets/img/circle-plus-icon.svg';
import AdaptiveTypography from 'components/custom/adaptive-typography';
import { Grid, Typography } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

const cards = [
  {
    title: 'Affordability',
    description: 'You can rent a land that you cannot afford otherwise.',
  },
  {
    title: 'Accessibility',
    description: 'You can rent a land that otherwise is unavailable to take.',
  },
  {
    title: 'Trust-less',
    description: 'Renting is fully decentralised by utilizing our audited protocol. No middleman. No hassle.',
  },
  {
    title: 'Flexibility',
    description: 'Rent for as short as a day to host an event or as long as an year!',
  },
];

export const Advantages: React.FC = () => {
  return (
    <Box id="why" className="content-container why" py={{ xs: 10, lg: 20 }}>
      <Box textAlign="center">
        <Typography variant="body2" color="var(--theme-accent-color)" mb={2}>
          IS IT FOR YOU?
        </Typography>
        <AdaptiveTypography variant="h2" mb={2}>
          There are a Lot of Opportunities
        </AdaptiveTypography>
        <Typography>You can either lend yours or rent a new Land that you want.</Typography>
      </Box>

      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt={{ xs: 8, sm: 16 }}
        pb={{ xs: 8, sm: 28 }}
      >
        <Box position="absolute" width={1} height={1} display="flex" alignItems="center" justifyContent="center">
          <img src={blurredLightsImgSrc} width={2596} height={1798} style={{ width: '100%', height: 'auto' }} />
        </Box>
        <Box
          border="5px solid #27273A"
          borderRadius="30px"
          overflow="hidden"
          display="flex"
          sx={{ filter: 'drop-shadow(0px 0px 80px #040D1E)' }}
        >
          <img
            src={exploreScreenImgSrc}
            width={1482}
            height={1086}
            style={{ width: '100%', height: 'auto', maxWidth: 740 }}
          />
        </Box>
      </Box>

      <Grid container rowSpacing={{ xs: 5, lg: 8 }} columnSpacing={18} justifyContent="space-around">
        {cards.map(({ title, description }) => {
          return (
            <Grid item xs={12} lg={6} display="flex" gap={3}>
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
                <CirclePlusIcon />
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
