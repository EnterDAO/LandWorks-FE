import React from 'react';
import { Tooltip } from 'antd';
import BigNumber from 'bignumber.js';

import { formatBigNumber } from 'utils';

interface ISmallAmountTooltip {
  amount: BigNumber;
  symbol?: string;
  className?: string;
}
const SmallAmountTooltip: React.FC<ISmallAmountTooltip> = ({ amount, symbol, className }) => {
  const symbolNoSpace = ['$'];
  const formattedAmount = formatBigNumber(amount);
  const isExponential = amount.lt(1e-6);

  return isExponential ? (
    <Tooltip color={'#5d8ff0'} className="amount-tooltip" title={amount.toFixed()}>
      <span className={className}>
        {symbol}
        {'  '}
        {formattedAmount}
      </span>
    </Tooltip>
  ) : (
    <span className={className}>
      {symbol}
      {!symbolNoSpace.find((s) => s === symbol) ? '  ' : ''}
      {formattedAmount}
    </span>
  );
};

export default SmallAmountTooltip;
