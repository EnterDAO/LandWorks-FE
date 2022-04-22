import React, { ReactElement } from 'react';
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
    <span className={className}>
      {icon || symbol}
      {!symbolNoSpace.find((s) => s === symbol) ? '  ' : ''}
      {formattedAmount}
    </span>
  );
};

export default SmallAmountTooltip;
