import React, { useEffect, useState } from 'react';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';
import { StringNullableChain } from 'lodash';

import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { getTokenPriceForDate } from 'components/providers/known-tokens-provider';
import { timestampSecondsToUTCDate } from 'helpers/helpers';

interface ILandTablePriceProps {
  tokenSymbol: string;
  tokenDecimals: number;
  weiAmount: string;
  dateTimestamp: string;
}

const LandTablePrice: React.FC<ILandTablePriceProps> = ({ tokenSymbol, tokenDecimals, weiAmount, dateTimestamp }) => {
  const coingeckoApiDateFormat = 'dd-MM-yyyy';
  const [formatedAmount, setFormattedAmount] = useState(new BigNumber(0));
  const [usdPrice, setUsdPrice] = useState(new BigNumber(0));

  useEffect(() => {
    getTokenPrice();
  }, []);

  const getTokenPrice = async () => {
    const date = timestampSecondsToUTCDate(dateTimestamp, coingeckoApiDateFormat);
    const ethAmount = ethers.utils.formatUnits(weiAmount, tokenDecimals);
    const formatedAmount = new BigNumber(ethAmount);
    setFormattedAmount(formatedAmount);

    if (tokenSymbol.toLowerCase() === 'usdc') {
      setUsdPrice(formatedAmount);
    } else {
      const usdEthPrice = await getTokenPriceForDate(tokenSymbol, date);
      const usdPrice = formatedAmount.multipliedBy(usdEthPrice);
      setUsdPrice(usdPrice);
    }
  };

  return (
    <span>
      <SmallAmountTooltip symbol={tokenSymbol.toUpperCase()} amount={formatedAmount} />
      {'  '}
      <SmallAmountTooltip symbol="$" amount={usdPrice} />
    </span>
  );
};

export default LandTablePrice;
