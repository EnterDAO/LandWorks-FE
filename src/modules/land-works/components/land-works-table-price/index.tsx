import React from 'react';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';
import useSWR from 'swr';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
import { getTokenIconName, timestampSecondsToUTCDate } from 'helpers/helpers';
import { getTokenPriceForDate } from 'providers/known-tokens-provider';

import './index.scss';

interface ILandTablePriceProps {
  tokenSymbol: string;
  tokenDecimals: number;
  weiAmount: string;
  dateTimestamp: string;
}

const fetchTokenUsdPrice = async (tokenSymbol: string, timestamp: string) => {
  if (tokenSymbol.toLowerCase() === 'usdc') {
    return 1;
  }

  const date = timestampSecondsToUTCDate(timestamp, 'dd-MM-yyyy');
  const usdPrice = await getTokenPriceForDate(tokenSymbol, date);

  return usdPrice;
};

const LandTablePrice: React.FC<ILandTablePriceProps> = ({ tokenSymbol, tokenDecimals, weiAmount, dateTimestamp }) => {
  const { data: usdPrice } = useSWR([tokenSymbol, dateTimestamp], fetchTokenUsdPrice);
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
