import React from 'react';

import heroImage from 'assets/img/grandProgramHero.png';
import { Box, Button, Grid, Typography } from 'design-system';

import { GRADIENT_TEXT, THEME_COLORS } from 'themes/theme-constants';

export const Hero = () => {
  return (
    <Grid pt={{ xs: 4, lg: 20 }} pb={{ xs: 12, lg: 32 }} container display="flex">
      <Grid display="flex" alignItems="center" justifyContent="center" item xs={12} lg={6}>
        <Box component="img" maxWidth={540} width={1} src={heroImage} />
      </Grid>
      <Grid item xs={12} lg={6} order={{ lg: -1 }}>
        <Box maxWidth={540}>
          <Typography
            mb={{ xs: 3, md: 8 }}
            variant="h1"
            sx={{ fontSize: { xs: '25px', md: '60px' }, lineHeight: { xs: '38px', md: '70px' } }}
          >
            Open Scenes
            <br />
            <Typography variant="inherit" component="span" sx={GRADIENT_TEXT}>
              Grant Program
            </Typography>
          </Typography>

          <Typography mb={{ xs: 8, md: 12 }} fontSize={{ xs: 16, md: 'auto' }} component="p" variant="subtitle1">
            Bringing creators to the metaverse economy is a fundamental piece to how Landworks and EnterDAO will grow.
            As we empower more artists, we will in turn grow as well and increase our reach and potential to make
            further impact.
            <br />
            <br />
            <Typography fontWeight={700} color={THEME_COLORS.light} variant="inherit" component="span">
              That’s why we are introducing the first iteration of LandWork’s Open Scene Grant Program.
            </Typography>
          </Typography>

          <Button
            onClick={() => window.open('https://d1zs47v7suw.typeform.com/to/hs05sYCZ')}
            variant="gradient"
            btnSize="medium"
          >
            Apply now
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
