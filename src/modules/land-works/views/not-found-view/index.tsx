import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import notFoundImage from 'assets/404.png';
import { Box, Button, Stack, Typography } from 'design-system';
import { useStickyOffset } from 'providers/sticky-offset-provider';
import { APP_ROUTES } from 'router/routes';

import { THEME_COLORS } from 'themes/theme-constants';

const NotFoundView: FC = () => {
  const stickyOffset = useStickyOffset();
  const history = useHistory();

  return (
    <Stack
      minHeight="100vh"
      display="flex"
      alignItems="center"
      className="content-container"
      justifyContent="center"
      position="relative"
      textAlign="center"
      top={-stickyOffset.offsets.header}
    >
      <Box component="img" width={1} maxWidth={600} src={notFoundImage} />

      <Typography mb={2} variant="h1">
        Error 404 ... Can't find a page to land!
      </Typography>

      <Typography mb={6} color={THEME_COLORS.light} variant="subtitle1">
        Sorry, there is no sign of land here. Travel back to explore page?
      </Typography>

      <Button onClick={() => history.push(APP_ROUTES.explore)} variant="gradient" btnSize="medium">
        Explore now
      </Button>
    </Stack>
  );
};

export default NotFoundView;
