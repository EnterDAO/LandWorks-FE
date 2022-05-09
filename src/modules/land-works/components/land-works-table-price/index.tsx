import React, { useEffect, useState } from 'react';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';

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
const LandTablePrice: React.FC<ILandTablePriceProps> = ({ tokenSymbol, tokenDecimals, weiAmount, dateTimestamp }) => {
  const coingeckoApiDateFormat = 'dd-MM-yyyy';
  const [formatedAmount, setFormattedAmount] = useState(new BigNumber(0));
  const [usdPrice, setUsdPrice] = useState(new BigNumber(0));

  useEffect(() => {
    getTokenPrice();
    return () => {
      setUsdPrice(new BigNumber(0));
    };
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
    <span className="amount-container">
      <SmallAmountTooltip
        icon={<Icon style={{ width: 16, height: 16 }} name={getTokenIconName(tokenSymbol)} />}
        amount={formatedAmount}
      />
      {'  '}
      <SmallAmountTooltip className="usd-price" symbol="$" amount={usdPrice} />
    </span>
  );
};

export default LandTablePrice;
