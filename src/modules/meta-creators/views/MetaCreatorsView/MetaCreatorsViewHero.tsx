import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material';

import heroImgSrc from 'assets/img/meta-creators-hero.png';
import Typography from 'components/common/Typography';
import Container from 'components/custom/container';
import Image from 'components/custom/image';
import { Button } from 'design-system';
import { useStickyOffset } from 'providers/sticky-offset-provider';
import { APP_ROUTES, LANDING_ROUTES, useIsAppRoute } from 'router/routes';

import { META_CREATORS_VIEW_CREATORS_SECTION_ID } from './MetaCreatorsViewCreators';

const MetaCreatorsViewHero = () => {
  const history = useHistory();
  const isAppRoute = useIsAppRoute();
  const stickyOffset = useStickyOffset();

  const handleExploreCreatorsButtonClick = () => {
    const section = document.getElementById(META_CREATORS_VIEW_CREATORS_SECTION_ID);

    if (section) {
      section.scrollIntoView();
    }
  };

  const handleBecomeCreatorButtonClick = () => {
    history.push({
      pathname: isAppRoute ? APP_ROUTES.metaCreatorsJoin : LANDING_ROUTES.metaCreatorsJoin,
      state: { from: window.location.pathname, title: 'MetaCreators' },
    });
  };

  return (
    <Container
      pt={16}
      pb={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      minHeight={`calc(100vh - ${stickyOffset.offsets.header}px)`}
      sx={{
        '@media (max-width: 600px)': {
          pt: 10,
        },
      }}
    >
      <Typography variant="h1" maxWidth={832} mt="auto" mb={6} fontSize={{ xs: 30, lg: 40 }}>
        Deliver your stunning Metaverse project with the help of industry experts
      </Typography>
      <Typography variant="subtitle1" mb={6}>
        A place to find professional help for the next big thing in the Metaverse!
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        gap={3}
        mb="auto"
        sx={{
          '@media (max-width: 600px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Button variant="secondary" btnSize="medium" onClick={handleExploreCreatorsButtonClick}>
          Explore Creators
        </Button>
        <Button variant="gradient" btnSize="medium" onClick={handleBecomeCreatorButtonClick}>
          Become a Creator
        </Button>
      </Box>
      <Image
        src={heroImgSrc}
        width={1772}
        height={940}
        sx={{ maxWidth: 886, width: 1, mt: 6, '@media (max-width: 600px)': { display: 'none' } }}
      />
    </Container>
  );
};

export default MetaCreatorsViewHero;
