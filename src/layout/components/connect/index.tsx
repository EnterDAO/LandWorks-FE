import React from 'react';
import { useMediaQuery } from '@mui/material';

import { ReactComponent as NewsIcon } from 'assets/img/news-icon.svg';
import Chip from 'components/custom/chip';
import config from 'config';
import { Box, Button, Icon, Typography } from 'design-system';
import { ArrowRightIcon } from 'design-system/icons';
import { StyledForm, StyledInput } from 'layout/components/connect/styled';

export const Connect: React.FC = () => {
  const isTable = useMediaQuery('(min-width: 768px)');

  return (
    <Box pt={{ xs: 10, xl: 20 }} pb={{ xs: 20, md: 8 }} className="content-container">
      <Box maxWidth={550} mx="auto">
        <Chip icon={<NewsIcon />}>STAY UP TO DATE</Chip>
        <Typography variant="h4" component="p" mt={4} mb={1}>
          Receive Latest Updates
        </Typography>
        <Typography mb={6}>
          We often update LandWorks with whole new features, that’s why subcribe to be the first to receive the latest
          updates.
        </Typography>

        <StyledForm action={config.mailchimp.url} method="POST" target="_blank">
          <input type="hidden" name="u" value={config.mailchimp.u} />
          <input type="hidden" name="id" value={config.mailchimp.id} />
          <StyledInput
            placeholder="Enter your email"
            type="email"
            name="EMAIL"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
          />
          {isTable ? (
            <Button btnSize="medium" variant="gradient" type="submit">
              notify me
            </Button>
          ) : (
            <Button
              sx={{
                minWidth: '52px !important',
                p: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                span: {
                  display: 'flex',
                },
              }}
              btnSize="medium"
              variant="gradient"
              type="submit"
            >
              <Icon iconElement={<ArrowRightIcon />} iconSize="m" />
            </Button>
          )}
        </StyledForm>
      </Box>
    </Box>
  );
};
