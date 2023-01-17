import React, { FC, useState } from 'react';
import { Collapse } from '@mui/material';

import { Box, Button, IconButton, Typography } from 'design-system';
import { CloseIcon } from 'design-system/icons';

import { THEME_COLORS } from 'themes/theme-constants';

const IS_AGITATION_BAR_HIDDEN_STORAGE_KEY = 'is-agitation-bar-hidden';

export const HeaderAgitaionBar: FC = () => {
  const [show, setShow] = useState(() => !sessionStorage.getItem(IS_AGITATION_BAR_HIDDEN_STORAGE_KEY));

  const handleCloseButtonClick = () => {
    setShow(false);
    sessionStorage.setItem(IS_AGITATION_BAR_HIDDEN_STORAGE_KEY, '1');
  };

  return (
    <Collapse unmountOnExit mountOnEnter in={show}>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        py={{ xs: 3, lg: 2 }}
        px={{ xs: 3, lg: 15 }}
        bgcolor={THEME_COLORS.accentBlue}
      >
        <Typography
          variant="button"
          component="p"
          fontSize={{ xs: 12, lg: 14 }}
          lineHeight={{ xs: '18px', lg: '21px' }}
        >
          We have partnered up with PrecisionX to bring an additional layer of monetization for landlords!
        </Typography>
        <Button
          sx={{
            mr: 6,
            flexShrink: 0,
          }}
          variant="primary"
          btnSize="xsmall"
          // TODO: add click handler
        >
          Read more
        </Button>

        <IconButton
          sx={{
            ml: 'auto',
            color: `${THEME_COLORS.accentBlue} !primary`,
          }}
          variant="circular"
          btnSize="small"
          icon={<CloseIcon />}
          colorVariant="light"
          onClick={handleCloseButtonClick}
        />
      </Box>
    </Collapse>
  );
};
