import React, { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';

import TokenIcon from 'components/custom/token-icon';

import { formatBigNumber } from 'utils';

import { THEME_COLORS } from 'themes/theme-constants';

interface ClaimRewardsModalTotalProps {
  items: {
    paymentToken: { symbol: string };
    total?: BigNumber;
  }[];
}

const ClaimRewardsModalTotal: FC<ClaimRewardsModalTotalProps> = ({ items }: ClaimRewardsModalTotalProps) => {
  return (
    <Stack borderRadius="10px" bgcolor="var(--theme-grey200-color)" alignItems="center" p={3}>
      <Typography component="p" variant="caption" color={THEME_COLORS.grey03} mb={2}>
        TOTAL TO CLAIM
      </Typography>

      <Box display="flex" gap={6}>
        {items.map(({ paymentToken, total }) => {
          return (
            <Typography component="span" variant="h4" display="flex" alignItems="center">
              <TokenIcon name={paymentToken.symbol} size={20} sx={{ mr: 1 }} />
              {total ? `${formatBigNumber(total)} ${paymentToken.symbol}` : '-'}
            </Typography>
          );
        })}
      </Box>
    </Stack>
  );
};

export default ClaimRewardsModalTotal;
