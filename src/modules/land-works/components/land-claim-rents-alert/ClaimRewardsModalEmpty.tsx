import React, { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { ReactComponent as EmptyWalletIcon } from 'assets/icons/empty-wallet.svg';

const ClaimRewardsModalEmpty: FC = () => {
  return (
    <Stack m="auto" alignItems="center">
      <Box color="var(--theme-light-color)" display="flex" mb={3}>
        <EmptyWalletIcon />
      </Box>

      <Typography component="p" fontWeight={600} variant="subtitle1">
        Nothing to Claim
      </Typography>
    </Stack>
  );
};

export default ClaimRewardsModalEmpty;
