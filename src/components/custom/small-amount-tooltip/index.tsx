import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import BigNumber from 'bignumber.js';

import { Tooltip } from 'components/custom/tooltip';

import { formatBigNumber } from 'utils';

interface ISmallAmountTooltip {
  amount: BigNumber;
  symbol?: string;
  className?: string;
  icon?: ReactElement;
}

const SmallAmountTooltip: React.FC<ISmallAmountTooltip> = ({ amount, symbol, className, icon }) => {
  const symbolNoSpace = ['$'];
  const formattedAmount = formatBigNumber(amount);
  const isExponential = amount.lt(1e-6);

  return isExponential ? (
    <Tooltip
      placement="top"
      target={
        <span className={className}>
          {icon || symbol}
          {'  '}
          {formattedAmount}
        </span>
      }
    >
      {amount.toFixed()}
    </Tooltip>
  ) : (
    <Box component="span" textAlign="start" overflow="hidden" width={1} className={className}>
      {icon || symbol}
      {!symbolNoSpace.find((s) => s === symbol) ? '  ' : ''}
      <Typography display="block" variant="inherit" noWrap component="span">
        {formattedAmount}
      </Typography>
    </Box>
  );
};

export default SmallAmountTooltip;
