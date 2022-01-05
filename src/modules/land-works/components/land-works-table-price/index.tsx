import React, { useEffect, useState } from 'react';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';
import { StringNullableChain } from 'lodash';

import { convertTokenInUSD, getTokenPriceForDate } from 'components/providers/known-tokens-provider';
import { timestampSecondsToDate } from 'helpers/helpers';

interface ILandTablePriceProps {
  tokenSymbol: string;
  tokenDecimals: number;
  weiAmount: number;
  dateTimestamp: string;
}

const LandTablePrice: React.FC<ILandTablePriceProps> = ({ tokenSymbol, tokenDecimals, weiAmount, dateTimestamp }) => {
  const coingeckoApiDateFormat = 'dd-MM-yyyy';
  const [formatedAmount, setFormattedAmount] = useState('0');
  const [usdPrice, setUsdPrice] = useState('0');

  useEffect(() => {
    getTokenPrice();
  }, []);

  const getTokenPrice = async () => {
    const date = timestampSecondsToDate(dateTimestamp, coingeckoApiDateFormat);
    const formatedAmount = new BigNumber(ethers.utils.formatUnits(weiAmount, tokenDecimals));
    const usdEthPrice = await getTokenPriceForDate(tokenSymbol, date);
    const usdPrice = formatedAmount.multipliedBy(usdEthPrice);
    setUsdPrice(usdPrice.toFixed());
    setFormattedAmount(formatedAmount.toFixed());
  };

  return (
    <span>
      {tokenSymbol.toUpperCase()} {formatedAmount} ${usdPrice}
    </span>
  );
};

export default LandTablePrice;
