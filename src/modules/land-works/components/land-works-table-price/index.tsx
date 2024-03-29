import React from 'react';
import { BigNumber } from 'bignumber.js';
import { fromUnixTime } from 'date-fns';
import { ethers } from 'ethers';
import useSWRImmutable from 'swr/immutable';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
import { getTokenIconName } from 'helpers/helpers';
import { getTokenPriceForDate } from 'providers/known-tokens-provider';

import './index.scss';

interface ILandTablePriceProps {
  tokenSymbol: string;
  tokenDecimals: number;
  weiAmount: string;
  dateTimestamp: string;
}

const useGetTokenPriceInUsd = (tokenSymbol: string, timestamp: string) => {
  const localDate = fromUnixTime(+timestamp);
  const utcYear = localDate.getUTCFullYear();
  const utcFormattedDay = `${localDate.getUTCDate()}`.padStart(2, '0');
  const utcFormattedMonth = `${localDate.getUTCMonth() + 1}`.padStart(2, '0');
  const utcFormattedDate = `${utcFormattedDay}-${utcFormattedMonth}-${utcYear}`;

  return useSWRImmutable([tokenSymbol, utcFormattedDate], getTokenPriceForDate);
};

const LandTablePrice: React.FC<ILandTablePriceProps> = ({ tokenSymbol, tokenDecimals, weiAmount, dateTimestamp }) => {
  const { data: usdPrice } = useGetTokenPriceInUsd(tokenSymbol, dateTimestamp);
  const amount = new BigNumber(ethers.utils.formatUnits(weiAmount, tokenDecimals));
  const priceInUsd = usdPrice ? amount.multipliedBy(usdPrice) : null;

  return (
    <span className="amount-container">
      <SmallAmountTooltip
        className="amount-text"
        icon={<Icon style={{ width: 16, height: 16 }} name={getTokenIconName(tokenSymbol)} />}
        amount={amount}
      />

      {priceInUsd ? (
        <SmallAmountTooltip className="usd-price" symbol="$" amount={priceInUsd} />
      ) : (
        <span className="usd-price">-</span>
      )}
    </span>
  );
};

export default LandTablePrice;
