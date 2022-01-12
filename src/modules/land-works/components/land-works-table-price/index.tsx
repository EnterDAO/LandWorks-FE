import React, { useEffect, useState } from 'react';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';
import { StringNullableChain } from 'lodash';

import { convertTokenInUSD, getTokenPriceForDate } from 'components/providers/known-tokens-provider';
import { timestampSecondsToDate } from 'helpers/helpers';

import { formatBigNumber } from '../../../../utils';

interface ILandTablePriceProps {
  tokenSymbol: string;
  tokenDecimals: number;
  weiAmount: number;
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
    const date = timestampSecondsToDate(dateTimestamp, coingeckoApiDateFormat);
    const formatedAmount = new BigNumber(ethers.utils.formatUnits(weiAmount, tokenDecimals));
    const usdEthPrice = await getTokenPriceForDate(tokenSymbol, date);
    const usdPrice = formatedAmount.multipliedBy(usdEthPrice);
    setUsdPrice(usdPrice);
    setFormattedAmount(formatedAmount);
  };

  return (
    <span>
      {tokenSymbol.toUpperCase()} {formatBigNumber(formatedAmount)} ${formatBigNumber(usdPrice)}
    </span>
  );
};

export default LandTablePrice;
