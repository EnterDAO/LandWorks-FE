import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Collapse } from '@mui/material';

import { Box, Button, IconButton, Typography } from 'design-system';
import { CloseIcon } from 'design-system/icons';
import { routes } from 'router/routes';

import { THEME_COLORS } from 'themes/theme-constants';

const IS_AGITATION_BAR_HIDDEN_STORAGE_KEY = 'is-agitation-bar-hidden';

export const HeaderAgitaionBar: FC = () => {
  const [show, setShow] = useState(() => !sessionStorage.getItem(IS_AGITATION_BAR_HIDDEN_STORAGE_KEY));
  const history = useHistory();

  const handleCloseButtonClick = () => {
    setShow(false);
    sessionStorage.setItem(IS_AGITATION_BAR_HIDDEN_STORAGE_KEY, '1');
  };

  return (
    <Collapse unmountOnExit mountOnEnter in={show}>
      <Box bgcolor={THEME_COLORS.accentBlue} display="flex" py={{ xs: 3, lg: 2 }} gap={2} px={{ xs: 3, lg: 15 }}>
        <Typography
          variant="button"
          alignSelf="center"
          component="p"
          fontSize={{ xs: 12, lg: 14 }}
          lineHeight={{ xs: '18px', lg: '21px' }}
        >
          Apply for our Grant Program and win up to $10,000!
        </Typography>
        <Button
          sx={{
            mr: 6,
            flexShrink: 0,
          }}
          variant="primary"
          btnSize="xsmall"
          onClick={() => history.push(routes.grantsProgram)}
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
