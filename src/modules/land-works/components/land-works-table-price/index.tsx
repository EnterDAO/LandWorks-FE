import React from 'react';
import { ethers } from 'ethers';

import { convertTokenInUSD } from 'components/providers/known-tokens-provider';

interface ILandTablePriceProps {
  tokenSymbol: string;
  tokenDecimals: number;
  weiAmount: number;
}

const LandTablePrice: React.FC<ILandTablePriceProps> = ({ tokenSymbol, tokenDecimals, weiAmount }) => {
  const formatedAmount = ethers.utils.formatUnits(weiAmount, tokenDecimals);
  const usdPrice = convertTokenInUSD(Number(formatedAmount), tokenSymbol.toUpperCase());
  return (
    <span>
      {tokenSymbol.toUpperCase()} {formatedAmount} ${usdPrice ? usdPrice.toNumber().toFixed(2) : '???'}
    </span>
  );
};

export default LandTablePrice;
