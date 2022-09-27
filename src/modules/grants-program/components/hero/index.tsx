import React, { FC } from 'react';

import heroImage from 'assets/img/grandProgramHero.png';
import { Box, Button, Grid, Typography } from 'design-system';
import { useStickyOffset } from 'providers/sticky-offset-provider';

import { GRADIENT_TEXT, THEME_COLORS } from 'themes/theme-constants';

export const Hero: FC = () => {
  const stickyOffset = useStickyOffset();

  return (
    <Grid
      container
      p={{ xs: '20px 0 60px 0', lg: '50px 0' }}
      minHeight={`calc(100vh - ${stickyOffset.offsets.header}px)`}
      alignItems="center"
    >
      <Grid display="flex" alignItems="center" justifyContent="center" item xs={12} lg={6}>
        <Box component="img" maxWidth={540} width={1} src={heroImage} sx={{ transform: { lg: 'scale(1.35)' } }} />
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
            Bringing creators to the metaverse economy is a fundamental piece to the growth of LandWorks and EnterDAO.
            As we empower more artists, we will in turn grow as well and increase our reach and potential to make
            further impact.
            <br />
            <br />
            That’s why we are introducing the first iteration of LandWork’s Open Scene Grant Program.
            <br />
            <br />
            <Typography fontWeight={700} color={THEME_COLORS.light} variant="inherit" component="span">
              We’ve concluded the grant program by awarding more than $50K. Check out the winning scenes!
            </Typography>
          </Typography>

          <Button
            onClick={() => window.open('https://github.com/EnterDAO/landworks-grants-program', '_blank')}
            variant="gradient"
            btnSize="medium"
          >
            Browse scenes
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
