import React from 'react';
import { Tooltip } from 'antd';
import BigNumber from 'bignumber.js';

import { formatBigNumber } from 'utils';

interface ISmallAmountTooltip {
  amount: BigNumber;
  symbol?: string;
  className?: string;
  icon?: any;
}
const SmallAmountTooltip: React.FC<ISmallAmountTooltip> = ({ amount, symbol, className, icon }) => {
  const symbolNoSpace = ['$'];
  const formattedAmount = formatBigNumber(amount);
  const isExponential = amount.lt(1e-6);

  return isExponential ? (
    <Tooltip color={'#5d8ff0'} title={amount.toFixed()}>
      <span className={className}>
        {icon || symbol}
        {'  '}
        {formattedAmount}
      </span>
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
